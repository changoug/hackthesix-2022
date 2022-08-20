import logo from "./logo.svg";
import "./App.css";
import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import LoginPage from "./views/LoginPage";
import CreatePost from "./views/CreatePost";
function App() {
  return (
    <Router>
      <div>
        <Routes>
          <Route path="/" exact element={<LoginPage />}></Route>
          <Route path="/create" exact element={<CreatePost />}></Route>
        </Routes>
      </div>
    </Router>
  );
}

export default App;
