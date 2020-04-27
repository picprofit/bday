import React, { useState, useEffect } from "react";
import firebase from "firebase/app";
import "firebase/auth";
import { firebaseApp } from "../db";

interface ILogin {
  setUid: (uid: string | null) => void;
}

interface IAuthHandler {
  uid?: string | null;
  displayName?: string;
  error?: boolean;
}

interface IState {
  uid: string | null;
  loaded: boolean;
  displayName: string | null;
  error: boolean | string;
  errorMessage: string;
}

const Login: React.FC<ILogin> = ({ setUid }) => {
  const [state, setState] = useState<IState>({
    uid: null,
    loaded: false,
    displayName: "",
    error: false,
    errorMessage: ""
  });

  const authenticate = (provider: any) => {
    // @ts-ignore
    const authProvider = new firebase.auth[`${provider}AuthProvider`]();
    firebaseApp
      .auth()
      .signInWithPopup(authProvider)
      .then((userCredential) => {
        authHandler(userCredential.user);
      })
      .catch(error => {
        setState({
          ...state,
          error: true,
          errorMessage: error.message
        });
      });
  };

  const authHandler = (user: firebase.User | null) => {
    if(user == null) {
      setState({
        ...state,
        uid: null,
        displayName: "",
        error: false
      });
      setUid(null);
      return;
    }
    const {uid = null, displayName = ""} = user;
    setState({
      ...state,
      uid,
      displayName,
      error: false
    });
    setUid(uid);
  };

  const logout = async () => {
    await firebase.auth().signOut();
    setState({
      ...state,
      uid: null,
      error: false
    });
    setUid(null);
  };

  useEffect(() => {
    // @ts-ignore
    firebase.auth().onAuthStateChanged((user: firebase.User) => {
      if (user) {
        authHandler(user);
      }
      setState({
        ...state,
        loaded: true
      });
    });
  }, []);

  const errors = state.error ? (
    <p className="alert alert-warning animage-appear">{state.errorMessage}</p>
  ) : (
    ""
  );

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
