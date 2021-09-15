import React from "react";
import { useFirebase } from "react-redux-firebase";
import { useHistory } from "react-router-dom";

const SignIn = () => {
  // use firebase and history, store them in variables
  const firebase = useFirebase();
  const history = useHistory();
  /* 
call firebase.login and pass in an object with the provider and type (popup or redirect). 
then programatically navigate to /todos using history. 
*/
  const signInWithGoogle = () => {
    firebase
      .login({
        provider: "google",
        type: "popup",
      })
      .then(() => {
        history.push("/todos");
      });
  };

  return (
    <div>
      <h1>Sign In</h1>
      <button
        onClick={(event) => {
          // prevent the page from refreshing, then sign in
          event.preventDefault();
          signInWithGoogle();
        }}
      >
        Sign In with Google
      </button>
    </div>
  );
};

export default SignIn;
