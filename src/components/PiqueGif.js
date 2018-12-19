import React from 'react';
import { compose } from 'redux';
import { connect } from 'react-redux';
import { firestoreConnect } from 'react-redux-firebase';
import { withStyles } from '@material-ui/core/styles';
import Chip from '@material-ui/core/Chip';
import Avatar from '@material-ui/core/Avatar';

const PiqueGif = ({ pique, firestore, userId, classes }) => {
  const handleDelete = pique.createdBy.id === userId ?
    () => { firestore.collection('posts').doc(pique.id).delete() } : null;

  return <Chip
    avatar={<Avatar src={pique.createdBy.avatarUrl} />}
    onDelete={handleDelete}
    style={{ backgroundImage: `url("${pique.value.url}")` }}
    classes={{ label: classes.label, root: classes.chip }} />;
};

const styles = theme => ({
  chip: {
    backgroundPosition: 'center',
    backgroundSize: 'cover',
  },
  label: {
    width: '4rem',
  },
});

export default compose(
  firestoreConnect(),
  connect((state) => ({
    userId: state.firebase.auth.uid,
  })),
  withStyles(styles)
)(PiqueGif);
