import React from "react";
import "./LandingPage.css";
import Map from "../imgs/Map.jpg";
function LandingPage() {
  return (
    <div>
      <div className="left">
        <div className="center-div">
          <h1 className="login">Login</h1>
          <form>
            <span className="email-label">Email</span>
            <input
              className="email"
              placeholder="example@email.com"
              id="#email"
            ></input>
            <span className="password-label">Password</span>
            <input
              className="password"
              placeholder="e.g. ilovedavid"
              id="#password"
            ></input>
            <hr className="divider"></hr>
            <button className="login-button">Login</button>
          </form>
        </div>
      </div>
      <div className="right">
        {/* <img src={Map} className="App-logo" alt="logo" /> */}
        <img src={Map} alt="Map" className="Map" />
      </div>
    </div>
  );
}

export default LandingPage;
