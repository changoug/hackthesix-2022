import "./App.css";
import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import LandingPage from "./views/LandingPage";
import ContractorMap from "./views/ContractorMap";

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" exact element={<LandingPage />} />
        <Route path="/contractor-map" exact element={<ContractorMap />} />
      </Routes>
    </Router>
  );
}

export default App;
