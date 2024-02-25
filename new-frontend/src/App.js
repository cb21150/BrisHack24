import logo from "./logo.svg";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import LoginScreen from "./LoginScreen";
import PatientInfo from "./PatientInfo";
import "./App.css";

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<PatientInfo />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
