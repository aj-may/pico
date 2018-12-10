import React from 'react';
import { compose } from 'redux';
import { connect } from 'react-redux';
import { firestoreConnect, populate } from 'react-redux-firebase';
import { withStyles } from '@material-ui/core/styles';
import Chip from '@material-ui/core/Chip';
import Avatar from '@material-ui/core/Avatar';
import { map, reverse } from 'lodash';

const Feed = ({ posts, classes }) => {
  console.log(posts);

  return (
    <div className={classes.root}>
      {reverse(map(posts, (post, key) =><Chip avatar={<Avatar src={post.createdBy.avatarUrl} />} label={post.value} clickable variant="outlined" key={key} className={classes.chip} />))}
    </div>);
};

const styles = theme => ({
  chip: {
    marginTop: theme.spacing.unit,
    marginRight: theme.spacing.unit,
  }
});

const populates = [{ child: 'createdBy', root: 'users' }]
const collection = 'posts'

export default compose(
  withStyles(styles),
  firestoreConnect(() => [
    {
      collection,
      orderBy: [['createdAt', 'asc']],
      populates
    }
  ]),
  connect((state) => ({
    posts: populate(state.firestore, collection, populates)
  }))
)(Feed);
