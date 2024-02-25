import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';

const NursePage = () => {
  const [patientData, setPatientData] = useState([]);

  useEffect(() => {
    // Assuming you have an API endpoint for fetching patient data
    fetch('http://localhost:8000/api/patients')
      .then((response) => response.json())
      .then((data) => setPatientData(data))
      .catch((error) => console.error('Error fetching patient data:', error));
  }, []);

  const getPriorityColor = (priority) => {
    switch(priority) {
      case 1: return 'bg-green-500';
      case 2: return 'bg-yellow-500';
      case 3: return 'bg-orange-500';
      case 4: return 'bg-red-500';
      case 5: return 'bg-red-700';
      default: return 'bg-gray-500';
    }
  }

  const getPriorityText = (priority) => {
    switch(priority) {
      case 1: return 'Zero Urgency';
      case 2: return 'Low Urgency';
      case 3: return 'Medium Urgency';
      case 4: return 'High Urgency';
      case 5: return 'Very High Urgency';
      default: return 'Unknown Urgency';
    }
  }

  return (
    <div className="container mx-auto mt-8">
      <h1 className="text-3xl font-bold mb-4">Subitted Patient's Conditions</h1>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        {patientData.map((patient) => (
          <div key={patient.id} className="p-4 rounded shadow-md">
            <h2 className="text-xl font-bold mb-2">Patient's Name: {patient.name}</h2>
            <p className="text-gray-600 mb-2">NHS Number: {patient.nhsNumber}</p>
            <p className="text-gray-600 mb-4">Conditions: {patient.conditions}</p>
            <div className={`p-2 rounded ${getPriorityColor(patient.priorityLevel)}`}>
              <p className="text-white font-bold">{getPriorityText(patient.priorityLevel)}</p>
            </div>
            <p className="text-gray-800 mt-4"><strong>Generated Report: </strong>{patient.generatedResponse}</p>
            <Link to={`/patient/${patient.id}`} className="mt-4 inline-block bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded">
              View Results
            </Link>
          </div>
        ))}
      </div>
    </div>
  );
}

export default NursePage;