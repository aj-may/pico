import React from 'react';
import { Link } from 'react-router-dom';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import Button from '@material-ui/core/Button';
import Typography from '@material-ui/core/Typography';
import UserMenu from './UserMenu';
import Grow from './Grow';

const Navigation = () => (
  <AppBar position="static">
    <Toolbar>
      <Button component={Link} to="/" color='inherit'>
        <Typography variant="h6" color="inherit">Piquo</Typography>
      </Button>

      <Grow />

      <UserMenu />
    </Toolbar>
  </AppBar>);

export default Navigation;
