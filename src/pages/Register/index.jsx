import React, { useState } from "react";
import "../Login/Login.css";
import { Link } from "react-router-dom";
import axios from "axios";
import Snackbar from "@mui/material/Snackbar";
import MuiAlert from "@mui/material/Alert";
const Alert = React.forwardRef(function Alert(props, ref) {
  return <MuiAlert elevation={6} ref={ref} variant='filled' {...props} />;
});
const Register = () => {
  const [error, setError] = useState(null);
  const [errorPass, setErrorPass] = useState(null);
  const [input, setInput] = useState({
    name: "",
    email: "",
    password: "",
  });
  const [open, setOpen] = useState(false);
  const [succes, setSucces] = useState(null);
  const basePath = process.env.REACT_APP_BASE_URL;
  const vertical = "top";
  const horizontal = "right";
  const handleChange = (event) => {
    let value = event.target.value;
    let nameOfInput = event.target.name;
    setInput({ ...input, [nameOfInput]: value });
    setError(null);
    setErrorPass(null);
  };
  const handleSubmit = (event) => {
    event.preventDefault();
    const { name, email, password } = input;
    if (!isValidEmail(email)) {
      setError("Email is invalid");
    } else {
      setError(null);
    }
    if (password.length < 6) {
      setErrorPass("Password must then 6 digits");
    } else {
      setErrorPass(null);
    }
    if (isValidEmail(email) && password.length >= 6) {
      axios
        .post(`${basePath}/register `, {
          name: name,
          email: email,
          password: password,
        })
        .then((e) => {
          setSucces(true);
          setOpen(true);
          setTimeout(() => {
            window.location.reload();
          }, 700);
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
                name='name'
                required
                className='input-box'
                placeholder='NAME'
                onChange={handleChange}
                value={input.name}
              />
            </div>
            <div className='input-container'>
              <input
                type='text'
                name='email'
                required
                className='input-box'
                placeholder='EMAIL'
                onChange={handleChange}
                value={input.email}
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
              <input type='submit' className='button-login' value='REGISTER' />
            </div>
            <span className='info-text'>
              Have account ??{" "}
              <Link to='/' style={{ textDecoration: "none" }}>
                <span>Login here</span>
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
            Succes Register
          </Alert>
        ) : (
          <Alert severity='error'>Register Failed !!</Alert>
        )}
      </Snackbar>
    </div>
  );
};
export default Register;
