import React, { Component, Fragment } from 'react';
import { MuiThemeProvider } from '@material-ui/core/styles';
import CssBaseline from '@material-ui/core/CssBaseline';
import firebase from 'firebase/app';
import 'firebase/auth';
import 'firebase/firestore';
import { createStore, applyMiddleware, combineReducers, compose } from 'redux';
import { reactReduxFirebase, firebaseReducer } from 'react-redux-firebase';
import { reduxFirestore, firestoreReducer } from 'redux-firestore';
import { Provider } from 'react-redux';
import logger from 'redux-logger';
import theme from './theme';
import Pages from './Pages';

const config = {
  apiKey: "AIzaSyCQMef8Tz1QCXH6mv1RikGAttL0_OwVECk",
  authDomain: "pico-a19ee.firebaseapp.com",
  databaseURL: "https://pico-a19ee.firebaseio.com",
  projectId: "pico-a19ee",
  storageBucket: "pico-a19ee.appspot.com",
  messagingSenderId: "139228562797"
};

const rrfConfig = {
  userProfile: 'users',
  useFirestoreForProfile: true,
};

firebase.initializeApp(config);
firebase.firestore().settings({ timestampsInSnapshots: true });

const createStoreWithFirebase = compose(
  reduxFirestore(firebase),
  reactReduxFirebase(firebase, rrfConfig)
)(createStore);

const rootReducer = combineReducers({
  firebase: firebaseReducer,
  firestore: firestoreReducer,
});

// const initialState = {}
const store = createStoreWithFirebase(rootReducer, applyMiddleware(logger));

class App extends Component {
  async login() {
    const provider = new firebase.auth.GithubAuthProvider();

    try {
      await firebase.auth().signInWithPopup(provider);
    } catch(err) {
      console.error(err);
    }
  }

  render() {
    return (
      <MuiThemeProvider theme={theme}>
        <Provider store={store}>
          <Fragment>
            <CssBaseline />
            <Pages />
          </Fragment>
        </Provider>
      </MuiThemeProvider>
    );
  }
}

export default App;
