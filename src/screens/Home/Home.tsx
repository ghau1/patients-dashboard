import {
  CircularProgress,
  Container,
  Grid,
  Paper,
  Typography,
  styled,
} from '@mui/material';
import { useClinicsQuery } from '../../gql/graphql';
import { Link } from 'react-router-dom';

const Item = styled(Paper)(({ theme }) => ({
  backgroundColor: theme.palette.mode === 'dark' ? '#1A2027' : '#fffafa',
  ...theme.typography.body2,
  padding: theme.spacing(5),
  textAlign: 'center',
  color: theme.palette.text.secondary,
}));

export function Home() {
  const { data, error, loading } = useClinicsQuery();

  if (loading) {
    return <CircularProgress />;
  }

  if (error || !data) {
    return <div>ERROR</div>;
  }

  return (
    <>
      <Typography variant="h2" component="h1" align="center">
        Clinics
      </Typography>
      <Typography variant="h5" component="p" align="center">
        Please select a clinic
      </Typography>
      <Container maxWidth="xl" sx={{ mt: 10 }}>
        <Grid container spacing={2}>
          {(data.clinics ?? []).map((item, idx) => {
            return (
              <Grid item xs={12} sm={6} key={idx}>
                <Link to={`clinic/${item?.id ?? ''}`}>
                  <Item>{item?.name}</Item>
                </Link>
              </Grid>
            );
          })}
        </Grid>
      </Container>
    </>
  );
}
