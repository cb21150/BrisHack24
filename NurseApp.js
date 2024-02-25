import logo from './logo.svg';
import './App.css';

import React, { useState } from 'react';

function App() {
  const [formData, setFormData] = useState({
    systolicBloodPressure: '',
    heartRate: '',
    respiratoryRate: '',
    oxygenSaturation: '',
    hasSupplementaryO2Device: false,
    temperature: '',
    gcs: '',
    responsiveness: '',
    equalPupils: false,
    responsiveToLight: false,
    heartBeatRhythm: '',
    dehydration: false,
    hemoglobin: '',
    urineOutput: '',
  });

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    setFormData((prevData) => ({
      ...prevData,
      [name]: type === 'checkbox' ? checked : value,
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    // Handle form submission, you can send the data to your backend or perform any required actions
    console.log('Form Data:', formData);
  };

  return (
    <div className="App">
      <h1>Medical Assessment Form</h1>
      <form onSubmit={handleSubmit}>
        {/* Add your form fields here */}
        <label>
          Systolic Blood Pressure:
          <input
            type="number"
            name="systolicBloodPressure"
            value={formData.systolicBloodPressure}
            onChange={handleChange}
            required
          />
          mmHg
        </label>
        {/* Repeat similar structures for other fields */}
        {/* ... */}
        <button type="submit">Submit</button>
      </form>
    </div>
  );
}

export default App;

