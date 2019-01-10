import React, { Fragment } from 'react';
import { compose } from 'redux';
import { connect } from 'react-redux';
import { firestoreConnect } from 'react-redux-firebase';
import { map } from 'lodash';
import Pique from './Pique';

const Feed = ({ piques }) => (
  <Fragment>
    {piques.map(pique => <Pique pique={pique} key={pique.id} />)}
  </Fragment>);

export default compose(
  firestoreConnect(props => {
    let where;

    if (props.type === 'tag') {
      where = ['tags', 'array-contains', props.value];
    }

    if (props.type === 'user') {
      where = ['createdBy', '==', props.value];
    }

    return [{
      collection: 'posts',
      orderBy: ['createdAt', 'desc'],
      where,
    }];
  }),
  connect((state) => ({
    piques: map(state.firestore.ordered.posts, p => ({
      ...p,
      createdBy: {
        id: p.createdBy,
        ...state.firestore.data.users[p.createdBy],
      },
    })),
  }))
)(Feed);
