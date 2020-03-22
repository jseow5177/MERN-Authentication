import React from "react";
import PropTypes from "prop-types";
import Button from "react-bootstrap/Button";
import Card from "react-bootstrap/Card";
import {connect} from "react-redux";
import {logoutUser} from "../../actions/authActions";

function Dashboard(props) {

  const logOut = (event) => {
    event.preventDefault();
    props.logoutUser();
  }
  return(
    <div>
      <Card>
        <Card.Body style={{textAlign: "center"}}>
          <Card.Title>Welcome {props.auth.user.name}!</Card.Title>
          <Card.Text>You are logged into this dummy app 😊</Card.Text>
          <Button variant="primary" type="submit" onClick={logOut}>Log Out</Button>
        </Card.Body>
      </Card>
    </div>
  )
}

Dashboard.propTypes = {
  logoutUser: PropTypes.func.isRequired,
  auth: PropTypes.object.isRequired
}

const mapStateToProps = (state) => ({
  auth: state.auth
});

export default connect(mapStateToProps, {logoutUser})(Dashboard);
