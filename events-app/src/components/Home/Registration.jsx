import { useFormik } from "formik";
import Form from "react-bootstrap/Form";
import Button from "react-bootstrap/Button";
import { useState, useRef } from "react";
import { useContext } from "react";
import { AuthContext } from "../../AuthContext";
import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import Alert from "react-bootstrap/Alert";

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
  // get logged in status from context
  const { loggedIn, setLoggedIn } = useContext(AuthContext);
  const [loginError, setLoginError] = useState("");

  let nav = useNavigate();
  const isInitial = useRef(true);

  // useEffect & useNavigate for initial load and nav to dashboard
  useEffect(() => {
    console.log("loggedIn changed:", loggedIn);

    if (isInitial.current) {
      isInitial.current = false;
      return;
    }

    if (loggedIn) {
      nav("/dashboard");
    }
  }, [loggedIn]);

  const [registered, setRegistered] = useState(false);

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
      // submit handling code for reg form
      console.log(values);

      // set user info to local storage
      localStorage.setItem("registeredUser", JSON.stringify(values));

      if (!registered) {
        setRegistered(true);
      }
    },
  });

  const loginFormik = useFormik({
    initialValues: {
      username: "",
      password: "",
    },

    onSubmit: (values) => {
      // submit handle code for login form

      // parse locale storage for user info
      const storedUser = JSON.parse(localStorage.getItem("registeredUser"));

      // check if a user exists
      if (!storedUser) {
        setLoginError("No registered user found.");
        return;
      }

      // check if login form data matches local storage
      if (
        storedUser.username === values.username &&
        storedUser.password === values.password
      ) {
        setLoggedIn(true);
        nav("/dashboard");
      } else {
        setLoginError("Invalid username or password. Please try again.");
      }
    },
  });

  return (
    <div className="login-form-container">
      {!registered ? (
        <Form
          onSubmit={formik.handleSubmit}
          className="p-4 shadow rounded w-75 mx-auto"
        >
          {/*name*/}
          <Form.Group className="mb-3">
            <Form.Label>Name</Form.Label>
            <Form.Control
              placeholder="e.g. John Smith"
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
              placeholder="e.g. John2025"
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
              placeholder="e.g. john.s@gmail.com"
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
              placeholder="Password"
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
              placeholder="Confirm password"
              type="password"
              name="confirmPassword"
              minLength={8}
              value={formik.values.confirmPassword}
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
              isInvalid={
                formik.touched.confirmPassword &&
                !!formik.errors.confirmPassword
              }
            />
            <Form.Control.Feedback type="invalid">
              {formik.errors.confirmPassword}
            </Form.Control.Feedback>
          </Form.Group>

          <Button type="submit" className="w-100">
            Submit
          </Button>
        </Form>
      ) : (
        // log in form
        <Form
          onSubmit={loginFormik.handleSubmit}
          className="p-4 shadow rounded w-75 mx-auto"
        >
          <>
            <h2>Login</h2>
            {loginError && (
              <Alert
                variant="danger"
                onClose={() => setLoginError("")}
                dismissible
              >
                {loginError}
              </Alert>
            )}
            {/* username */}
            <Form.Group className="mb-3">
              <Form.Label>Username</Form.Label>
              <Form.Control
                placeholder="e.g. John2025"
                type="text"
                name="username"
                maxLength={32}
                value={loginFormik.values.username}
                onChange={loginFormik.handleChange}
                onBlur={loginFormik.handleBlur}
                isInvalid={
                  loginFormik.touched.username && !!loginFormik.errors.username
                }
              />
              <Form.Control.Feedback type="invalid">
                {loginFormik.errors.username}
              </Form.Control.Feedback>
            </Form.Group>
            {/* password */}
            <Form.Group className="mb-3">
              <Form.Label>Password</Form.Label>
              <Form.Control
                placeholder="Password"
                type="password"
                name="password"
                minLength={8}
                value={loginFormik.values.password}
                onChange={loginFormik.handleChange}
                onBlur={loginFormik.handleBlur}
                isInvalid={
                  loginFormik.touched.password && !!loginFormik.errors.password
                }
              />
              <Form.Control.Feedback type="invalid">
                {loginFormik.errors.password}
              </Form.Control.Feedback>
            </Form.Group>

            <Button type="submit" className="w-50">
              Login
            </Button>
          </>
        </Form>
      )}
    </div>
  );
};

export default Registration;
