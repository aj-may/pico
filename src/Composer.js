import React, { Component, createRef } from 'react';
import { compose } from 'redux';
import { connect } from 'react-redux';
import { firestoreConnect } from 'react-redux-firebase';
import { withStyles } from '@material-ui/core/styles';
import Grid from '@material-ui/core/Grid';
import TextField from '@material-ui/core/TextField';
import Avatar from '@material-ui/core/Avatar';
import IconButton from '@material-ui/core/IconButton';
import KeyboardReturn from '@material-ui/icons/KeyboardReturn';

class Composer extends Component {
  constructor(props) {
    super(props);
    this.composerInput = createRef();
  }

  clearInput() {
    this.composerInput.current.value = '';
  }

  async handleClick() {
    const { firestore, userId } = this.props;
    const { value } = this.composerInput.current;

    if (!value) return;

    const post = {
      type: 'text',
      value,
      createdBy: userId,
      createdAt: firestore.FieldValue.serverTimestamp(),
    }

    try {
      await firestore.add({ collection: 'posts' }, post);
      this.clearInput();
    } catch (err) {
      console.error(err);
    }
  }

  render() {
    const { avatarUrl, classes } = this.props;

    return (
      <Grid container alignItems="center" spacing={16} wrap="nowrap" className={classes.root}>
        <Grid item>
          <Avatar src={avatarUrl} className={classes.avatar} />
        </Grid>
        <Grid item xs>
          <TextField label="Wut?" variant="outlined" fullWidth autoFocus inputRef={this.composerInput} inputProps={{ maxLength: 5 }} />
        </Grid>
        <Grid item>
          <IconButton color="primary" onClick={() => this.handleClick()}>
            <KeyboardReturn />
          </IconButton>
        </Grid>
      </Grid>);
  }
};

const styles = theme => ({
  root: {
    marginBottom: theme.spacing.unit,
  },
  avatar: {
    width: '4rem',
    height: '4rem',
  }
});

export default compose(
  withStyles(styles),
  firestoreConnect(),
  connect((state) => ({
    avatarUrl: state.firebase.profile.avatarUrl,
    userId: state.firebase.auth.uid,
  }))
)(Composer);
