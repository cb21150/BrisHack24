import React, { useState } from 'react';
import './App.css';

const Input = ({ label, name, type, value, onChange, required, unit }) => {
  if (type === 'checkbox') {
    return (
      <div className="input-container">
        <label>
          {label}:
          <input
            type={type}
            name={name}
            checked={value}
            onChange={onChange}
            required={required}
          />
          {unit}
        </label>
      </div>
    );
  }

  return (
    <div className="input-container">
      <label>
        {label}:
        <input
          type={type}
          name={name}
          value={value}
          onChange={onChange}
          required={required}
        />
        {unit}
      </label>
    </div>
  );
};

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
    setFormData((prevData) => ({ ...prevData, [name]: type === 'checkbox' ? checked : value }));
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
        <Input
          label="Systolic Blood Pressure"
          name="systolicBloodPressure"
          type="number"
          value={formData.systolicBloodPressure}
          onChange={handleChange}
          required
          unit="mmHg"
        />

        <Input
          label="Heart Rate"
          name="heartRate"
          type="number"
          value={formData.heartRate}
          onChange={handleChange}
          required
          unit="bpm"
        />

        <Input
          label="Respiratory Rate"
          name="respiratoryRate"
          type="number"
          value={formData.respiratoryRate}
          onChange={handleChange}
          required
          unit="breaths/min"
        />

        <Input
          label="Oxygen Saturation"
          name="oxygenSaturation"
          type="number"
          value={formData.oxygenSaturation}
          onChange={handleChange}
          required
          unit="%"
        />

        <Input
          label="Supplementary O2 Device"
          name="hasSupplementaryO2Device"
          type="checkbox"
          value={formData.hasSupplementaryO2Device}
          onChange={handleChange}
          required
        />

        <Input
          label="Temperature"
          name="temperature"
          type="number"
          value={formData.temperature}
          onChange={handleChange}
          required
          unit="Degrees Celsius"
        />

        <Input
          label="GCS"
          name="gcs"
          type="number"
          value={formData.gcs}
          onChange={handleChange}
          required
          unit="/15"
        />

      


        {/* Add the rest of your form fields using the Input component */}
        {/* ... */}

        <button type="submit">Submit</button>
      </form>
    </div>
  );
}

export default App;

