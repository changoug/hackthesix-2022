import "./App.css";
import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import LandingPage from "./views/LandingPage";
import LoginPage from "./views/LoginPage";
import Map from "./views/Map";

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" exact element={<LandingPage />} />
        <Route path="/login" exact element={<LoginPage />} />
        <Route path="/map" exact element={<Map />} />
      </Routes>
    </Router>
  );
}

export default App;
