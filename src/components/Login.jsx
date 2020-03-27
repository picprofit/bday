import React, { useState, useEffect } from "react";
import firebase from "firebase/app";
import "firebase/auth";
import { firebaseApp } from "../db";

const Login = ({ setUid }) => {
  const [state, setState] = useState({
    uid: null,
    loaded: false,
    displayName: "",
    error: false,
    errorMessage: ""
  });

  const authenticate = provider => {
    const authProvider = new firebase.auth[`${provider}AuthProvider`]();
    firebaseApp
      .auth()
      .signInWithPopup(authProvider)
      .then(() => {
        authHandler();
      })
      .catch(error => {
        setState({
          error: true,
          errorMessage: error.message
        });
      });
  };

  const authHandler = authData => {
    const user = authData.user;
    setState({
      uid: user.uid,
      displayName: user.displayName,
      error: false
    });
    setUid(user.uid);
  };

  const logout = async () => {
    await firebase.auth().signOut();
    setState({
      uid: null,
      error: false
    });
    setUid();
  };

  useEffect(() => {
    firebase.auth().onAuthStateChanged(user => {
      if (user) {
        authHandler({ user });
      }
      setState({
        loaded: true
      });
    });
  }, []);

  let errors = "";
  if (state.error) {
    errors = (
      <p className="alert alert-warning animage-appear">{state.errorMessage}</p>
    );
  }
  if (state.loaded) {
    if (state.uid == null) {
      return (
        <nav className="login">
          <p className="alert alert-info">Sign in to manage your cards</p>
          {errors}
          <button
            className="google btn btn-default"
            onClick={() => authenticate("Google")}
          >
            Login with Google
          </button>
          <button
            className="facebook btn btn-default"
            onClick={() => authenticate("Facebook")}
          >
            Login with Facebook
          </button>
          <button
            className="github btn btn-default"
            onClick={() => authenticate("Github")}
          >
            Login with Github
          </button>
        </nav>
      );
    } else {
      return (
        <React.Fragment>
          <div className="alert alert-light" role="alert">
            Logged in as {state.displayName}
            <button
              className="bn btn-primary btn-sm btn-login"
              onClick={logout}
            >
              Logout
            </button>
          </div>
        </React.Fragment>
      );
    }
  } else {
    return null;
  }
};

export default Login;
