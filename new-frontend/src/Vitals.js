import React, { useState } from "react";
import { useParams } from "react-router-dom";
import { useEffect } from "react";
import { Link } from "react-router-dom";
import { BeatLoader } from "react-spinners";

const Input = ({
  label,
  name,
  type,
  value,
  onChange,
  required,
  unit,
  options,
}) => {
  return (
    <div className="mb-4">
      <label className="block text-gray-700 text-sm font-bold mb-2">
        {label}{unit && ` (${unit}):`}
        {type === "checkbox" ? (
          <input
            className="mr-2 ml-2 leading-tight"
            type={type}
            name={name}
            checked={value}
            onChange={onChange}
            required={required}
          />
        ) : type === "select" ? (
          <select
            className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
            name={name}
            value={value}
            onChange={onChange}
            required={required}
          >
            {options.map((option) => (
              <option key={option} value={option}>
                {option}
              </option>
            ))}
          </select>
        ) : (
          <input
            className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
            type={type}
            name={name}
            value={value}
            onChange={onChange}
            required={required}
          />
        )}
      </label>
    </div>
  );
};

function Vitals() {
  const { id } = useParams();


  const [patientData, setPatientData] = useState([]);
  const [successMessage, setSuccessMessage] = useState("");
  const [errorMessage, setErrorMessage] = useState("");
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    // Assuming you have an API endpoint for fetching patient data
    fetch('http://localhost:8000/api/patient/' + id)
      .then((response) => response.json())
      .then((data) => setPatientData(data.patient))
      .catch((error) => console.error('Error fetching patient data:', error));
  }, []);

  console.log(patientData);

  const [formData, setFormData] = useState({
    systolicBloodPressure: "",
    heartRate: "",
    respiratoryRate: "",
    oxygenSaturation: "",
    hasSupplementaryO2Device: false,
    temperature: "",
    gcs: "",
    responsiveness: "",
    equalPupils: false,
    responsiveToLight: false,
    heartBeatRhythm: "",
    dehydration: false,
  });

const calculateRiskScore = () => {
    // Sample risk score calculation (you can replace this with your own logic)
    let riskScore = 0;
    let midRisk = false;

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

    // if (riskScore >= 7) {
    //   highRisk = true;
    // } else if (riskScore >= 5 && riskScore < 7 || midRisk){
    //   midRisk = true;
    // } else if (riskScore >= 1 && riskScore < 5) {
    //   lowRisk = true;
    // } else {
    //   noRisk = true;
    // }

    return riskScore;
  };

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    setFormData((prevData) => ({ ...prevData, [name]: type === 'checkbox' ? checked : value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    setLoading(true);

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


    const apiUrl = "http://localhost:8000/api/submit_vitals";
    try {
      const response = await fetch(apiUrl, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({...formData, patientId: patientData.id, riskScore, monitoringInstructions}),
      });

      // get json data from response
      const data = await response.json();
      console.log(data)

      if (response.ok) {
        setSuccessMessage(data.message);
        setErrorMessage("");
      } else {
        setErrorMessage(data.error);
        setSuccessMessage("");
        console.log(errorMessage)
      }
    } catch (error) {
      console.error("Error submitting form:", error);
      setErrorMessage("An error occurred while submitting the form.");
      setSuccessMessage("");
    } finally {
      setLoading(false);
    }

    // You can use the risk score and form data as needed (send to backend, display to user, etc.)
    // submit to backend
  };

  return (
    <div className="container mx-auto px-4 pt-4 mb-6">
      <Link to="/nurse" className="mt-4 inline-block bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded">
      Go Back
      </Link>
      <h1 className="text-3xl font-bold mb-4 mt-4">Medical Assessment Form</h1>

      <p className="text-xl mb-2"><strong>Patient Name:</strong> {patientData.name}</p>
      <p className="text-xl mb-4"><strong>NHS Number:</strong> {patientData.nhsNumber}</p>

      <form onSubmit={handleSubmit} className="bg-white shadow-md rounded px-8 pt-6 pb-8 mb-4">
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
          options={["", "Alert", "Voice", "Pain", "Unresponsive"]}
        />

        <Input
          label="Equal Pupils"
          name="equalPupils"
          type="checkbox"
          value={formData.equalPupils}
          onChange={handleChange}
        />

        <Input
          label="Pupil reaction to light"
          name="responsiveToLight"
          type="checkbox"
          value={formData.responsiveToLight}
          onChange={handleChange}
        />

        <Input
          label="Heart Rhythm"
          name="heartBeatRhythm"
          type="select"
          value={formData.heartBeatRhythm}
          onChange={handleChange}
          required
          options={[
            "",
            "Regular",
            "Regularly Irregular",
            "Irregularly Irregular",
          ]}
        />

        <Input
          label="Dehydration"
          name="dehydration"
          type="checkbox"
          value={formData.dehydration}
          onChange={handleChange}
        />

      <div className="flex justify-center">
        {loading ? (
          <BeatLoader color="#000" />
        ) : (
          <button type="submit" className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline">
            Submit
          </button>
        )}
        {/* <button type="submit" className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline">
          Submit
        </button> */}
      </div>
      </form>
      {successMessage && <div className="bg-green-100 text-green-800 p-4 rounded-md">{successMessage}</div>}
      {errorMessage && <div className="bg-red-100 text-red-800 p-4 rounded-md">{errorMessage}</div>}
    </div>
  );
}

export default Vitals;