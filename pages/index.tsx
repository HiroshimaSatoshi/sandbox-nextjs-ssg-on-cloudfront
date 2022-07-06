import { TableContainer, Paper, TableRow, TableHead, TableCell, TableBody, Table, Box, Typography } from '@mui/material';
import type { NextPage } from 'next';
import { CenterContainer } from '../components/CenterContainer';

type User = {
  id: number;
  first_name: string;
  last_name: string;
  gender: string;
  email: string;
};

const Home: NextPage<{ users: User[] }> = ({ users }) => {
  return (
    <Box style={{ width: '100%', height: '100%' }}>
      <Box>
        <Typography variant="h3">Users Table</Typography>
      </Box>
      <CenterContainer>
        <TableContainer component={Paper}>
          <Table>
            <TableHead>
              <TableRow>
                <TableCell align="center">ID</TableCell>
                <TableCell align="center">First Name</TableCell>
                <TableCell align="center">Last Name</TableCell>
                <TableCell align="center">Gender</TableCell>
                <TableCell align="center">Email</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {users.map((row) => (
                <TableRow key={`table-user-${row.id}`} sx={{ '&:last-child td, &:last-child th': { border: 0 } }}>
                  <TableCell component="th" scope="row" align="center">
                    {row.id}
                  </TableCell>
                  <TableCell align="center">{row.first_name}</TableCell>
                  <TableCell align="center">{row.last_name}</TableCell>
                  <TableCell align="center">{row.gender}</TableCell>
                  <TableCell align="center">{row.email}</TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </TableContainer>
      </CenterContainer>
    </Box>
  );
};

export const getStaticProps = async () => {
  const res = await fetch('http://localhost:7777/users');
  const json = await res.json();
  return {
    props: {
      users: json,
    },
  };
};

export default Home;
