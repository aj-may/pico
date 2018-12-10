import React from 'react';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import Typography from '@material-ui/core/Typography';
import Search from './Search';
import UserMenu from './UserMenu';
import Grow from './Grow';

const Navigation = ({ className }) => (
  <AppBar position="static" className={className}>
    <Toolbar>
      <Typography variant="h6" color="inherit">Pico</Typography>
      <Grow />
      <Search />
      <UserMenu />
    </Toolbar>
  </AppBar>);

export default Navigation;
