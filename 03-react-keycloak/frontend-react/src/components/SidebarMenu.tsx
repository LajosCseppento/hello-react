import ArticleIcon from '@mui/icons-material/Article';
import EditIcon from '@mui/icons-material/Edit';
import GitHubIcon from '@mui/icons-material/GitHub';
import HomeIcon from '@mui/icons-material/Home';
import Divider from '@mui/material/Divider';
import Link from '@mui/material/Link';
import List from '@mui/material/List';
import ListItem from '@mui/material/ListItem';
import ListItemButton from '@mui/material/ListItemButton';
import ListItemIcon from '@mui/material/ListItemIcon';
import ListItemText from '@mui/material/ListItemText';
import React from 'react';
import {Link as RouterLink, useLocation} from 'react-router-dom';

type SidebarItem = {
  title: string;
  path: string;
  icon: JSX.Element;
};

const items: SidebarItem[][] = [
  [{title: 'Home', path: '/', icon: <HomeIcon />}],
  [
    {title: 'Page', path: '/page', icon: <ArticleIcon />},
    {title: 'Editable page', path: '/editable-page', icon: <EditIcon />},
  ],
];

const SidebarMenu = () => {
  const location = useLocation();

  return (
    <>
      {items.map((itemGroup, index) => (
        <React.Fragment key={'group_' + index}>
          <Divider />
          <List>
            {itemGroup.map(item => (
              <ListItem key={item.path} disablePadding>
                <ListItemButton
                  selected={item.path === location.pathname}
                  component={RouterLink}
                  to={item.path}
                >
                  <ListItemIcon>{item.icon}</ListItemIcon>
                  <ListItemText primary={item.title} />
                </ListItemButton>
              </ListItem>
            ))}
          </List>
        </React.Fragment>
      ))}

      <Divider />

      <List>
        <ListItem key="source-code" disablePadding>
          <ListItemButton
            component={Link}
            href="https://github.com/LajosCseppento/hello-react/tree/main/03-react-keycloak"
            target="_blank"
          >
            <ListItemIcon>
              <GitHubIcon />
            </ListItemIcon>
            <ListItemText primary="Source Code" />
          </ListItemButton>
        </ListItem>
      </List>
    </>
  );
};

export default SidebarMenu;
