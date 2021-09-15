import { combineReducers } from "redux";
import { firebaseReducer } from "react-redux-firebase";
import { firestoreReducer } from "redux-firestore";

/* 
the firebase field of the state is controlled by the firebaseReducer, 
and the firestore field is controlled by the firestoreReducer.
combine these two reducers into one.
This reducer will handle all changes that occur in firebase (we're using the auth part) and firestore.
This means that whenever an action is dipatched, it will return the new state.
*/
export const rootReducer = combineReducers({
  firebase: firebaseReducer,
  firestore: firestoreReducer,
});
