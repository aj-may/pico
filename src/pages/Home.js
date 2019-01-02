import React, { Fragment } from 'react';
import { withStyles } from '@material-ui/core/styles';
import Grid from '@material-ui/core/Grid';
import Paper from '@material-ui/core/Paper';
import Divider from '@material-ui/core/Divider';
import Navigation from '../components/Navigation';
import Composer from '../components/Composer';
import Feed from '../components/Feed';

const Piquo = ({ classes }) => (
  <Fragment>
    <Navigation className={classes.navigation} />

    <Grid container justify="center">
      <Grid item>
        <Paper className={classes.container}>
          <Composer />
          <Divider />
          <Feed />
        </Paper>
      </Grid>
    </Grid>
  </Fragment>);

const styles = theme => ({
  navigation: {
    marginBottom: theme.spacing.unit * 3,
  },
  container: {
    width: '30rem',
    maxWidth: '100vw',
    padding: theme.spacing.unit * 3,
    marginBottom: theme.spacing.unit * 3,
  },
});

export default withStyles(styles)(Piquo);
