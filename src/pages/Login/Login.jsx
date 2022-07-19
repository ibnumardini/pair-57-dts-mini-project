import React, { useState } from "react";
import "./Login.css";
import { Link, Navigate } from "react-router-dom";
import axios from "axios";
import Cookies from "js-cookie";
import Snackbar from "@mui/material/Snackbar";
import MuiAlert from "@mui/material/Alert";
const Alert = React.forwardRef(function Alert(props, ref) {
  return <MuiAlert elevation={6} ref={ref} variant='filled' {...props} />;
});
const Login = () => {
  const [error, setError] = useState(null);
  const [errorPass, setErrorPass] = useState(null);
  const [token, setToken] = useState(null);
  const [open, setOpen] = useState(false);
  const [succes, setSucces] = useState(null);
  const [input, setInput] = useState({
    username: "",
    password: "",
  });
  const basePath = process.env.REACT_APP_BASE_URL;
  const vertical = "top";
  const horizontal = "right";
  if (token !== null) {
    return <Navigate to={"/home"} />;
  }
  const handleChange = (event) => {
    let value = event.target.value;
    let nameOfInput = event.target.name;
    setInput({ ...input, [nameOfInput]: value });
    setError(null);
    setErrorPass(null);
  };
  const handleSubmit = (event) => {
    event.preventDefault();
    const { username, password } = input;
    if (!isValidEmail(username)) {
      setError("Email is invalid");
    } else {
      setError(null);
    }
    if (password.length < 6) {
      setErrorPass("Password must then 6 digits");
    } else {
      setErrorPass(null);
    }
    if (isValidEmail(username) && password.length >= 6) {
      axios
        .post(`${basePath}/user-login`, {
          email: username,
          password: password,
        })
        .then((e) => {
          setToken(e.data.token);
          let token = e.data.token;
          let name = e.data.user?.name;
          Cookies.set("token", token, { expires: 1 });
          Cookies.set("name", name, { expires: 1 });
          setSucces(true);
          setOpen(true);
          setTimeout(() => {
            window.location.reload();
          }, 500);
        })
        .catch((error) => {
          setSucces(false);
          setOpen(true);
        });
    }
  };

  const handleClose = (event, reason) => {
    if (reason === "clickaway") {
      return;
    }
    setOpen(false);
  };

  function isValidEmail(email) {
    return /\S+@\S+\.\S+/.test(email);
  }
  return (
    <div className='login-container'>
      <div className='login'>
        <div className='left-login' />
        <div className='right-login'>
          <form onSubmit={handleSubmit}>
            <div className='input-container'>
              <input
                type='text'
                name='username'
                required
                className='input-box'
                placeholder='EMAIL'
                onChange={handleChange}
                value={input.username}
              />
            </div>
            {error && <span className='warning-text'>{error}</span>}
            <div className='input-container'>
              <input
                type='password'
                name='password'
                required
                className='input-box'
                placeholder='PASSWORD'
                onChange={handleChange}
                value={input.password}
              />
            </div>
            {errorPass && <span className='warning-text'>{errorPass}</span>}
            <div className='button-container'>
              <input type='submit' className='button-login' value='LOGIN' />
            </div>
            <span className='info-text'>
              Don't have account ??{" "}
              <Link to='/register' style={{ textDecoration: "none" }}>
                <span>Register here</span>
              </Link>
            </span>
          </form>
        </div>
      </div>
      <Snackbar
        open={open}
        autoHideDuration={6000}
        onClose={handleClose}
        anchorOrigin={{ vertical, horizontal }}
      >
        {succes === true ? (
          <Alert
            onClose={handleClose}
            severity='success'
            sx={{ width: "100%" }}
          >
            Succes Login
          </Alert>
        ) : (
          <Alert severity='error'>Email and Password Wrong</Alert>
        )}
      </Snackbar>
    </div>
  );
};
export default Login;
