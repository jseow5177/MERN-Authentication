import React, {useState, useEffect} from "react";
import Form from "react-bootstrap/Form";
import Button from "react-bootstrap/Button";
import ArrowBackIcon from "@material-ui/icons/ArrowBack";
import PropTypes from "prop-types";
import {Link, withRouter, useHistory} from "react-router-dom";
import classnames from "classnames";
import {connect} from "react-redux";
import {registerUser} from "../../actions/authActions";

function Register(props) {
  let history = useHistory();

  const [registerInput, setRegisterInput] = useState({
    name: "",
    email: "",
    password: "",
    password2: "",
  })
  const [errors, setErrors] = useState({});

  useEffect(() => {
    setErrors(props.errors);
  }, [props.errors]);

  useEffect(() => {
    if (props.auth.isAuthenticated) {
      history.push("/dashboard");
    }
  }, [props.auth.isAuthenticated, history]);

  const onInputChange = (event) => {
    setRegisterInput({...registerInput, [event.target.id]: event.target.value});
  }

  const submitRegisterForm = (event) => {
    event.preventDefault();

    const newUser = {
      name: registerInput.name,
      email: registerInput.email,
      password: registerInput.password,
      password2: registerInput.password2
    }

    props.registerUser(newUser, history);
  }

  return(
    <div className="form-wrapper">
      <div className="back-to-home">
        <Link to="/">
          <ArrowBackIcon/><h6 style={{display: "inline-block"}}> Back to Home</h6>
        </Link>
      </div>

      <Form noValidate onSubmit={submitRegisterForm}>
        <h4><b>Register</b> below</h4>
        <p className="form-redirect-text">Already have an account? <Link to="/login">Log in</Link></p>

        <Form.Group>
          <Form.Control className={classnames({"invalid": errors.name})} id="name" type="text" placeholder=" " value={registerInput.name} error={errors.name} onChange={onInputChange}/>
          <span className="floating-label">Username</span>
          <span className="red-text">{errors.name}</span>
        </Form.Group>


        <Form.Group>
          <Form.Control className={classnames({"invalid": errors.email})} id="email" type="email" placeholder=" " value={registerInput.email} error={errors.email} onChange={onInputChange}/>
          <span className="floating-label">Email</span>
          <span className="red-text">{errors.email}</span>
        </Form.Group>

        <Form.Group>
          <Form.Control className={classnames({"invalid": errors.password})} id="password" type="password" placeholder=" " value={registerInput.password} error={errors.password} onChange={onInputChange}/>
          <span className="floating-label">Password</span>
          <span className="red-text">{errors.password}</span>
        </Form.Group>

        <Form.Group>
          <Form.Control className={classnames({"invalid": errors.password2})} id="password2" type="password" placeholder=" " value={registerInput.password2} error={errors.password2} onChange={onInputChange}/>
          <span className="floating-label">Confirm password</span>
          <span className="red-text">{errors.password2}</span>
        </Form.Group>

        <Button variant="primary" type="submit">Sign up</Button>
      </Form>
    </div>
  )
}

// Type checking with React prop-types
Register.propTypes = {
  registerUser: PropTypes.func.isRequired,
  auth: PropTypes.object.isRequired,
  errors: PropTypes.object.isRequired
}

const mapStateToProps = (state) => ({
  auth: state.auth,
  errors: state.errors
});

// withRouter so that you can redirect within an action
export default connect(mapStateToProps, {registerUser})(withRouter(Register));
