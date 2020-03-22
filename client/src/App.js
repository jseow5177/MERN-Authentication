import React from "react";
import { BrowserRouter as Router, Route } from "react-router-dom";
import jwt_decode from "jwt-decode";
import setAuthToken from "./utils/setAuthToken";
import {setCurrentUser, logoutUser} from "./actions/authActions";


import {Provider} from "react-redux";
import store from "./store";

import "./App.css";

import NavBar from "./components/layout/NavBar";
import Landing from "./components/layout/Landing";
import Register from "./components/auth/Register";
import Login from "./components/auth/Login";
import PrivateRoute from "./components/private-route/PrivateRoute";
import Dashboard from "./components/dashboard/Dashboard";

function App() {

  // If token exists
  if (localStorage.getItem("jwtToken")) {
    // Set token to header
    const token = localStorage.getItem("jwtToken");
    setAuthToken(token);
    // Decode token to get user info (id and name) and expiry time
    const decoded = jwt_decode(token);
    store.dispatch(setCurrentUser(decoded));
  
    // Check for expired token
    const currentTime = Date.now() / 1000; // In milliseconds
    if (decoded.exp < currentTime) {
      // Logout user
      store.dispatch(logoutUser());
      // Redirect to login
      window.location.href = "./login"
    }
  }

  return (
    <Provider store={store}>
      <Router>
        <div className="App">
          <NavBar/>
          <Route exact path="/" component={Landing}/>
          <Route exact path="/register" component={Register}/>
          <Route exact path="/login" component={Login}/>
          <PrivateRoute exact path="/dashboard" component={Dashboard}/>
        </div>
      </Router>
    </Provider>
  );
}

export default App;
