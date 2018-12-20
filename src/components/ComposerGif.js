import React, { Component, createRef, Fragment } from 'react';
import { compose } from 'redux';
import { connect } from 'react-redux';
import { firestoreConnect } from 'react-redux-firebase';
import { withStyles } from '@material-ui/core/styles';
import GiphyClient from 'giphy-js-sdk-core';
import Grid from '@material-ui/core/Grid';
import TextField from '@material-ui/core/TextField';
import IconButton from '@material-ui/core/IconButton';
import KeyboardReturn from '@material-ui/icons/KeyboardReturn';

class ComposerText extends Component {
  composerInput = createRef();

  clearInput = () => this.composerInput.current.value = '';

  handleClick = async () => {
    const giphy = GiphyClient('5XbIEP9UTzsBglksDmHEx2hJ6eJzTbha');
    const { firestore, userId } = this.props;
    const { value } = this.composerInput.current;

    if (!value) return;

    const response = await giphy.translate('gifs', { s: value });
    const gif = response.data.images['fixed_width_small'];

    const pique = {
      type: 'gif',
      value: gif,
      createdBy: userId,
      createdAt: firestore.FieldValue.serverTimestamp(),
    };

    try {
      await firestore.add({ collection: 'posts' }, pique);
      this.clearInput();
    } catch (err) {
      console.error(err);
    }
  };

  render() {
    return (
      <Fragment>
        <Grid container alignItems="center" spacing={16} wrap="nowrap">
          <Grid item xs>
            <TextField label="Gif?" variant="outlined" fullWidth autoFocus inputRef={this.composerInput} />
          </Grid>
          <Grid item>
            <IconButton color="primary" onClick={this.handleClick}>
              <KeyboardReturn />
            </IconButton>
          </Grid>
        </Grid>
        <img alt="Powered by Giphy" src="/img/powered-by-giphy.png" height={11} width={100} />
      </Fragment>);
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
