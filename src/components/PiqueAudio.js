import React, { Component } from 'react';
import { compose } from 'redux';
import { connect } from 'react-redux';
import { firestoreConnect } from 'react-redux-firebase';
import Chip from '@material-ui/core/Chip';
import Avatar from '@material-ui/core/Avatar';

class PiqueAudio extends Component {
  state = {
    isReady: false,
    isPlaying: false,
  };

  handleClick = () => this.audio && this.audio.play();

  isMine = () => {
    const { pique, userId } = this.props;
    return pique.createdBy.id === userId;
  }

  handleDelete = this.isMine() ? () => {
    const { firestore, pique } = this.props;
    firestore.collection('posts').doc(pique.id).delete();
  } : null;

  async componentDidMount() {
    const { pique, firebase } = this.props;
    const audioURL = await firebase.storage().ref(pique.value).getDownloadURL();

    this.audio = new Audio(audioURL);
    this.audio.addEventListener('canplay', () => this.setState({ isReady: true }));
    this.audio.addEventListener('play', () => this.setState({ isPlaying: true }));
    this.audio.addEventListener('pause', () => this.setState({ isPlaying: false }));
  }

  render() {
    const { pique } = this.props;
    const { isReady, isPlaying } = this.state;

    return <Chip
      avatar={<Avatar src={pique.createdBy.avatarUrl} />}
      label={isPlaying ? '||' : '▶'}
      variant="outlined"
      clickable={isReady}
      onClick={this.handleClick}
      onDelete={this.handleDelete} />;
  }
}

export default compose(
  firestoreConnect(),
  connect((state) => ({
    userId: state.firebase.auth.uid,
  }))
)(PiqueAudio);
