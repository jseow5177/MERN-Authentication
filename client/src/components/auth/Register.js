import React, {useState} from "react";
import Form from "react-bootstrap/Form";
import Button from "react-bootstrap/Button";
import {Link} from "react-router-dom";

function Register() {
  const [registerInput, setRegisterInput] = useState({
    name: "",
    email: "",
    password: "",
    password2: "",
  })
  const [errors, setErrors] = useState({});

  const onInputChange = (event) => {
    setRegisterInput({...registerInput, [event.target.id]: event.target.value});
  }

  const submitRegisterForm = (event) => {
    event.preventDefault();
  }

  const newUser = {
    name: name,
    email: email,
    password: password,
    password2: password2
  }

  return(
    <div className="form-wrapper">
      <Form noValidate onSubmit={submitRegisterForm}>
        <h4><b>Register</b> below</h4>
        <p className="form-redirect-text">Already have an account? <Link to="/login">Log in</Link></p>

        <Form.Group controlId="registerFormName">
          <Form.Control id="name" type="text" placeholder=" " value={registerInput.name} error={errors.name} onChange={onInputChange}/>
          <span className="floating-label">Username</span>
        </Form.Group>


        <Form.Group controlId="registerFormEmail">
          <Form.Control type="email" placeholder=" " value={registerInput.email} error={errors.email} onChange={onInputChange}/>
          <span className="floating-label">Email</span>
        </Form.Group>

        <Form.Group controlId="registerFormPassword">
          <Form.Control type="password" placeholder=" " value={registerInput.password} error={errors.password} onChange={onInputChange}/>
          <span className="floating-label">Password</span>
        </Form.Group>

        <Form.Group controlId="registerFormConfirmPassword">
          <Form.Control type="password" placeholder=" " value={registerInput.password2} error={errors.password2} onChange={onInputChange}/>
          <span className="floating-label">Confirm password</span>
        </Form.Group>

        <Button variant="primary" type="submit">Sign up</Button>
      </Form>
    </div>
  )
}

export default Register;
