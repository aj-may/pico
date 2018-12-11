import React, { Fragment } from 'react';
import { compose } from 'redux';
import { connect } from 'react-redux';
import { firestoreConnect, populate } from 'react-redux-firebase';
import { map, reverse } from 'lodash';
import Post from './Post';

const Feed = ({ posts, firebase }) => (
  <Fragment>
    {reverse(map(posts, (post, key) => <Post post={post} key={key} />))}
  </Fragment>);

const populates = [{ child: 'createdBy', root: 'users' }];
const collection = 'posts';

export default compose(
  firestoreConnect(() => [
    {
      collection,
      orderBy: [['createdAt', 'asc']],
      populates,
    }
  ]),
  connect((state) => ({
    posts: populate(state.firestore, collection, populates),
  }))
)(Feed);
