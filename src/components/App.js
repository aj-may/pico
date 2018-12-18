import React, { Fragment } from 'react';
import { connect } from 'react-redux';
import Login from './Login';
import Piquo from './Piquo';
import Loading from './Loading';

const App = props => (
  <Fragment>
    {props.isLoading && <Loading />}
    {!props.isLoading && !props.isAuthenticated && <Login />}
    {!props.isLoading && props.isAuthenticated && <Piquo />}
  </Fragment>
);

const mapStateToProps = state => ({
  isLoading: !state.firebase.auth.isLoaded,
  isAuthenticated: !state.firebase.auth.isEmpty
});

export default connect(mapStateToProps)(App);
