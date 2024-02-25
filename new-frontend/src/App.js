import logo from "./logo.svg";
import { BrowserRouter, Routes, Route, Link } from "react-router-dom";
import LoginScreen from "./LoginScreen";
import PatientInfo from "./PatientInfo";
<<<<<<< HEAD
import Component from "./outputtest";
=======
import NursePage from "./NursePage";
>>>>>>> 4e188e4ed575f6902e7bbe975048de13892cac9f
import React, { useState } from "react";
import "./App.css";

function App() {
  return (
    <BrowserRouter>
    <nav className="bg-gray-800 p-4">
                <ul className="flex space-x-4 text-white">
                    <li>
                        <Link to="/" className="hover:underline">Patient Information</Link>
                    </li>
                    <li>
                        <Link to="/login" className="hover:underline">Patient Health Condition</Link>
                    </li>
                    <li>
                        <Link to="/output" className="hover:underline">Output</Link>
                    </li>
                </ul>
            </nav>
      <Routes>
        <Route path="/" element={<PatientInfo />} />
        <Route path="/login" element={<LoginScreen />} />
<<<<<<< HEAD
        <Route path="/output" element={<Component/>}/>
=======
        <Route path="/nurse" element={<NursePage />} />
>>>>>>> 4e188e4ed575f6902e7bbe975048de13892cac9f
      </Routes>
    </BrowserRouter>
  );
}

export default App;
