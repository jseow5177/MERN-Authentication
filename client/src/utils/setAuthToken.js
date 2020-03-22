import axios from "axios";

// Set and delete Authorization header for axios requests depending on whether user is logged in

const setAuthToken = (token) => {
  if (token) {
    // Set global axios defaults that will be applied to every requests
    // If logged in, apply authorization token to every requests
    axios.defaults.headers.common["Authorization"] = token;
  } else {
    // Delete auth header
    delete axios.defaults.headers.common["Authorization"];
  }
}

export default setAuthToken;
