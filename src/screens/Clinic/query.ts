import { gql } from '@apollo/client';

export const QUERY_CLINIC = gql`
  query Clinic(
    $id: Int!
    $patientsSortColumn: String
    $patientsSortOrder: String
  ) {
    clinic(
      id: $id
      patientsSortColumn: $patientsSortColumn
      patientsSortOrder: $patientsSortOrder
    ) {
      name
      patients {
        id
        first_name
        last_name
        date_of_birth
      }
    }
  }
`;
