import { gql } from '@apollo/client';
import * as Apollo from '@apollo/client';
export type Maybe<T> = T | null;
export type InputMaybe<T> = Maybe<T>;
export type Exact<T extends { [key: string]: unknown }> = {
  [K in keyof T]: T[K];
};
export type MakeOptional<T, K extends keyof T> = Omit<T, K> & {
  [SubKey in K]?: Maybe<T[SubKey]>;
};
export type MakeMaybe<T, K extends keyof T> = Omit<T, K> & {
  [SubKey in K]: Maybe<T[SubKey]>;
};
const defaultOptions = {} as const;
/** All built-in and custom scalars, mapped to their actual values */
export type Scalars = {
  ID: string;
  String: string;
  Boolean: boolean;
  Int: number;
  Float: number;
};

export type Clinic = {
  __typename?: 'Clinic';
  id?: Maybe<Scalars['Int']>;
  name?: Maybe<Scalars['String']>;
  patients?: Maybe<Array<Maybe<Patient>>>;
};

export type Patient = {
  __typename?: 'Patient';
  date_of_birth?: Maybe<Scalars['String']>;
  first_name?: Maybe<Scalars['String']>;
  id?: Maybe<Scalars['Int']>;
  last_name?: Maybe<Scalars['String']>;
};

export type Query = {
  __typename?: 'Query';
  clinic?: Maybe<Clinic>;
  clinics?: Maybe<Array<Maybe<Clinic>>>;
};

export type QueryClinicArgs = {
  id?: InputMaybe<Scalars['Int']>;
  patientsSortColumn?: InputMaybe<Scalars['String']>;
  patientsSortOrder?: InputMaybe<Scalars['String']>;
};

export type ClinicQueryVariables = Exact<{
  id: Scalars['Int'];
  patientsSortColumn?: InputMaybe<Scalars['String']>;
  patientsSortOrder?: InputMaybe<Scalars['String']>;
}>;

export type ClinicQuery = {
  __typename?: 'Query';
  clinic?: {
    __typename?: 'Clinic';
    name?: string | null;
    patients?: Array<{
      __typename?: 'Patient';
      id?: number | null;
      first_name?: string | null;
      last_name?: string | null;
      date_of_birth?: string | null;
    } | null> | null;
  } | null;
};

export type ClinicsQueryVariables = Exact<{ [key: string]: never }>;

export type ClinicsQuery = {
  __typename?: 'Query';
  clinics?: Array<{
    __typename?: 'Clinic';
    id?: number | null;
    name?: string | null;
  } | null> | null;
};

export const ClinicDocument = gql`
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

/**
 * __useClinicQuery__
 *
 * To run a query within a React component, call `useClinicQuery` and pass it any options that fit your needs.
 * When your component renders, `useClinicQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useClinicQuery({
 *   variables: {
 *      id: // value for 'id'
 *      patientsSortColumn: // value for 'patientsSortColumn'
 *      patientsSortOrder: // value for 'patientsSortOrder'
 *   },
 * });
 */
export function useClinicQuery(
  baseOptions: Apollo.QueryHookOptions<ClinicQuery, ClinicQueryVariables>
) {
  const options = { ...defaultOptions, ...baseOptions };
  return Apollo.useQuery<ClinicQuery, ClinicQueryVariables>(
    ClinicDocument,
    options
  );
}
export function useClinicLazyQuery(
  baseOptions?: Apollo.LazyQueryHookOptions<ClinicQuery, ClinicQueryVariables>
) {
  const options = { ...defaultOptions, ...baseOptions };
  return Apollo.useLazyQuery<ClinicQuery, ClinicQueryVariables>(
    ClinicDocument,
    options
  );
}
export type ClinicQueryHookResult = ReturnType<typeof useClinicQuery>;
export type ClinicLazyQueryHookResult = ReturnType<typeof useClinicLazyQuery>;
export type ClinicQueryResult = Apollo.QueryResult<
  ClinicQuery,
  ClinicQueryVariables
>;
export const ClinicsDocument = gql`
  query Clinics {
    clinics {
      id
      name
    }
  }
`;

/**
 * __useClinicsQuery__
 *
 * To run a query within a React component, call `useClinicsQuery` and pass it any options that fit your needs.
 * When your component renders, `useClinicsQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useClinicsQuery({
 *   variables: {
 *   },
 * });
 */
export function useClinicsQuery(
  baseOptions?: Apollo.QueryHookOptions<ClinicsQuery, ClinicsQueryVariables>
) {
  const options = { ...defaultOptions, ...baseOptions };
  return Apollo.useQuery<ClinicsQuery, ClinicsQueryVariables>(
    ClinicsDocument,
    options
  );
}
export function useClinicsLazyQuery(
  baseOptions?: Apollo.LazyQueryHookOptions<ClinicsQuery, ClinicsQueryVariables>
) {
  const options = { ...defaultOptions, ...baseOptions };
  return Apollo.useLazyQuery<ClinicsQuery, ClinicsQueryVariables>(
    ClinicsDocument,
    options
  );
}
export type ClinicsQueryHookResult = ReturnType<typeof useClinicsQuery>;
export type ClinicsLazyQueryHookResult = ReturnType<typeof useClinicsLazyQuery>;
export type ClinicsQueryResult = Apollo.QueryResult<
  ClinicsQuery,
  ClinicsQueryVariables
>;
