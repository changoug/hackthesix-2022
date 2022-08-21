import React from "react";
import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import "./LoginPage.css";
import Map from "../assets/map.jpg";
import axios from "axios";

function LandingPage() {
  const navigate = useNavigate();
  const [email, setEmail] = React.useState("");
  const [password, setPassword] = React.useState("");
  const createAccountRouteChange = () => {
    const path = "/create-account";
    navigate(path);
  };

  // useEffect(() => {
  //   axios({
  //     method: "post",
  //     url: "http://localhost:5000/login",
  //     data: {
  //       email: email,
  //       password: password,
  //     },
  //   }).then((res) => {
  //     console.log(res);
  //   });
  // }), [email, password];

  return (
    <div>
      <p className="warepair">Warepair</p>
      <div className="left">
        <div className="center-div">
          <h1 className="login">Contractor Login</h1>
          <form>
            <span className="label">Email</span>
            <input
              className="email input"
              placeholder="example@email.com"
              id="#email"
              type="email"
              onChange={(e) => setEmail(e.target.value)}
            ></input>
            <span className="label">Password</span>
            <input
              className="password input"
              placeholder="e.g. ilovedavid"
              id="#password"
              type="password"
              onChange={(e) => setPassword(e.target.value)}
            ></input>
            <hr />
            <button className="login-button" onClick={() => {navigate("/map", { replace: true }); }}>Login</button>
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
