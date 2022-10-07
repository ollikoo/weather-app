import React from "react";
import "./App.scss";
import SidebarMenu from "./components/SidebarMenu";
import { Routes, Route } from "react-router-dom";
import Home from "./components/Home";
import Diff from "./components/Diff";

const App = () => {
  return (
    <div className="app">
      <SidebarMenu />
      <div className="content">
        <div className="container">
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/diff" element={<Diff />} />
          </Routes>
        </div>
      </div>
    </div>
  );
};

export default App;
