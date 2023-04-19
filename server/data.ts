import * as fs from 'fs';
import * as path from 'path';
import { parse } from 'csv-parse';

interface Clinic {
  id: number;
  name: string;
}

type Patient = {
  id: number;
  clinic_id: string;
  first_name: string;
  last_name: string;
  date_of_birth: string;
};

type ColumnCast = {
  columnName: string;
  castingFn: (columnValue: string) => unknown;
};

export function extractCsvData<T>(csvFilePath: string, casts?: ColumnCast[]) {
  return new Promise<T[]>((resolve, reject) => {
    const fileContent = fs.readFileSync(csvFilePath, { encoding: 'utf-8' });
    parse(
      fileContent,
      {
        delimiter: ',',
        columns: true,
        ...(casts?.length && {
          cast: (columnValue, context) => {
            const columnCast = casts.find(
              ({ columnName }) => columnName === context.column
            );
            return columnCast ? columnCast.castingFn(columnValue) : columnValue;
          },
        }),
      },
      (error, result: T[]) => {
        if (error) {
          reject(error);
        }
        resolve(result);
      }
    );
  });
}

const castToInteger = (columnValue: string) => parseInt(columnValue, 10);

export async function getClinics() {
  const csvFilePath = path.resolve(__dirname, 'data/clinics.csv');
  const clinics = await extractCsvData<Clinic>(csvFilePath, [
    {
      columnName: 'id',
      castingFn: castToInteger,
    },
  ]);
  return clinics;
}

export async function getPatients(
  clinicId: number,
  sortColumn?: string,
  sortOrder?: string
) {
  const csvFilePath = path.resolve(__dirname, `data/patients-${clinicId}.csv`);
  const patients = await extractCsvData<Patient>(csvFilePath, [
    {
      columnName: 'id',
      castingFn: castToInteger,
    },
  ]);
  if (sortOrder === 'asc') {
    return patients.sort((a, b) => (a[sortColumn] > b[sortColumn] ? 1 : -1));
  }
  if (sortOrder === 'desc') {
    return patients.sort((a, b) => (a[sortColumn] > b[sortColumn] ? -1 : 1));
  }
  return patients;
}
