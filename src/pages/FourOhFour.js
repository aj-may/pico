import React from 'react';
import Grid from '@material-ui/core/Grid';
import Typography from '@material-ui/core/Typography';
import { withStyles } from '@material-ui/core/styles';

const FourOhFour = ({ classes, firebase }) => (
  <Grid container alignItems="center" justify="center" className={classes.gridContainer}>
    <Grid item className={classes.gridItem}>
      <Typography variant="h1" align="center" gutterBottom>404</Typography>
    </Grid>
  </Grid>);

const styles = theme => ({
  gridItem: {
    width: '20rem',
  },
  gridContainer: {
    minHeight: '100vh',
  },
});

export default withStyles(styles)(FourOhFour);
