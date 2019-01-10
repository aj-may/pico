import React from 'react';
import { compose } from 'redux';
import { connect } from 'react-redux';
import { firestoreConnect } from 'react-redux-firebase';
import { withStyles } from '@material-ui/core/styles';
import Grid from '@material-ui/core/Grid';
import Paper from '@material-ui/core/Paper';
import TextField from '@material-ui/core/TextField';
import InputAdornment from '@material-ui/core/InputAdornment';
import Button from '@material-ui/core/Button';
import Loading from '../components/Loading';
import Typography from '@material-ui/core/Typography';

const Settings = ({ classes, profile, firebase, history }) => {
  const handleSubmit = event => {
    event.preventDefault();

    firebase.updateProfile({
      handle: event.target['handle'].value,
      bio: event.target['bio'].value,
    });

    history.push('/');
  };

  if (!profile.isLoaded) return <Loading />;

  return (
    <Grid container justify="center" spacing={16} className={classes.container}>
      <Grid item sm={12}>
        <Paper className={classes.paper}>
          <Typography variant='h3'>Settings</Typography>

          <form onSubmit={handleSubmit}>
            <TextField
              name="handle"
              label="Handle"
              defaultValue={profile.handle}
              required
              fullWidth
              className={classes.field}
              InputProps={{
                startAdornment: <InputAdornment position="start">@</InputAdornment>,
                inputProps: {
                  autoComplete: 'off',
                  autoCorrect: 'off',
                  autoCapitalize: 'off',
                  spellCheck: 'false'
                },
              }} />

              <TextField
              name="bio"
              label="Bio"
              defaultValue={profile.bio}
              fullWidth
              multiline
              className={classes.field} />

            <Button type="submit" color='primary'>Save</Button>
          </form>
        </Paper>
      </Grid>
    </Grid>);
};

const styles = theme => ({
  container: {
    width: `${theme.breakpoints.values.sm}px`,
    maxWidth: '100vw',
    margin: `${theme.spacing.unit * 1}px auto`,
  },
  paper: {
    padding: `${theme.spacing.unit * 3}px`,
  },
  field: {
    margin: `${theme.spacing.unit * 2}px 0`,
  }
});

export default compose(
  firestoreConnect(),
  connect((state) => ({
    profile: state.firebase.profile,
  })),
  withStyles(styles),
)(Settings);
