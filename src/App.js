import React, { useEffect } from "react";
import { BrowserRouter as Router, Routes, Route, Link } from "react-router-dom";
import { Home } from "./Home";
import "bulma/css/bulma.min.css";
import "./myCss.css"
import { ScorePage } from "./ScorePage";
import { AddGamePage } from "./AddGamePage";

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/ue" element={<ScorePage />} />
        <Route path="/addgame" element={<AddGamePage />} />
      </Routes>
    </Router>
  );
}

export default App;
