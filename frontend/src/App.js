import logo from './logo.svg';
import './App.css';
import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import UserMap from './views/ContractorMap';
function App() {
  return (
    <Router>
      <div>
        <Routes>
          <Route path="/" exact>
          </Route>
          <Route path="/contractor-map" exact element={<UserMap />}>
          </Route>
        </Routes>
      </div>
    </Router>
  );
}

export default App;
