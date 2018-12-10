import React from 'react';
import Grid from '@material-ui/core/Grid';
import Button from '@material-ui/core/Button';
import SvgIcon from '@material-ui/core/SvgIcon';
import Typography from '@material-ui/core/Typography';
import { withStyles } from '@material-ui/core/styles';
import { withFirebase } from 'react-redux-firebase';
import GitHubIcon from './GitHubIcon';

const Login = ({ classes, firebase }) => (
  <Grid container alignItems="center" justify="center" className={classes.gridContainer}>
    <Grid item className={classes.gridItem}>
      <Typography variant="h1" align="center" gutterBottom>Pico</Typography>

      <Button color="primary" fullWidth size="large" variant="contained" onClick={() => firebase.login({ provider: 'github', type: 'popup' })}>
        <SvgIcon className={classes.icon}><GitHubIcon /></SvgIcon> Sign In with GitHub
      </Button>
    </Grid>
  </Grid>);

const styles = theme => ({
  icon: {
    marginRight: theme.spacing.unit,
  },
  gridItem: {
    width: '20rem',
  },
  gridContainer: {
    minHeight: '100vh',
  },
});

export default withFirebase(withStyles(styles)(Login));
