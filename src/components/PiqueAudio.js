import React, { Component } from 'react';
import { compose } from 'redux';
import { connect } from 'react-redux';
import { firestoreConnect } from 'react-redux-firebase';
import Chip from '@material-ui/core/Chip';
import Avatar from '@material-ui/core/Avatar';

class PiqueAudio extends Component {
  state = {
    ready: false,
  }

  handleDelete = this.props.pique.createdBy.id === this.props.userId ?
    () => { this.props.firestore.collection('posts').doc(this.props.pique.id).delete() } : null;

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
      onClick={() => this.handleClick()}
      onDelete={this.handleDelete} />;
  }
}

export default compose(
  firestoreConnect(),
  connect((state) => ({
    userId: state.firebase.auth.uid,
  }))
)(PiqueAudio);
