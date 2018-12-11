import React, { Component } from 'react';
import { firestoreConnect } from 'react-redux-firebase';
import Chip from '@material-ui/core/Chip';
import Avatar from '@material-ui/core/Avatar';

class PostAudio extends Component {
  state = {
    ready: false,
  }

  async componentDidMount() {
    const { post, firebase } = this.props;
    const audioURL = await firebase.storage().ref(post.value).getDownloadURL();
    this.audio = new Audio(audioURL);
    this.setState({ ready: true });
  }

  handleClick() {
    if (this.audio) this.audio.play();
  }

  render() {
    const { post } = this.props;
    const { ready } = this.state;

    return <Chip
      avatar={<Avatar src={post.createdBy.avatarUrl} />}
      label="▶︎"
      variant="outlined"
      clickable={ready}
      onClick={() => this.handleClick()} />;
  }
}

export default firestoreConnect()(PostAudio);
