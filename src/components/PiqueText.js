import React from 'react';
import { compose } from 'redux';
import { connect } from 'react-redux';
import { firestoreConnect } from 'react-redux-firebase';
import Chip from '@material-ui/core/Chip';
import Avatar from '@material-ui/core/Avatar';

const PiqueText = ({ pique, firestore, userId }) => {
  const isMine = () => pique.createdBy.id === userId;

  const handleDelete = isMine() ? () => {
    firestore.collection('posts').doc(pique.id).delete();
  } : null;

  return <Chip
    avatar={<Avatar src={pique.createdBy.avatarUrl} />}
    label={pique.value.substring(0, 5)}
    variant="outlined"
    onDelete={handleDelete} />;
};

export default compose(
  firestoreConnect(),
  connect((state) => ({
    userId: state.firebase.auth.uid,
  }))
)(PiqueText);
