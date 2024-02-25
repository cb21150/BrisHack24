import logo from "./logo.svg";
import { BrowserRouter, Routes, Route, Link } from "react-router-dom";
import LoginScreen from "./LoginScreen";
import PatientInfo from "./PatientInfo";
import { Nurse } from "./Nurse";
import React, { useState } from "react";
import "./App.css";

function App() {
  return (
    <BrowserRouter>
      <nav className="bg-gray-800 p-4">
        <ul className="flex space-x-4 text-white">
          <li>
            <Link to="/" className="hover:underline">
              Patient Information
            </Link>
          </li>
          <li>
            <Link to="/login" className="hover:underline">
              Patient Health Condition
            </Link>
          </li>
        </ul>
      </nav>
      <Routes>
        <Route path="/" element={<PatientInfo />} />
        <Route path="/login" element={<LoginScreen />} />
        <Route path="/nurse" element={<Nurse />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
