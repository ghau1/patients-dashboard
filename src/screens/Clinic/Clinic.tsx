import {
  CircularProgress,
  Container,
  Paper,
  Table,
  TableBody,
  TableCell,
  TableFooter,
  TableHead,
  TableRow,
  TableSortLabel,
  Typography,
} from '@mui/material';
import { useState } from 'react';
import { useParams } from 'react-router-dom';
import { useClinicQuery } from '../../gql/graphql';

type SortOrder = 'desc' | 'asc';

type SortSettings = {
  column: string;
  order: SortOrder;
};

function getNextOrder(currentOrder: SortOrder): SortOrder {
  switch (currentOrder) {
    case 'asc':
      return 'desc';
    case 'desc':
      return 'asc';
    default:
      return 'asc';
  }
}

export function Clinic() {
  const [sortSettings, setSortSettings] = useState<SortSettings>({
    column: 'id',
    order: 'asc',
  });

  const updateTableSort = (columnName: string) => {
    setSortSettings({
      column: columnName,
      order:
        columnName === sortSettings.column
          ? getNextOrder(sortSettings.order)
          : 'asc',
    });
  };

  const { id = '' } = useParams();

  const { data, error, loading } = useClinicQuery({
    variables: {
      id: parseInt(id, 10),
      patientsSortColumn: sortSettings.column,
      patientsSortOrder: sortSettings.order,
    },
  });

  if (loading) {
    return <CircularProgress />;
  }

  if (error || !data) {
    return <div>ERROR</div>;
  }

  return (
    <>
      <Typography variant="h2" component="h1" align="center">
        Clinic: {data.clinic?.name}
      </Typography>
      <Typography variant="h4" component="h2" align="center">
        List of patients
      </Typography>
      <Container maxWidth="xl" sx={{ mt: 10 }}>
        <Paper>
          <Table>
            <TableHead>
              <TableRow>
                <TableCell>
                  <TableSortLabel
                    active={sortSettings.column === 'id'}
                    direction={sortSettings.order}
                    onClick={() => updateTableSort('id')}
                  >
                    Id
                  </TableSortLabel>
                </TableCell>

                <TableCell>
                  <TableSortLabel
                    active={sortSettings.column === 'first_name'}
                    direction={sortSettings.order}
                    onClick={() => updateTableSort('first_name')}
                  >
                    First Name
                  </TableSortLabel>
                </TableCell>
                <TableCell>
                  <TableSortLabel
                    active={sortSettings.column === 'last_name'}
                    direction={sortSettings.order}
                    onClick={() => updateTableSort('last_name')}
                  >
                    Last Name
                  </TableSortLabel>
                </TableCell>
                <TableCell>
                  <TableSortLabel
                    active={sortSettings.column === 'date_of_birth'}
                    direction={sortSettings.order}
                    onClick={() => updateTableSort('date_of_birth')}
                  >
                    Date of Birth
                  </TableSortLabel>
                </TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {(data.clinic?.patients ?? []).map((item, indx) => {
                return (
                  <TableRow key={indx}>
                    <TableCell>{item?.id}</TableCell>
                    <TableCell>{item?.first_name}</TableCell>
                    <TableCell>{item?.last_name}</TableCell>
                    <TableCell>{item?.date_of_birth}</TableCell>
                  </TableRow>
                );
              })}
            </TableBody>
            <TableFooter />
          </Table>
        </Paper>
      </Container>
    </>
  );
}
