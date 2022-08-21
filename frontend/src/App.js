import "./App.css";
import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import LandingPage from "./views/LandingPage";
import CustomerLoginPage from "./views/CustomerLoginPage";
import ContractorLoginPage from "./views/ContractorLoginPage";
import CreateAccount from "./views/CreateAccount";
import CreatePost from "./views/CreatePost";
import MapInterface from "./views/MapInterface";

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<LandingPage />} />
        <Route path="/customer-login" element={<CustomerLoginPage />} />
        <Route path="/contractor-login" element={<ContractorLoginPage />} />
        <Route path="/create-account" element={<CreateAccount />} />
        <Route path="/create-post" element={<CreatePost />} />
        <Route path="/map" element={<MapInterface />} />
      </Routes>
    </Router>
  );
}

export default App;
