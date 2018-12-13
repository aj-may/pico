import React, { Component } from 'react';
import { firestoreConnect } from 'react-redux-firebase';
import Chip from '@material-ui/core/Chip';
import Avatar from '@material-ui/core/Avatar';

class PiqueAudio extends Component {
  state = {
    ready: false,
  }

  async componentDidMount() {
    const { pique, firebase } = this.props;
    const audioURL = await firebase.storage().ref(pique.value).getDownloadURL();
    this.audio = new Audio(audioURL);
    this.setState({ ready: true });
  }

  handleClick() {
    if (this.audio) this.audio.play();
  }

  render() {
    const { pique } = this.props;
    const { ready } = this.state;

    return <Chip
      avatar={<Avatar src={pique.createdBy.avatarUrl} />}
      label="▶︎"
      variant="outlined"
      clickable={ready}
      onClick={() => this.handleClick()} />;
  }
}

export default firestoreConnect()(PiqueAudio);
