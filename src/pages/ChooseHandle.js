import React from 'react';
import { withStyles } from '@material-ui/core/styles';
import { withFirebase } from 'react-redux-firebase';
import Grid from '@material-ui/core/Grid';
import IconButton from '@material-ui/core/IconButton';
import Typography from '@material-ui/core/Typography';
import Input from '@material-ui/core/Input';
import InputAdornment from '@material-ui/core/InputAdornment';
import KeyboardReturn from '@material-ui/icons/KeyboardReturn';

const ChooseHandle = ({ classes, firebase }) => {
  const handleSubmit = event => {
    const handle = event.target['handle'].value;

    event.preventDefault();
    firebase.updateProfile({ handle });
  }

  const adornment = (<InputAdornment position="start">
    <Typography variant='h2'>@</Typography>
  </InputAdornment>);

  return (
    <Grid container alignItems="center" justify="center" className={classes.gridContainer}>
      <Grid item className={classes.gridItem}>
        <Typography variant='h5' align="center">
          choose your handle <span role="img" aria-label="">🤘</span>
        </Typography>

        <form onSubmit={handleSubmit}>
          <Grid container alignItems="center" spacing={16} wrap="nowrap">
            <Grid item xs>
              <Input
                name="handle"
                startAdornment={adornment}
                classes={{ input: classes.input }}
                inputProps={{ autoComplete: 'off', autoCorrect: 'off', autoCapitalize: 'off', spellCheck: 'false' }}
                autoFocus
                fullWidth
                required />
            </Grid>

            <Grid item>
              <IconButton color="primary" type="submit" size="large">
                <KeyboardReturn />
              </IconButton>
            </Grid>
          </Grid>
        </form>
      </Grid>
    </Grid>);
};

const styles = theme => ({
  input: theme.typography.h2,
  gridItem: {
    width: '25rem',
  },
  gridContainer: {
    minHeight: '100vh',
  },
});

export default withFirebase(withStyles(styles)(ChooseHandle));
