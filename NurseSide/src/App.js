import React, { useState } from 'react';
import './App.css';

const Input = ({ label, name, type, value, onChange, required, unit, options }) => {
  return (
    <div className="input-container">
      <label>
        {label}:
        {type === 'checkbox' ? (
          <input type={type} name={name} checked={value} onChange={onChange} required={required} />
        ) : type === 'select' ? (
          <select name={name} value={value} onChange={onChange} required={required}>
            {options.map((option) => (
              <option key={option} value={option}>
                {option}
              </option>
            ))}
          </select>
        ) : (
          <input type={type} name={name} value={value} onChange={onChange} required={required} />
        )}
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

        <Input
          label="Responsiveness (AVPU)"
          name="responsiveness"
          type="select"
          value={formData.responsiveness}
          onChange={handleChange}
          required
          options={['', 'Alert', 'Voice', 'Pain', 'Unresponsive']}
        />

        <Input
          label="Equal Pupils"
          name="equalPupils"
          type="checkbox"
          value={formData.equalPupils}
          onChange={handleChange}
          required
        />

        <Input
          label="Pupil reaction to light"
          name="responsiveToLight"
          type="checkbox"
          value={formData.responsiveToLight}
          onChange={handleChange}
          required
        />

        <Input
          label="Heart Rhythm"
          name="heartBeatRhythm"
          type="select"
          value={formData.heartBeatRhythm}
          onChange={handleChange}
          required
          options={['', 'Regular', 'Regularly Irregular', 'Irregularly Irregular']}
        />

        <Input
          label="Dehydration"
          name="dehydration"
          type="checkbox"
          value={formData.dehydration}
          onChange={handleChange}
          required
        />

        <Input
          label="Haemoglobin"
          name="hemoglobin"
          type="number"
          value={formData.hemoglobin}
          onChange={handleChange}
          required
          unit="g/dL"
        />

        <Input
          label="Urint Output"
          name="urineOutput"
          type="number"
          value={formData.urineOutput}
          onChange={handleChange}
          required
          unit="mL/kg/hour"
        />

        <button type="submit">Submit</button>
      </form>
    </div>
  );
}

export default App;