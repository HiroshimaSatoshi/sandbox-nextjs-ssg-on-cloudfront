import { Box, Paper, Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Typography } from '@mui/material';
import type { NextPage } from 'next';
import { CenterContainer } from '../../components/CenterContainer';

type IP = {
  id: number;
  name: string;
  ipv6: string;
  ipv4: string;
  ipv6cider: string;
  ipv4cider: string;
};
const Nexted: NextPage<{ users: IP[] }> = ({ users }) => {
  return (
    <Box style={{ width: '100%', height: '100%' }}>
      <Box>
        <Typography variant="h3">IPs Table</Typography>
      </Box>
      <CenterContainer>
        <TableContainer component={Paper}>
          <Table>
            <TableHead>
              <TableRow>
                <TableCell align="center">ID</TableCell>
                <TableCell align="center">Name</TableCell>
                <TableCell align="center">IPv4</TableCell>
                <TableCell align="center">Ipv4 CIDER</TableCell>
                <TableCell align="center">IPv6</TableCell>
                <TableCell align="center">Ipv6 CIDER</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {users.map((row) => (
                <TableRow key={`table-user-${row.id}`} sx={{ '&:last-child td, &:last-child th': { border: 0 } }}>
                  <TableCell component="th" scope="row" align="center">
                    {row.id}
                  </TableCell>
                  <TableCell align="center">{row.name}</TableCell>
                  <TableCell align="center">{row.ipv4}</TableCell>
                  <TableCell align="center">{row.ipv4cider}</TableCell>
                  <TableCell align="center">{row.ipv6}</TableCell>
                  <TableCell align="center">{row.ipv6cider}</TableCell>
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
  const res = await fetch('http://localhost:7777/ips');
  const json = await res.json();
  return {
    props: {
      users: json,
    },
  };
};

export default Nexted;
