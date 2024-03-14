import React from "react";
import { Link } from "react-router-dom";

export default function Navbar() {
  return (
    <div>
      <nav className="navbar navbar-expand-lg navbar-dark bg-primary ">
        <a className="navbar-brand px-3" href="/" >
          User Management Application
        </a>
        <button
          className="navbar-toggler"
          type="button"
          data-toggle="collapse"
          data-target="#navbarSupportedContent"
          aria-controls="navbarSupportedContent"
          aria-expanded="false"
          aria-label="Toggle navigation"
        >
          <span className="navbar-toggler-icon"></span>
        </button>
        <div className="collapse navbar-collapse justify-content-end px-3" id="navbarSupportedContent">
        <Link to="/adduser" className="btn btn-outline-light">Add user</Link>
      </div>
      </nav>
    </div>
  );
}
