import React from "react";
import { BrowserRouter as Router, Route } from "react-router-dom";
import "./App.css";

import NavBar from "./components/layout/NavBar";
import Landing from "./components/layout/Landing";
import Register from "./components/auth/Register";


function App() {
  return (
    <div className="App">
      <Router>
        <NavBar/>
        <Landing/>
        <Register/>
      </Router>
    </div>
  );
}

export default App;
