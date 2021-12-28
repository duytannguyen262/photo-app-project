import React from "react";
import firebase from "firebase/compat/app";
import "firebase/compat/auth";
import { StyledFirebaseAuth } from "react-firebaseui";
// Configure FirebaseUI.
const uiConfig = {
  // Popup signin flow rather than redirect flow.
  signInFlow: "popup",
  signInSuccessUrl: "/photos",
  // We will display Google and Facebook as auth providers.
  signInOptions: [
    firebase.auth.GoogleAuthProvider.PROVIDER_ID,
    firebase.auth.FacebookAuthProvider.PROVIDER_ID,
    firebase.auth.GithubAuthProvider.PROVIDER_ID,
  ],
};

const SignIn = () => {
  return (
    <div>
      <div className="text-center">
        <h2>Login Form</h2>
        <p>or login with social accounts</p>
      </div>
      <StyledFirebaseAuth uiConfig={uiConfig} firebaseAuth={firebase.auth()} />
    </div>
  );
};

SignIn.propTypes = {};

export default SignIn;
