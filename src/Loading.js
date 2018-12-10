import React from 'react';
import { withStyles } from '@material-ui/core/styles';
import CircularProgress from '@material-ui/core/CircularProgress';
import Grid from '@material-ui/core/Grid';

const Loading = ({ classes }) => (
  <Grid container alignItems="center" justify="center" className={classes.gridContainer}>
    <Grid item>
      <CircularProgress size={100} />
    </Grid>
  </Grid>);

const styles = theme => ({
  gridContainer: {
    minHeight: '100vh',
  },
});

export default withStyles(styles)(Loading);
