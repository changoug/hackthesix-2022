import React from "react";
import { useNavigate } from "react-router-dom";
import logo from "../assets/logo.svg";
import { FaGithub } from "react-icons/fa";

import "./LandingPage.css";

const LandingPage = () => {
  const navigate = useNavigate();
  const landingRouteChange = () => {
    const path = "/";
    navigate(path);
  };
  const loginRouteChange = () => {
    const path = "/login";
    navigate(path);
  };

  return (
    <main>
      <div className="content-container">
        <h1 onClick={landingRouteChange}>Warepair</h1>
        <img className="logo" src={logo} alt="Warepair Logo" />
        <h2>All your repairs in one click.</h2>
        <h3>Connecting local contractors with your reparis.</h3>
        <hr />
        <div className="button-container">
          <button
            id="customer-login"
            className="button"
            onClick={loginRouteChange}
          >
            Login
          </button>
        </div>
      </div>
      <footer>
        <p>
          Copyright © <script>document.write(new Date().getFullYear())</script>
          hackthesix
          <a
            href="https://github.com/changoug/hackthesix-2022"
            target="_blank"
            rel="noreferrer"
          >
            <FaGithub className="fa-github" />
          </a>
        </p>
      </footer>
    </main>
  );
};

export default LandingPage;
