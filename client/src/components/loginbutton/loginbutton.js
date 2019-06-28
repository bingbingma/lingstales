// Loginbutton.js

import React, { Component } from "react";
import Auth from "../../auth/auth";
import "./loginbutton.css";

function login() {
  const auth = new Auth();
  auth.login();
}

class LoginButton extends Component {
  render() {
    return (
      <button className="link" onClick={login}>
        Login / Signup
      </button>
    );
  }
}

export default LoginButton;
