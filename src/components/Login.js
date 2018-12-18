import React from 'react';
import firebase from 'firebase';
import {firebaseApp} from '../db';

class Login extends React.Component {
  state = {
    uid: null,
    loaded: false,
    displayName: "",
    error: false,
    errorMessage: ""
  };

  componentDidMount() {
    firebase.auth().onAuthStateChanged(user => {
      if(user) {
        this.authHandler({user});
      }
      this.setState({
        loaded: true
      });
    });
  };

  authenticate = provider => {
    const authProvider = new firebase.auth[`${provider}AuthProvider`]();
    firebaseApp
      .auth()
      .signInWithPopup(authProvider)
      .then(() => {
        this.authHandler();
      }).catch((error) => {
        this.setState({
          error: true,
          errorMessage: error.message
        });
      });
  };

  authHandler = (authData) => {
    const user = authData.user;
    this.setState({
      uid: user.uid,
      displayName: user.displayName,
      error: false
    });
    this.props.setUid(user.uid);
  };

  logout = async () => {
    await firebase.auth().signOut();
    this.setState({
      uid: null,
      error: false
    });
    this.props.setUid();
  };

  render () {
    let errors = "";
    if(this.state.error) {
      errors = <p className="alert alert-warning animage-appear">{this.state.errorMessage}</p>;
    }
    if(this.state.loaded) {
      if (this.state.uid == null) {
        return <nav className="login">
          <p className="alert alert-info">Sign in to manage your cards</p>
          {errors}
          <button className="google btn btn-default"
                  onClick={() => this.authenticate('Google')}>Login with Google
          </button>
          <button className="facebook btn btn-default"
                  onClick={() => this.authenticate('Facebook')}>Login with Facebook
          </button>
          <button className="github btn btn-default"
                  onClick={() => this.authenticate('Github')}>Login with Github
          </button>
        </nav>;
      } else {
        return <React.Fragment>
          <div className="alert alert-light" role="alert">
            Logged in as {this.state.displayName}
            <button className="bn btn-primary btn-sm btn-login" onClick={this.logout}>Logout</button>
          </div>
        </React.Fragment>
      }
    } else {
      return null;
    }
  };
}

export default Login;