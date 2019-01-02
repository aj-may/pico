import React, { Fragment } from 'react';
import { render } from 'react-dom';
import { MuiThemeProvider } from '@material-ui/core/styles';
import CssBaseline from '@material-ui/core/CssBaseline';
import firebase from 'firebase/app';
import 'firebase/auth';
import 'firebase/firestore';
import 'firebase/storage';
import { createStore, applyMiddleware, combineReducers, compose } from 'redux';
import { reactReduxFirebase, firebaseReducer } from 'react-redux-firebase';
import { reduxFirestore, firestoreReducer } from 'redux-firestore';
import { Provider } from 'react-redux';
import { createBrowserHistory } from 'history';
import { Router } from 'react-router-dom';
import App from './components/App';
import logger from 'redux-logger';
import theme from './theme';

window.MediaRecorder = require('audio-recorder-polyfill');

const config = {
  apiKey: 'AIzaSyCQMef8Tz1QCXH6mv1RikGAttL0_OwVECk',
  authDomain: 'pico-a19ee.firebaseapp.com',
  databaseURL: 'https://pico-a19ee.firebaseio.com',
  projectId: 'pico-a19ee',
  storageBucket: 'pico-a19ee.appspot.com',
  messagingSenderId: '139228562797'
};

const rrfConfig = {
  userProfile: 'users',
  useFirestoreForProfile: true
};

firebase.initializeApp(config);
firebase.firestore().settings({ timestampsInSnapshots: true });

const createStoreWithFirebase = compose(
  reduxFirestore(firebase),
  reactReduxFirebase(firebase, rrfConfig)
)(createStore);

const rootReducer = combineReducers({
  firebase: firebaseReducer,
  firestore: firestoreReducer
});

const store = createStoreWithFirebase(rootReducer, applyMiddleware(logger));
const history = createBrowserHistory();

render(
  <MuiThemeProvider theme={theme}>
    <Provider store={store}>
      <Router history={history}>
        <Fragment>
          <CssBaseline />
          <App />
        </Fragment>
      </Router>
    </Provider>
  </MuiThemeProvider>,
  document.getElementById('root')
);
