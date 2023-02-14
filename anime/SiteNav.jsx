import React from "react";
import { Link } from "react-router-dom";
function SiteNav() {
  return (
    <nav
      className="navbar navbar-expand-md navbar-dark bg-dark "
      aria-label="Fourth navbar example "
    >
      <div className="container">
        <a className="navbar-brand" href="/">
          <img
            src="https://logodix.com/logo/1980641.jpg"
            width="30"
            height="30"
            className="d-inline-block align-top"
            alt="anime"
          />
        </a>
        <button
          className="navbar-toggler"
          type="button"
          data-bs-toggle="collapse"
          data-bs-target="#navbarsExample04"
          aria-controls="navbarsExample04"
          aria-expanded="false"
          aria-label="Toggle navigation"
        >
          <span className="navbar-toggler-icon"></span>
        </button>

        <div
          className="collapse navbar-collapse justify-content-center"
          id="navbarsExample04"
        >
          <ul className="navbar-nav me-auto mb-2 mb-md-0">
            <li className="nav-item ">
              <Link
                to={"/home"}
                className="nav-link px-2 text-white link-button"
              >
                Home
              </Link>
            </li>
            <li className="nav-item">
              <Link
                to={"/friends"}
                className="nav-link px-2 text-white link-button"
              >
                Anime
              </Link>
            </li>
          </ul>
          <div className="text-end"></div>
        </div>
      </div>
    </nav>
  );
}

export default SiteNav;
