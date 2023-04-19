import { gql } from '@apollo/client';

export const QUERY_CLINICS = gql`
  query Clinics {
    clinics {
      id
      name
    }
  }
`;
