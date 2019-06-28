import React from "react";
import LoginButton from "./loginbutton/loginbutton";

class NavBar extends React.Component {
  render() {
    return (
      <nav className="navbar navbar-expand-lg navbar-light bg-light">
        <a className="navbar-brand" href="/">
          Ling's Tales
        </a>
        <button
          className="navbar-toggler"
          type="button"
          data-toggle="collapse"
          data-target="#navbarNavAltMarkup"
          aria-controls="navbarNavAltMarkup"
          aria-expanded="false"
          aria-label="Toggle navigation"
        >
          <span className="navbar-toggler-icon" />
        </button>
        <div className="collapse navbar-collapse" id="navbarNavAltMarkup">
          <div className="navbar-nav">
            <a className="nav-item nav-link text-right" href="/about">
              About
            </a>
            <li className="nav-item dropdown">
              <a
                className="nav-link dropdown-toggle"
                href="#"
                id="navbarDropdown"
                role="button"
                data-toggle="dropdown"
                aria-haspopup="true"
                aria-expanded="false"
              >
                Read
              </a>
              <div className="dropdown-menu" aria-labelledby="navbarDropdown">
                <a className="dropdown-item" href="/books">
                  The Emperor's Seed
                </a>
                <a className="dropdown-item disabled" href="#">
                  Weighing the Elephant (coming soon)
                </a>
              </div>
            </li>
            <a
              className="nav-item nav-link"
              href="#"
              tabindex="-1"
              aria-disabled="true"
            >
              <LoginButton />
            </a>
          </div>
        </div>
      </nav>
    );
  }
}

export default NavBar;
