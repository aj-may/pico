import React from 'react';
import { compose } from 'redux';
import { connect } from 'react-redux';
import { Route, Switch, withRouter } from 'react-router-dom';
import Login from '../pages/Login';
import Home from '../pages/Home';
import FourOhFour from '../pages/FourOhFour';
import ChooseHandle from '../pages/ChooseHandle';
import Loading from './Loading';

const App = ({ isLoading, isAuthenticated, needsHandle }) => {
  if (isLoading) return <Loading />;
  if (!isAuthenticated) return <Login />;
  if (needsHandle) return <ChooseHandle />;

  return (
    <Switch>
      <Route exact path="/" component={Home} />
      <Route component={FourOhFour} />
    </Switch>
  );
};

const mapStateToProps = state => ({
  isLoading: !state.firebase.auth.isLoaded,
  isAuthenticated: !state.firebase.auth.isEmpty,
  needsHandle: state.firebase.profile.isLoaded && !state.firebase.profile.handle,
});

export default compose(
  withRouter,
  connect(mapStateToProps)
)(App);
