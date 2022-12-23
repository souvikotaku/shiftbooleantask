import logo from "./logo.svg";
import "./App.css";
import MainForm from "./views/MainForm";
import { AppRoutes } from "./routes";

import { useState, useEffect } from "react";
import { BrowserRouter as Router } from "react-router-dom";

function App() {
  return (
    <div className="App">
      <div>
        <Router>
          <AppRoutes />
        </Router>
      </div>
    </div>
  );
}

export default App;
