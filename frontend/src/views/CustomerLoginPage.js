import React from "react";
import { useNavigate } from "react-router-dom";
import Map from "../imgs/Map.jpg";

import "./LoginPage.css";

function LandingPage() {
  const navigate = useNavigate();
  const createAccountRouteChange = () => {
    const path = "/create-account";
    navigate(path);
  };

  return (
    <div>
      <p className="warepair">Warepair</p>
      <div className="left">
        <div className="center-div">
          <h1 className="login">Customer Login</h1>
          <form>
            <span className="label">Email</span>
            <input
              className="email input"
              placeholder="example@email.com"
              id="#email"
            ></input>
            <span className="label">Password</span>
            <input
              className="password input"
              placeholder="e.g. ilovedavid"
              id="#password"
            ></input>
            <hr className="divider" />
            <button className="login-button">Login</button>
            <p className="createAccountText">
              Don't have an account?{" "}
              <span
                onClick={createAccountRouteChange}
                className="createAccount"
              >
                Create an Account
              </span>
            </p>
          </form>
        </div>
      </div>
      <div className="right">
        <img src={Map} alt="Map" className="Map" />
      </div>
    </div>
  );
}

export default LandingPage;
