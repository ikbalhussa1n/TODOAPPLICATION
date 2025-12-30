import React from "react";
import {
  BrowserRouter as Router,
  Routes,
  Route,
  Navigate,
} from "react-router-dom";
import Home from "./components/Home";
import Register from "./components/Register";
import Signin from "./components/Signin";
import NotFound from "./components/notFound";

const App = () => {
  const token = localStorage.getItem("jwt");
  return (
    <Router>
      <Routes>
        <Route
          path="/"
          element={token ? <Home /> : <Navigate to={"/signin"} />}
        />
        <Route path="/register" element={<Register />} />
        <Route path="/signin" element={<Signin />} />
        <Route path="*" element={<NotFound />} />
      </Routes>
    </Router>
  );
};

export default App;
