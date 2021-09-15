import React from "react";
import { Route, Redirect } from "react-router-dom";
import { isLoaded, isEmpty } from "react-redux-firebase";
import { useSelector } from "react-redux";
/* 
This is a private route, which will only render its child component if the user is authenticated.
*/
const PrivateRoute = ({ children, ...remainingProps }) => {
  // get the auth object from the state. This is a thing because the firebase reducer returns a state with an auth property.
  const auth = useSelector((state) => state.firebase.auth);
  return (
    <Route
      {...remainingProps} // pass in the props
      // location contains the current pathname and some other properties.
      render={({ location }) =>
        /* 
        isLoaded and isEmpty are two functions provided by RRF. it takes a little bit for the user to sign in, so only
        after that can we check if the user has signed in and perform some action. if so, render the child of the 
        private route, a.k.a. the todos. else, redirect to home. 
      */
        isLoaded(auth) && !isEmpty(auth) ? (
          children
        ) : (
          <Redirect
            to={{
              pathname: "/",
              // why do we need to specify from where we are redirecting?
              state: { from: location },
            }}
          />
        )
      }
    />
  );
};

export default PrivateRoute;
