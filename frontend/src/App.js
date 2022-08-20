import "./App.css";
import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import LandingPage from "./views/LandingPage";
import CustomerLoginPage from "./views/CustomerLoginPage";
import ContractorLoginPage from "./views/ContractorLoginPage";
import MapInterface from "./views/MapInterface";

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" exact element={<LandingPage />} />
        <Route path="/customer-login" exact element={<CustomerLoginPage />} />
        <Route
          path="/contractor-login"
          exact
          element={<ContractorLoginPage />}
        />
        <Route path="/map" exact element={<MapInterface />} />
      </Routes>
    </Router>
  );
}

export default App;
