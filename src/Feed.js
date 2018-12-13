import React, { Fragment } from 'react';
import { compose } from 'redux';
import { connect } from 'react-redux';
import { firestoreConnect, populate } from 'react-redux-firebase';
import { map, reverse } from 'lodash';
import Pique from './Pique';

const Feed = ({ piques, firebase }) => (
  <Fragment>
    {reverse(map(piques, (pique, key) => <Pique pique={pique} key={key} />))}
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
    piques: populate(state.firestore, collection, populates),
  }))
)(Feed);
