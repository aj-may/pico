import React, { Component } from 'react';
import { compose } from 'redux';
import { connect } from 'react-redux';
import { firestoreConnect } from 'react-redux-firebase';
import { withStyles } from '@material-ui/core/styles';
import Grid from '@material-ui/core/Grid';
import IconButton from '@material-ui/core/IconButton';
import FiberManualRecord from '@material-ui/icons/FiberManualRecord';
import PlayArrow from '@material-ui/icons/PlayArrow';
import KeyboardReturn from '@material-ui/icons/KeyboardReturn';
import LinearProgress from '@material-ui/core/LinearProgress';
import uuid from 'uuid/v1';

class ComposerAudio extends Component {
  state = {
    ready: false,
    done: false,
    progress: 0,
  }

  async componentDidMount() {
    this.stream = await navigator.mediaDevices.getUserMedia({ audio: true });
    this.setState({ ready: true });
    this.recorder = new window.MediaRecorder(this.stream);
    this.recorder.addEventListener('dataavailable', ({ data }) => {
      this.audioBlob = data;
      this.audio = new Audio(URL.createObjectURL(data));
      this.setState({ done: true, progress: 0 });
    });
  }

  componentWillUnmount() {
    this.stream.getTracks().forEach(track => track.stop());
  }

  handleRecord() {
    this.recorder.start();
    this.setState({ progress: 100 });
    setTimeout(() => this.recorder.stop(), 1000);
  }

  handlePlay() {
    this.audio.play();
    this.setState({ progress: 100 });
    setTimeout(() => this.setState({ progress: 0 }), 1000);
  }

  async handleSubmit() {
    const { firebase, firestore, userId } = this.props;

    try {
      const result = await firebase.uploadFile('audio', this.audioBlob, null, { name: uuid() });
      const value = result.uploadTaskSnapshot.metadata.fullPath;

      if (!value) return;

      const pique = {
        type: 'audio',
        value,
        createdBy: userId,
        createdAt: firestore.FieldValue.serverTimestamp(),
      }

      await firestore.add({ collection: 'posts' }, pique);
    } catch (err) {
      console.error(err);
    }
  }

  render() {
    const { ready, done, progress } = this.state;

    return (
      <Grid container alignItems="center" spacing={16} wrap="nowrap">
        <Grid item>
          {!done &&<IconButton color="secondary" onClick={() => this.handleRecord()} disabled={!ready}>
            <FiberManualRecord />
          </IconButton>}

          {done &&<IconButton color="primary" onClick={() => this.handlePlay()}>
            <PlayArrow />
          </IconButton>}
        </Grid>
        <Grid item xs>
          <LinearProgress variant="determinate" value={progress} />
        </Grid>
        <Grid item>
          <IconButton color="primary" onClick={() => this.handleSubmit()}>
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
)(ComposerAudio);
