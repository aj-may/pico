import React from 'react';
import { compose } from 'redux';
import { connect } from 'react-redux';
import { Route, Switch, withRouter } from 'react-router-dom';
import Login from '../pages/Login';
import Topic from '../pages/Topic';
import FourOhFour from '../pages/FourOhFour';
import ChooseHandle from '../pages/ChooseHandle';
import Loading from './Loading';

const App = ({ isLoading, isAuthenticated, needsHandle }) => {
  if (isLoading) return <Loading />;
  if (!isAuthenticated) return <Login />;
  if (needsHandle) return <ChooseHandle />;

  return (
    <Switch>
      <Route exact path="/" component={Topic} />
      <Route exact path="/:type(tag|user)/:value" component={Topic} />
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
