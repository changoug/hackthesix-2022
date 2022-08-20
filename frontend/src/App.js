import logo from "./logo.svg";
import "./App.css";
import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import LoginPage from "./views/LoginPage";
import CreatePost from "./views/CreatePost";import LandingPage from "./views/LandingPage";
function App() {
  return (
    <Router>
      <div>
        <Routes>
          <Route path="/login" exact element={<LoginPage />}></Route>
          <Route path="/create" exact element={<CreatePost />}></Route>
          <Route path="/" exact element={<LandingPage />} />
        </Routes>
      </div>
    </Router>
  );
}

export default App;
