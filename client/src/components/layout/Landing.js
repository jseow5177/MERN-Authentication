import React from "react";
import Card from "react-bootstrap/Card";
import Button from "react-bootstrap/Button";
import {Link} from "react-router-dom";

function Landing() {
  return (
    <div>
      <Card>
        <Card.Body>
          <Card.Title>Login/Auth App with MERN stack</Card.Title>
          <Card.Text>
            Create a full stack app with user authentication via passport and JWT!
          </Card.Text>
            <div className="landing-btn-group">
              <Link to="/login">
                <Button variant="secondary" className="landing-btn">Login</Button>
              </Link>
              <Link to="/register">
                <Button variant="secondary" className="landing-btn">Register</Button>
              </Link>
            </div>
        </Card.Body>
      </Card>
    </div>
  )
}

export default Landing;
