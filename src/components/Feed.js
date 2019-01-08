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
  firestoreConnect(props => [
    {
      collection: 'posts',
      orderBy: ['createdAt', 'desc'],
      where: [props.type === 'tag' ? 'tag' : 'createdBy', '==', props.value],
    }
  ]),
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
