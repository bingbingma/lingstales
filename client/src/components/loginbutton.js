import React, { Component } from "react";
import Auth from "../auth/auth";
import "./loginbutton.css";

function login() {
 const auth = new Auth();
 auth.login();
}

class LoginButton extends Component {
 render() {
  return (
   <div>
    <button class="link" onClick={login}>Login / Signup</button>
   </div>
  );
 }
}

export default LoginButton;