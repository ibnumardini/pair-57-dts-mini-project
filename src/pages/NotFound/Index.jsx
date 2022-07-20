import React from "react";
import { Link } from "react-router-dom";
import "./notFound.css";
const NotFound = () => {
  return (
    <>
      <div className='container-notfound'>
        <Link to='/home' style={{ textDecoration: "none" }}>
          <input
            type='submit'
            className='button-notfound'
            value='BACK TO HOME'
          />
        </Link>
      </div>
    </>
  );
};

export default NotFound;
