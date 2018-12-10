import React, { Fragment } from 'react';
import { connect } from 'react-redux';
import Login from './Login';
import Pico from './Pico';
import Loading from './Loading';

const Pages = props => (
  <Fragment>
    {props.isLoading && <Loading />}
    {!props.isLoading && !props.isAuthenticated && <Login />}
    {!props.isLoading && props.isAuthenticated && <Pico />}
  </Fragment>
);

const mapStateToProps = state => ({
  isLoading: !state.firebase.auth.isLoaded,
  isAuthenticated: !state.firebase.auth.isEmpty,
})

export default connect(mapStateToProps)(Pages);
