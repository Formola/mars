import React from "react";
import Signup from "./Signup";
import { AuthProvider } from "../contexts/AuthContext";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Dashboard from "./Dashboard";
import { Home } from "./Home";
import Login from "./Login";
import PrivateRoute from "./PrivateRoute";
import ForgotPassword from "./ForgotPassword";
import UpdateProfile from "./UpdateProfile";
import { ScorePage } from "./ScorePage";
import { AddGamePage } from "./AddGamePage";
import CalculatorPage from "./CalculatorPage";

function App() {
  return (
    <div>
      <Router>
        <AuthProvider>
          <Routes>
            <Route path="/" element={<PrivateRoute />}>
              <Route exact path="/" element={<Home />} />
              <Route exact path="/dashboard" element={<Dashboard />} />
              <Route exact path="/update-profile" element={<UpdateProfile />} />
              <Route exact path="/calculator" element={<CalculatorPage />} />
              <Route exact path="/match" element={<ScorePage />} />
              <Route exact path="/addgame" element={<AddGamePage />} />
            </Route>
            <Route path="/signup" element={<Signup />} />
            <Route path="/login" element={<Login />} />
            <Route path="/forgot-password" element={<ForgotPassword />} />
          </Routes>
        </AuthProvider>
      </Router>
    </div>
  );
}

export default App;
