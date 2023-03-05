import SidebarMenu from './SidebarMenu';
import Box from '@mui/material/Box';
import Drawer from '@mui/material/Drawer';
import SwipeableDrawer from '@mui/material/SwipeableDrawer';
import Toolbar from '@mui/material/Toolbar';
import React from 'react';

const drawerWidth = 240;

type SidebarProps = {
  mobileOpen: boolean;
  toggleDrawer: (open: boolean) => (event: React.SyntheticEvent) => void;
};

const Sidebar = (props: SidebarProps) => {
  const sidebarMenu = <SidebarMenu />;

  return (
    <Box component="nav" onClick={props.toggleDrawer(false)}>
      <SwipeableDrawer
        variant="temporary"
        open={props.mobileOpen}
        onOpen={props.toggleDrawer(true)}
        onClose={props.toggleDrawer(false)}
        ModalProps={{keepMounted: true}}
        sx={{
          display: {xs: 'block', sm: 'none'},
          width: drawerWidth,
          flexShrink: 0,
          ['& .MuiDrawer-paper']: {
            width: drawerWidth,
            boxSizing: 'border-box',
          },
        }}
      >
        <Toolbar />
        <Box sx={{overflow: 'auto'}}>{sidebarMenu}</Box>
      </SwipeableDrawer>

      <Drawer
        variant="permanent"
        sx={{
          display: {xs: 'none', sm: 'block'},
          width: drawerWidth,
          flexShrink: 0,
          ['& .MuiDrawer-paper']: {
            width: drawerWidth,
            boxSizing: 'border-box',
          },
        }}
      >
        <Toolbar />
        <Box sx={{overflow: 'auto'}}>{sidebarMenu}</Box>
      </Drawer>
    </Box>
  );
};

export default Sidebar;
