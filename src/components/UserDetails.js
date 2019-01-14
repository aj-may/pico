import React, { Fragment } from 'react';
import Typography from '@material-ui/core/Typography';
import { withStyles } from '@material-ui/core/styles';
import Button from '@material-ui/core/Button';
import Add from '@material-ui/icons/Add';

const UserDetails = ({ user, classes }) => (
  <Fragment>
    <img src={user.avatarUrl} className={classes.photo} alt='' />

    <Typography variant='h4' align='right'>
      {user.displayName}
    </Typography>

    <Typography variant='body1' align='right'>
      {user.bio}
    </Typography>

    <div className={classes.actions}>
      <Button color='primary' size='small'>
        <Add /> Follow
      </Button>
    </div>
  </Fragment>);

const styles = theme => ({
  photo: {
    width: '100%',
    borderRadius: '20px',
    margin: `${theme.spacing.unit * 2}px 0`,
  },
  actions: {
    textAlign: 'right',
    margin: `${theme.spacing.unit * 2}px 0`,
  }
});

export default withStyles(styles)(UserDetails);
