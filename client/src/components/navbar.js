import React from "react";
import LoginButton from "./loginbutton";
class NavBar extends React.Component{
  render(){
  return (
    <header style={headerStyle}>
    <h1>
      Ling's Tales
    </h1>
    <p>Home</p> 
    <p>Read</p>
    <p>Amazon</p>
    <LoginButton />
    </header>
  );
}
}

const headerStyle = {
  background: "#BE2625",
  color: "#fff",
  textAlign: "left",
  padding: "10px"
};

// const linkStyle = {
//   color: "#fff",
//   textDecoration: "none"
// };

export default NavBar;
