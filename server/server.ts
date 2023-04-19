import express from 'express';
import { graphqlHTTP } from 'express-graphql';
import { buildSchema } from 'graphql';
import { getClinics, getPatients } from './data';
import cors from 'cors';

const app = express();
const port = process.env.PORT || 5001;

const schema = buildSchema(`
  type Query {
    clinic(id: Int, patientsSortColumn: String, patientsSortOrder: String): Clinic
    clinics: [Clinic]
  }
  type Clinic {
    id: Int
    name: String
    patients: [Patient]
  }
  type Patient {
    id: Int
    first_name: String
    last_name: String
    date_of_birth: String
  }
`);

const root = {
  clinic: async ({
    id,
    patientsSortColumn = 'id',
    patientsSortOrder = 'asc',
  }: {
    id: number;
    patientsSortColumn: string;
    patientsSortOrder: string;
  }) => {
    const clinics = await getClinics();
    const clinic = clinics.find(({ id: clinicId }) => clinicId === id);

    if (!clinic) {
      throw new Error(`No clinic found with id ${id}`);
    }

    return {
      id,
      name: clinic.name,
      patients: getPatients(id, patientsSortColumn, patientsSortOrder),
    };
  },
  clinics: () => getClinics(),
};

app.use(cors());
app.use(
  '/graphql',
  graphqlHTTP({
    schema,
    rootValue: root,
    graphiql: true,
  })
);

// eslint-disable-next-line no-console
app.listen(port, () => console.log(`Listening on port ${port}`));
