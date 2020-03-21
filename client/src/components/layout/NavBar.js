import React from "react";
import Navbar from "react-bootstrap/Navbar";
import CodeIcon from '@material-ui/icons/Code';
import {Link} from "react-router-dom";

function NavBar() {
  return (
    <div>
      <Navbar fixed="top">
        <div style={{margin: "0 auto"}}>
          <Link to="/">
            <Navbar.Brand><CodeIcon/>MERN</Navbar.Brand>
          </Link>
        </div>
      </Navbar>
    </div>
  )
}

export default NavBar;
