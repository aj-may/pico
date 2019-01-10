import React from 'react';
import { withStyles } from '@material-ui/core/styles';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import Typography from '@material-ui/core/Typography';
import UserMenu from './UserMenu';
import Grow from './Grow';

const Navigation = ({ classes }) => (
  <AppBar position="static" className={classes.navigation}>
    <Toolbar>
      <Typography variant="h6" color="inherit">Piquo</Typography>
      <Grow />

      <UserMenu />
    </Toolbar>
  </AppBar>);

const styles = theme => ({
  navigation: {
    marginBottom: theme.spacing.unit * 3,
  },
});

export default withStyles(styles)(Navigation);
