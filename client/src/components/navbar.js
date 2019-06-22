import React from "react";

class NavBar extends React.Component{
  render(){
  return (
    <header style={headerStyle}>
    <h1>
      Ling's Tales
    </h1>
    <button>Home</button> 
    <p>Read</p>
    <p>Amazon</p>
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
