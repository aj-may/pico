import React, { Fragment } from 'react';
import { withStyles } from '@material-ui/core/styles';
import Grid from '@material-ui/core/Grid';
import Paper from '@material-ui/core/Paper';
import Divider from '@material-ui/core/Divider';
import Typography from '@material-ui/core/Typography';
import Navigation from './Navigation';
import Composer from './Composer';
import Feed from './Feed';

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

    <footer>
      <Typography variant="body2" paragraph align="center" color="textSecondary">
        Santa Hat Icon made by <a href="https://www.flaticon.com/authors/pixel-perfect" title="Pixel perfect" target="_blank" rel="noopener noreferrer" className={classes.footerLink}>Pixel perfect</a> from <a href="https://www.flaticon.com/" title="Flaticon" target="_blank" rel="noopener noreferrer" className={classes.footerLink}>www.flaticon.com</a> is licensed by <a href="http://creativecommons.org/licenses/by/3.0/" title="Creative Commons BY 3.0" target="_blank" rel="noopener noreferrer" className={classes.footerLink}>CC 3.0 BY</a>
      </Typography>
    </footer>
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
  footerLink: {
    color: theme.palette.text.secondary,
  }
});

export default withStyles(styles)(Piquo);
