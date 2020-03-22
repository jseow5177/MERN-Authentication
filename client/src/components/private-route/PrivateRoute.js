// Criterias of PrivateRoute component
// 1. It has the same API as <Route />
// 2. It renders a <Route /> and passes all the props through it
// 3. Checks authentication.

import React from "react";
import {Route, Redirect} from "react-router-dom";
import {connect} from "react-redux";
import PropTypes from "prop-types";

const PrivateRoute = ({component: Component, auth, ...rest}) => (
  <Route
    {...rest}
    render={props =>
      auth.isAuthenticated === true ? (<Component {...props}/>) : (<Redirect to="/login"/>)
    }
  />
);

PrivateRoute.propTypes = {
  auth: PropTypes.object.isRequired
}

const mapStateToProps = state => ({
  auth: state.auth
});

export default connect(mapStateToProps, null)(PrivateRoute);
