import React, { Component, createRef } from 'react';
import { compose } from 'redux';
import { connect } from 'react-redux';
import { firestoreConnect } from 'react-redux-firebase';
import { withStyles } from '@material-ui/core/styles';
import Grid from '@material-ui/core/Grid';
import TextField from '@material-ui/core/TextField';
import IconButton from '@material-ui/core/IconButton';
import KeyboardReturn from '@material-ui/icons/KeyboardReturn';

class ComposerText extends Component {
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
    return (
      <Grid container alignItems="center" spacing={16} wrap="nowrap">
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

const styles = theme => ({});

export default compose(
  withStyles(styles),
  firestoreConnect(),
  connect((state) => ({
    userId: state.firebase.auth.uid,
  }))
)(ComposerText);
