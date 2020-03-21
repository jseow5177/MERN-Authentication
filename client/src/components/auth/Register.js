import React, {useState} from "react";
import Form from "react-bootstrap/Form";
import Button from "react-bootstrap/Button";
import ArrowBackIcon from '@material-ui/icons/ArrowBack';
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

    const newUser = {
      name: registerInput.name,
      email: registerInput.email,
      password: registerInput.password,
      password2: registerInput.password2
    }

    console.log(newUser);
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
          <Form.Control id="name" type="text" placeholder=" " value={registerInput.name} error={errors.name} onChange={onInputChange}/>
          <span className="floating-label">Username</span>
        </Form.Group>


        <Form.Group>
          <Form.Control id="email" type="email" placeholder=" " value={registerInput.email} error={errors.email} onChange={onInputChange}/>
          <span className="floating-label">Email</span>
        </Form.Group>

        <Form.Group>
          <Form.Control id="password" type="password" placeholder=" " value={registerInput.password} error={errors.password} onChange={onInputChange}/>
          <span className="floating-label">Password</span>
        </Form.Group>

        <Form.Group>
          <Form.Control id="password2" type="password" placeholder=" " value={registerInput.password2} error={errors.password2} onChange={onInputChange}/>
          <span className="floating-label">Confirm password</span>
        </Form.Group>

        <Button variant="primary" type="submit">Sign up</Button>
      </Form>
    </div>
  )
}

export default Register;
