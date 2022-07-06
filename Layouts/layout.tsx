import { AppBar, Drawer, IconButton, Link, List, ListItem, ListItemButton, ListItemText, styled, Toolbar } from '@mui/material';
import { Box } from '@mui/system';
import { ReactElement } from 'react';
import React from 'react';
import { Menu as MenuIcon, Close as CloseIcon } from '@mui/icons-material';

import { useRouter } from 'next/router';

const PageBox = styled(Box)({
  width: '100vw',
  height: 'calc(100vh - 36)',
});

type LayoutProps = Required<{
  readonly children: ReactElement;
}>;

export const Layout = ({ children }: LayoutProps) => {
  const [drawerOpenState, setDrawerOpenState] = React.useState(false);
  const router = useRouter();
  return (
    <>
      <AppBar position="static">
        <Toolbar>
          <IconButton
            size="large"
            edge="start"
            color="inherit"
            aria-label="menu"
            sx={{ mr: 2 }}
            onClick={() => setDrawerOpenState(true)}
          >
            <MenuIcon />
          </IconButton>
        </Toolbar>
      </AppBar>
      <PageBox>{children}</PageBox>
      <Drawer anchor="left" open={drawerOpenState} onClose={() => setDrawerOpenState(false)}>
        <Box>
          <IconButton
            size="large"
            edge="start"
            color="inherit"
            aria-label="close"
            sx={{ ml: 1 }}
            onClick={() => setDrawerOpenState(false)}
          >
            <CloseIcon />
          </IconButton>
        </Box>

        <List style={{ width: '400px' }}>
          <ListItemButton component="a" href="/">
            <ListItemText>Users</ListItemText>
          </ListItemButton>
          <ListItemButton component="a" href="/nested">
            <ListItemText>IPs</ListItemText>
          </ListItemButton>
        </List>
      </Drawer>
    </>
  );
};
