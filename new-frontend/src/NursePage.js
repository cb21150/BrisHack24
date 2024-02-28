import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
const NursePage = () => {
  const [patientData, setPatientData] = useState([]);

  useEffect(() => {
    // Fetch patient data from the API endpoint
    fetch('http://localhost:8000/api/patients')
      .then((response) => response.json())
      .then((data) => setPatientData(data))
      .catch((error) => console.error('Error fetching patient data:', error));
  }, []);

  

  const getPriorityColor = (priority, promptno) => {
    if (promptno == 1){

    switch(priority) {
      case 1: return 'bg-green-500';
      case 2: return 'bg-yellow-500';
      case 3: return 'bg-orange-500';
      case 4: return 'bg-red-500';
      case 5: return 'bg-red-700';
      default: return 'bg-red-900';
    }
  }
    else if (promptno == 2){
      if ( priority == 0) {
        return 'bg-green-500';

      }
      else if(1 <= priority && priority <= 4){
        return 'bg-yellow-500';
      }
      else if (5 <= priority && priority <= 6){
        return 'bg-orange-500';
      }
      else if (priority >= 7){
        return 'bg-red-700';
      }
    }
  }

  const getPriorityText = (priority, promptno) => {
    if (promptno == 1){
    switch(priority) {
      case 1: return 'Zero Urgency';
      case 2: return 'Low Urgency';
      case 3: return 'Medium Urgency';
      case 4: return 'High Urgency';
      case 5: return 'Very High Urgency';
      default: return 'Extreme Urgency';
    }
  }
    else if (promptno == 2){
      return priority;
    }
  }


  const deleteDivById = (divId) => {
    const div = document.getElementById(divId);
    if (div) {
      div.remove();
    }
  };

  const hideContainer = () => {
    const container = document.getElementById('block');
    if (container) {
      container.style.display = 'none';
      console.log('Container hidden');
    } else {
      console.log('Container not found');
    }
  }

  const deletePatient = (patientId) => {
    console.log(patientId);
    fetch(`http://localhost:8000/api/discharge_patient/${patientId}`, {
      method: 'POST'
    })
    .then(response => {
      if (!response.ok) {
        throw new Error('Network response was not ok');
      }
      return response.json();
    })
    .then(data => {
      console.log(data.message); // Log success message
      // Do whatever you need to do after deletion (e.g., update UI)
    })
    .catch(error => {
      console.error('Error deleting patient:', error);
      // Handle errors here
    });
  };
  return (
    <div className="container mx-auto mt-8">
      <h1 className="text-3xl font-bold mb-4">Current Patients</h1>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        {patientData.map((patient) => (
          <div id={`container-${patient.id}`} key={patient.id}>
            {patient.promptno === 1? (
                <div className="p-4 rounded shadow-md">
                    {/* Your code here */}
            <p className="text-xl font-bold mb-2 "> Name: {patient.name}</p>
            <p className="text-gray-600 mb-2">NHS Number: {patient.nhsNumber}</p>
            <p className="text-gray-600 mb-4">Conditions: {patient.conditions}</p>
            <span><strong>Urgency Level: </strong></span>
            <div className={`p-2 rounded ${getPriorityColor(patient.priorityLevel)}`}>
              <p className="text-white font-bold">{getPriorityText(patient.priorityLevel)}</p>
            </div>
            <Link to={`/patient/${patient.id}`} className="mt-4 inline-block bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded">
              View Results
            </Link>
            <Link to={`/vitals/${patient.id}`} className="mt-4 ml-4 inline-block bg-red-500 hover:bg-red-700 text-white font-bold py-2 px-4 rounded">
              Take Vitals
            </Link>
            <button
              className="mt-4 inline-block bg-green-500 hover:bg-green-700 text-white font-bold py-2 px-4 rounded"
              onClick={() => {
                deletePatient(patient.id);
                deleteDivById(`container-${patient.id}`);
                hideContainer();
              }}
            >
              Discharge Patient
            </button>
            </div>
            ) : (
              deleteDivById(`container-${patient.id}`)
            )}
            </div>
            
        ))}
      </div>
    </div>
  ); 
}


export default NursePage;