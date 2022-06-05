import React from "react";
import Home from "./page/Home/Home";
import Search from "./page/Search";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";


const App: React.FC = ({}) => {
  return (
    <div className="App">
      <Router>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/search" element={<Search />} />
        </Routes>
      </Router>
    </div>
  );
};

export default App;
