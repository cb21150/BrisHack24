import logo from "./logo.svg";
import { BrowserRouter, Routes, Route, Link } from "react-router-dom";
import LoginScreen from "./LoginScreen";
import PatientInfo from "./PatientInfo";
import Component from "./outputtest";
import NursePage from "./NursePage";
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
                    {/* <li>
                        <Link to="/login" className="hover:underline">Patient Health Condition</Link>
                    </li> */}
                    <li>
                        <Link to="/nurse" className="hover:underline">Nurse</Link>
                    </li>
                    {/* <li>
                        <Link to="/output" className="hover:underline">Output</Link>
                    </li> */}
                </ul>
            </nav>
      <Routes>
        <Route path="/" element={<PatientInfo />} />
        <Route path="/login" element={<LoginScreen />} />
        <Route path="/patient/:id" element={<Component/>}/>
        <Route path="/nurse" element={<NursePage />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
