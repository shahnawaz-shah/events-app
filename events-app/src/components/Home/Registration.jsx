import { useFormik } from "formik";
import Form from "react-bootstrap/Form";
import Button from "react-bootstrap/Button";
import { useState } from "react";

const validate = (values) => {
  const errors = {};

  // validation for name
  if (!values.name) {
    errors.name = "Name is required";
  }

  // validation for username
  if (!values.username) {
    errors.username = "Username is required";
  }

  // validation for email address
  if (!values.email) {
    errors.email = "Email is required";
  } else if (!/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,4}$/i.test(values.email)) {
    errors.email = "Invalid email address";
  }

  // validation for password
  if (!values.password) {
    errors.password = "Password is required";
  } else if (
    !/^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/.test(
      values.password
    )
  ) {
    errors.password =
      "Password must be at least 8 characters, include one uppercase, one lowercase, one number, and one special character.";
  }

  //validation for password confirmation
  if (!values.confirmPassword) {
    errors.confirmPassword = "Please confirm your password";
  } else if (values.password !== values.confirmPassword) {
    errors.confirmPassword = "Passwords do not match";
  }

  return errors;
};

const Registration = () => {

  const [registered, setRegistered] = useState(false);
  const [loggedIn, setLoggedIn] = useState(false)

  const formik = useFormik({
    initialValues: {
      name: "",
      username: "",
      email: "",
      password: "",
      confirmPassword: "",
    },
    validate,
    onSubmit: (values) => {
      // submit handling code goes here
      console.log(values);

      
      if (!registered) {
        setRegistered(true)
      } 
      else {
        setRegistered(false);
      }

    },
  });

  return (
    <div className="login-form-container">
      <Form
        onSubmit={formik.handleSubmit}
        className="p-4 shadow rounded w-75 mx-auto"
      >
        {/* conditional rendering logic of register form */}
      {registered ? (
        <>
          <h1>Thanks for registering! Click the login button to get started.</h1>
          <Button type="button" className="w-50">Login</Button>
        </>
        
      ) : ( 
        <>
          {/*name*/}
        <Form.Group className="mb-3">
          <Form.Label>Name</Form.Label>
          <Form.Control
            type="text"
            name="name"
            maxLength={32}
            value={formik.values.name}
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
            isInvalid={formik.touched.name && !!formik.errors.name}
          />
          <Form.Control.Feedback type="invalid">
            {formik.errors.name}
          </Form.Control.Feedback>
        </Form.Group>

        {/* username */}
        <Form.Group className="mb-3">
          <Form.Label>Username</Form.Label>
          <Form.Control
            type="text"
            name="username"
            maxLength={32}
            value={formik.values.username}
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
            isInvalid={formik.touched.username && !!formik.errors.username}
          />
          <Form.Control.Feedback type="invalid">
            {formik.errors.username}
          </Form.Control.Feedback>
        </Form.Group>

        {/* email address */}
        <Form.Group className="mb-3">
          <Form.Label>Email</Form.Label>
          <Form.Control
            type="email"
            name="email"
            value={formik.values.email}
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
            isInvalid={formik.touched.email && !!formik.errors.email}
          />
          <Form.Control.Feedback type="invalid">
            {formik.errors.email}
          </Form.Control.Feedback>
        </Form.Group>

        {/* password */}
        <Form.Group className="mb-3">
          <Form.Label>Password</Form.Label>
          <Form.Control
            type="password"
            name="password"
            minLength={8}
            value={formik.values.password}
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
            isInvalid={formik.touched.password && !!formik.errors.password}
          />
          <Form.Control.Feedback type="invalid">
            {formik.errors.password}
          </Form.Control.Feedback>
        </Form.Group>

        {/* confirm password */}
        <Form.Group className="mb-3">
          <Form.Label>Confirm password</Form.Label>
          <Form.Control
            type="password"
            name="confirmPassword"
            minLength={8}
            value={formik.values.confirmPassword}
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
            isInvalid={
              formik.touched.confirmPassword && !!formik.errors.confirmPassword
            }
          />
          <Form.Control.Feedback type="invalid">
            {formik.errors.confirmPassword}
          </Form.Control.Feedback>
        </Form.Group>

        <Button type="submit" className="w-100">
          Submit
        </Button>
        </>
      )}
      </Form>
    </div>
  );
};

export default Registration;
