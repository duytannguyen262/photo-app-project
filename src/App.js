import { unwrapResult } from "@reduxjs/toolkit";
import photoApi from "api/photoApi";
import { getMe } from "app/userSlice";
import SignIn from "features/Auth/pages/SignIn";
import firebase from "firebase/compat/app";
import "firebase/compat/auth";
import React, { Suspense, useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import { BrowserRouter, Redirect, Route, Switch } from "react-router-dom";
import Header from "./components/Header";
import NotFound from "./components/NotFound";
import "./index.css";

//Lazy Load
const Photo = React.lazy(() => import("./features/Photo"));

//Configure Firebase
const config = {
  apiKey: process.env.REACT_APP_FIREBASE_API_KEY,
  authDomain: process.env.REACT_APP_FIREBASE_AUTH_DOMAIN,
  timeout: 5000,
};
firebase.initializeApp(config);

function App() {
  const [productList, setProductList] = useState([]);
  const dispatch = useDispatch();
  const [isSignedIn, setIsSignedIn] = useState(false); // Local signed-in state.

  useEffect(() => {
    const fetchProductList = async () => {
      try {
        const params = {
          _page: 1,
          _limit: 10,
        };
        const response = await photoApi.getAll(params);
        setProductList(response.data);
      } catch (error) {
        console.log("Failed to fetch product list", error);
      }
    };
    fetchProductList();
  }, []);

  // Listen to the Firebase Auth state and set the local state.
  useEffect(() => {
    const unregisterAuthObserver = firebase
      .auth()
      .onAuthStateChanged(async (user) => {
        if (!user) {
          //user logs out, handle something here
          console.log("User is not logged in!");
          return;
        }
        setIsSignedIn(!!user);
        const token = await user.getIdToken();
        localStorage.setItem(
          "rememberedAccounts",
          JSON.stringify(user.providerData)
        );

        //Get me when signed in
        try {
          const actionResult = await dispatch(getMe());
          const currentUser = unwrapResult(actionResult);
          console.log("Logged in user: ", currentUser);
        } catch (error) {
          console.log(error);
        }
      });
    return () => unregisterAuthObserver(); // Make sure we un-register Firebase observers when the component unmounts.
  }, []);

  return (
    <div>
      <div className="photo-app">
        <Suspense fallback={<div>Loading...</div>}>
          <div className="container">
            <BrowserRouter>
              <Header isSignedIn={isSignedIn} />
              <Switch>
                <Redirect exact from="/" to="/photos" />

                <Route path="/photos" component={Photo} />
                <Route path="/sign-in" component={SignIn} />
                <Route component={NotFound} />
              </Switch>
            </BrowserRouter>
          </div>
        </Suspense>
      </div>
    </div>
  );
}

export default App;
