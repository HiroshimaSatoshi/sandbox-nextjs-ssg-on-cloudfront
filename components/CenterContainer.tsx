import { Container, styled } from '@mui/material';

export const CenterContainer = styled(Container)(({ theme }) => ({
  display: 'flex',
  justifyContent: 'center',
  alignItems: 'center',
  height: `calc(100vh - 36)`,
}));

export default CenterContainer;
