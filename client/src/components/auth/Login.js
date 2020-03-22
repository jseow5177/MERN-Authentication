import React, {useState, useEffect} from "react";
import Form from "react-bootstrap/Form";
import Button from "react-bootstrap/Button";
import ArrowBackIcon from '@material-ui/icons/ArrowBack';
import PropTypes from "prop-types";
import {Link, useHistory} from "react-router-dom";
import {connect} from "react-redux";
import {loginUser} from "../../actions/authActions";
import classnames from "classnames";

function Login(props) {
  let history = useHistory();

  const [loginInput, setLoginInput] = useState({
    loginEmail: "",
    loginPassword: "",
  })
  const [errors, setErrors] = useState({});

  useEffect(() => {
    if (props.errors) {
      setErrors(props.errors);
    }
    if (props.auth.isAuthenticated) {
      history.push("/dashboard"); // push user to dashboard when they logged in
    }
  }, [props.auth, props.errors, history]);

  const onInputChange = (event) => {
    setLoginInput({...loginInput, [event.target.id]: event.target.value});
  }

  const submitLoginForm = (event) => {
    event.preventDefault();

    const userData = {
      email: loginInput.loginEmail,
      password: loginInput.loginPassword,
    }

    props.loginUser(userData); // Don't need to pass in history parameter as rerouting is done within component
  }

  return(
    <div className="form-wrapper">
      <div className="back-to-home">
        <Link to="/">
          <ArrowBackIcon/><h6 style={{display: "inline-block"}}> Back to Home</h6>
        </Link>
      </div>

      <Form noValidate onSubmit={submitLoginForm}>
        <h4><b>Login</b> below</h4>
        <p className="form-redirect-text">Don't have an account? <Link to="/register">Register</Link></p>

        <Form.Group>
          <Form.Control className={classnames({"invalid": errors.email || errors.emailNotFound})} id="loginEmail" type="email" placeholder=" " value={loginInput.loginEmail} error={errors.email} onChange={onInputChange}/>
          <span className="floating-label">Email</span>
          <span className="red-text">{errors.email}{errors.emailNotFound}</span>
        </Form.Group>

        <Form.Group>
          <Form.Control className={classnames({"invalid": errors.password || errors.passwordIncorrect})} id="loginPassword" type="password" placeholder=" " value={loginInput.loginPassword} error={errors.password} onChange={onInputChange}/>
          <span className="floating-label">Password</span>
          <span className="red-text">{errors.password}{errors.passwordIncorrect}</span>
        </Form.Group>

        <Button variant="primary" type="submit">Login</Button>
      </Form>
    </div>
  )
}

Login.propTypes = {
  loginUser: PropTypes.func.isRequired,
  auth: PropTypes.object.isRequired,
  errors: PropTypes.object.isRequired
};

const mapStateToProps = (state) => ({
  auth: state.auth,
  errors: state.errors
});

export default connect(mapStateToProps, {loginUser})(Login);
