import React from "react";

class NavBar extends React.Component {
  render() {
    return (
      <nav class="navbar navbar-expand-lg navbar-light bg-light">
        <a class="navbar-brand" href="#">
          Ling's Tales
        </a>
        <button
          class="navbar-toggler"
          type="button"
          data-toggle="collapse"
          data-target="#navbarNavAltMarkup"
          aria-controls="navbarNavAltMarkup"
          aria-expanded="false"
          aria-label="Toggle navigation"
        >
          <span class="navbar-toggler-icon" />
        </button>
        <div class="collapse navbar-collapse" id="navbarNavAltMarkup">
          <div class="navbar-nav">
            <a class="nav-item nav-link active text-right" href="#">
              Home <span class="sr-only">(current)</span>
            </a>
            <a class="nav-item nav-link text-right" href="#">
              About
            </a>
            <li class="nav-item dropdown">
              <a
                class="nav-link dropdown-toggle"
                href="#"
                id="navbarDropdown"
                role="button"
                data-toggle="dropdown"
                aria-haspopup="true"
                aria-expanded="false"
              >
                Read
              </a>
              <div class="dropdown-menu" aria-labelledby="navbarDropdown">
                <a class="dropdown-item" href="#">
                  The Emperor's Seed
                </a>
                <a class="dropdown-item disabled" href="#">
                  Weighing the Elephant (coming soon)
                </a>
              </div>
            </li>
            <a
              class="nav-item nav-link text-right"
              href="#"
              tabindex="-1"
              aria-disabled="true"
            >
              Login
            </a>
          </div>
        </div>
      </nav>
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
