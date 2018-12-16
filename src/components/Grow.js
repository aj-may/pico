import React from 'react';
import { withStyles } from '@material-ui/core/styles';

const Grow = ({ classes }) => <div className={classes.root} />;

const styles = theme => ({
  root: {
    flexGrow: 1,
  },
});

export default withStyles(styles)(Grow);
