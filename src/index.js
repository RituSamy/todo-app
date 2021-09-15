import React from "react";
import ReactDOM from "react-dom";
import "./index.css";
import * as serviceWorker from "./serviceWorker";
import firebase from "firebase/app";
import "firebase/auth";
import "firebase/firestore";
import { createStore } from "redux";
import { Provider } from "react-redux";
import { ReactReduxFirebaseProvider } from "react-redux-firebase";
import { createFirestoreInstance } from "redux-firestore";
import { rootReducer } from "./redux/reducers";
import App from "./App";
import { BrowserRouter } from "react-router-dom";

const firebaseConfig = {
  apiKey: "AIzaSyDLdnemotjq9MU-6w99G_tH8RbruOxzryk",
  authDomain: "todo-app-a7064.firebaseapp.com",
  databaseURL: "https://todo-app-a7064.firebaseio.com",
  projectId: "todo-app-a7064",
  storageBucket: "todo-app-a7064.appspot.com",
  messagingSenderId: "647951356546",
  appId: "1:647951356546:web:00687b14c1b75a84831a9b",
  measurementId: "G-QHX19MFYQM",
};

/* 
configuration for react-redux-firebase. This stores authenticated users' data in firestore
by creating a document for each authenticated user in a 'users' collection. We are also
using firestore to store the user's profile rather than RTDB.
*/
const rrfConfig = {
  userProfile: "users", // collection name for profiles
  useFirestoreForProfile: true, // as opposed to real time database
};

firebase.initializeApp(firebaseConfig);
firebase.firestore();

const initialState = {};
const store = createStore(rootReducer, initialState);

/* 
these are the props for ReactReduxFirebaseProvider. We pass it the firebase,
config, dispatch, which is Redux's dipatch function?
and createFirestoreInstance which is the function for creating a firestore instance.
*/
const rrfProps = {
  firebase,
  config: rrfConfig,
  dispatch: store.dispatch,
  createFirestoreInstance, //since we are using Firestore
};

ReactDOM.render(
  <React.StrictMode>
    <Provider store={store}>
      <ReactReduxFirebaseProvider {...rrfProps}>
        <BrowserRouter>
          <App />
        </BrowserRouter>
      </ReactReduxFirebaseProvider>
    </Provider>
  </React.StrictMode>,
  document.getElementById("root")
);

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
serviceWorker.unregister();
