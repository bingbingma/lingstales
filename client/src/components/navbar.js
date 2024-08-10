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
                <a className="dropdown-item" href="/book2">
                  Weighing the Elephant
                </a>
              </div>
            </li>
            <li className="nav-item dropdown">
              <a
                className="nav-link dropdown-toggle"
                href="#"
                id="amazonDropdown"
                role="button"
                data-toggle="dropdown"
                aria-haspopup="true"
                aria-expanded="false"
              >
                Amazon Links
              </a>
              <div className="dropdown-menu" aria-labelledby="amazonDropdown">
                <a
                  className="dropdown-item"
                  href="https://www.amazon.com/dp/107422633X/ref=cm_sw_r_tw_dp_U_x_GpxfDbZDFJAMT"
                >
                  The Emperor's Seed
                </a>
                <a
                  className="dropdown-item"
                  href="https://www.amazon.com/Weighing-Elephant-Lings-Tales-Book/dp/B0D7ZNCLLZ"
                >
                  Weighing the Elephant
                </a>
              </div>
            </li>
            <a
              className="nav-item nav-link"
              href="#"
              tabIndex="-1"
              aria-disabled="true"
            >
            </a>
          </div>
        </div>
      </nav>
    );
  }
}

export default NavBar;
