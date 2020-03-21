import React, {useState} from "react";
import Form from "react-bootstrap/Form";
import Button from "react-bootstrap/Button";
import ArrowBackIcon from '@material-ui/icons/ArrowBack';
import {Link} from "react-router-dom";

function Login() {
  const [loginInput, setLoginInput] = useState({
    loginEmail: "",
    loginPassword: "",
  })
  const [errors, setErrors] = useState({});

  const onInputChange = (event) => {
    setLoginInput({...loginInput, [event.target.id]: event.target.value});
  }

  const submitLoginForm = (event) => {
    event.preventDefault();

    const userData = {
      email: loginInput.loginEmail,
      password: loginInput.loginPassword,
    }

    console.log(userData);
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
          <Form.Control id="loginEmail" type="email" placeholder=" " value={loginInput.loginEmail} error={errors.email} onChange={onInputChange}/>
          <span className="floating-label">Email</span>
        </Form.Group>

        <Form.Group>
          <Form.Control id="loginPassword" type="password" placeholder=" " value={loginInput.loginPassword} error={errors.password} onChange={onInputChange}/>
          <span className="floating-label">Password</span>
        </Form.Group>

        <Button variant="primary" type="submit">Login</Button>
      </Form>
    </div>
  )
}

export default Login;
