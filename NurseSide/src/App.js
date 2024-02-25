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
          <>
            <input type={type} name={name} value={value} onChange={onChange} required={required} />
            {type === 'number' && unit}
          </>
        )}
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

  const calculateRiskScore = () => {
    // Sample risk score calculation (you can replace this with your own logic)
    let riskScore = 0;
    let noRisk = false;
    let lowRisk = false;
    let midRisk = false;
    let highRisk = false;

    // Example: Increase risk score if heart rate is above 100
    if (formData.heartRate >= 130) {
      midRisk = true;
      riskScore += 3;
    } else if (formData.heartRate >= 110 && formData.heartRate < 130){
      riskScore += 2;
    } else if (formData.heartRate >= 90 && formData.heartRate < 110){
      riskScore += 1;
    } else if (formData.heartRate >= 50 && formData.heartRate < 90){
      riskScore += 0;
    } else if (formData.heartRate >= 50 && formData.heartRate < 90){
      riskScore += 0;
    } else if (formData.heartRate >= 40 && formData.heartRate < 50){
      riskScore += 1;
    } else if (formData.heartRate < 40) {
      midRisk = true;
      riskScore += 3;
    }


    if (formData.systolicBloodPressure >= 220) {
      midRisk = true;
      riskScore += 3;
    } else if (formData.systolicBloodPressure >= 111 && formData.systolicBloodPressure < 220){
      riskScore += 0;
    } else if (formData.systolicBloodPressure >= 101 && formData.systolicBloodPressure < 111){
      riskScore += 1;
    } else if (formData.systolicBloodPressure >= 91 && formData.systolicBloodPressure < 101){
      riskScore += 2;
    } else if (formData.systolicBloodPressure < 91) {
      riskScore += 3;
      midRisk = true;
    }


    // Example: Increase risk score if oxygen saturation is below 95
    if (formData.oxygenSaturation >= 96) {
      riskScore += 0;
    } else if (formData.oxygenSaturation >= 94 && formData.oxygenSaturation < 96){
      riskScore += 1;
    } else if (formData.oxygenSaturation >= 92 && formData.oxygenSaturation < 93){
      riskScore += 2;
    } else if (formData.oxygenSaturation <= 91) {
      midRisk = true;
      riskScore += 3;
    }

    if (formData.hasSupplementaryO2Device) {
      riskScore += 2;
    } 
  
    if (formData.temperature >= 39.1) {
      riskScore += 2;
    } else if (formData.temperature >= 38.1 && formData.temperature < 39.1){
      riskScore += 1;
    } else if (formData.temperature >= 36.1 && formData.temperature < 38.1){
      riskScore += 0;
    } else if (formData.temperature >= 35.1 && formData.temperature < 36.1) {
      riskScore += 1;
    } else if (formData.temperature < 35.1) {
      midRisk = true;
      riskScore += 3;
    }

    if (formData.responsiveness != 'Alert') {
      midRisk = true;
      riskScore += 3;
    }

    if (formData.gcs != 15) {
      riskScore += 1;
    }

    if (!formData.equalPupils || !formData.responsiveToLight){
      riskScore += 1;
    }

    if (formData.dehydration) {
      riskScore += 1;
    }

    if (formData.heartBeatRhythm != 'Regular') {
      riskScore += 1;
    }

    if (riskScore >= 7) {
      highRisk = true;
    } else if (riskScore >= 5 && riskScore < 7 || midRisk){
      midRisk = true;
    } else if (riskScore >= 1 && riskScore < 5) {
      lowRisk = true;
    } else {
      noRisk = true;
    }

    return riskScore;
  };



  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    setFormData((prevData) => ({ ...prevData, [name]: type === 'checkbox' ? checked : value }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    // Calculate risk score
    const riskScore = calculateRiskScore();

    let monitoringInstructions = '';
    if (riskScore === 0) {
      monitoringInstructions = 'Monitor every 12 hours by nurse.';
    } else if (riskScore >= 1 && riskScore <= 4) {
      monitoringInstructions = 'Monitor every 6 hours by nurse. Needs nurse evaluation.';
    } else if (riskScore >= 5 && riskScore <= 6) {
      monitoringInstructions = 'Doctor needs to review. Every 1-2 hours consult critical care response team.';
    } else if (riskScore >= 7) {
      monitoringInstructions = 'Immediate on-site assessment by critical care response team.';
    }

    // Log risk score and form data
    console.log('Risk Score:', riskScore);
    console.log('Form Data:', formData);
    console.log('Monitoring Instructions:', monitoringInstructions);

    // You can use the risk score and form data as needed (send to backend, display to user, etc.)
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
          unit="%"
        />

        <Input
          label="Supplementary O2 Device"
          name="hasSupplementaryO2Device"
          type="checkbox"
          checked={formData.hasSupplementaryO2Device}
          onChange={handleChange}
        />

        <Input
          label="Temperature (Celsius)"
          name="temperature"
          type="number"
          value={formData.temperature}
          onChange={handleChange}
          required
          unit="Degrees"
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
          checked={formData.equalPupils}
          onChange={handleChange}
        />

        <Input
          label="Pupil reaction to light"
          name="responsiveToLight"
          type="checkbox"
          checked={formData.responsiveToLight}
          onChange={handleChange}
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
        />

        <button type="submit">Submit</button>
      </form>
    </div>
  );
}

export default App;
