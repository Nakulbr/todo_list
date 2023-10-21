import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Login from "./pages/Login";
import Home from "./pages/Home";
import Register from "./pages/Register";

const App = () => {
  return (
    <Router>
      <Routes>
        <Route exact path="/login" Component={Login} />
        <Route path="/home" Component={Home} />
        <Route path="/register" Component={Register} />
      </Routes>
    </Router>
  );
};

export default App;
