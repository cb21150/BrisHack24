import { useParams } from 'react-router-dom';
import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';

export default function Component() {
  const { id } = useParams();

  const [patientData, setPatientData] = useState([]);
  const [vitalsData, setVitals] = useState([]);

  useEffect(() => {
    // Assuming you have an API endpoint for fetching patient data
    fetch('http://localhost:8000/api/patient/' + id)
      .then((response) => response.json())
      .then((data) => {setPatientData(data.patient); setVitals(data.vitals);})
      .catch((error) => console.error('Error fetching patient data:', error));
  }, []);

  return (
    <div className="bg-white p-6 max-auto mx-auto rounded-lg shadow-md">
      <Link to="/nurse" className="mt-4 inline-block bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded">
      Go Back
      </Link>
      <div className="flex justify-between items-center mb-2">
        <h3 className="text-xl font-semibold text-black-600">Personal Details</h3>
        <CreditCardIcon className="text-gray-700 w-12 h-12" />
      </div>
      <div className="space-y-2">
          <p className="text-gray-700"><strong className="font-semibold">Patient Name:</strong> {patientData.name}</p>
          <p className="text-gray-700"><strong className="font-semibold">NHS Number:</strong> {patientData.nhsNumber}</p>
          <p className="text-gray-700"><strong className="font-semibold">Conditions:</strong> {patientData.conditions}</p>
          <p className="text-gray-700"><strong className="font-semibold">Generated Response:</strong> {patientData.generatedResponse}</p>
      </div>
      <div className="flex justify-between items-center mb-2 mt-4">
        <h3 className="text-xl font-semibold text-black-600">Vitals</h3>
        <BarChartIcon className="text-gray-700 w-12 h-12" />
      </div>
      <div className="space-y-2">
  <p className="text-gray-700"><strong className="font-semibold">Systolic Blood Pressure:</strong> {vitalsData.systolicBloodPressure}</p>
  <p className="text-gray-700"><strong className="font-semibold">Heart Rate:</strong> {vitalsData.heartRate}</p>
  <p className="text-gray-700"><strong className="font-semibold">Respiratory Rate:</strong> {vitalsData.respiratoryRate}</p>
  <p className="text-gray-700"><strong className="font-semibold">Oxygen Saturation:</strong> {vitalsData.oxygenSaturation}</p>
  <p className="text-gray-700"><strong className="font-semibold">Has Supplementary O2 Device:</strong> {vitalsData.hasSupplementaryO2Device ? 'Yes' : 'No'}</p>
  <p className="text-gray-700"><strong className="font-semibold">Temperature:</strong> {vitalsData.temperature}</p>
  <p className="text-gray-700"><strong className="font-semibold">GCS:</strong> {vitalsData.gcs}</p>
  <p className="text-gray-700"><strong className="font-semibold">Responsiveness:</strong> {vitalsData.responsiveness}</p>
  <p className="text-gray-700"><strong className="font-semibold">Equal Pupils:</strong> {vitalsData.equalPupils ? 'Yes' : 'No'}</p>
  <p className="text-gray-700"><strong className="font-semibold">Responsive To Light:</strong> {vitalsData.responsiveToLight ? 'Yes' : 'No'}</p>
  <p className="text-gray-700"><strong className="font-semibold">Heart Beat Rhythm:</strong> {vitalsData.heartBeatRhythm}</p>
  <p className="text-gray-700"><strong className="font-semibold">Dehydration:</strong> {vitalsData.dehydration ? 'Yes' : 'No'}</p>
  <p className="text-gray-700"><strong className="font-semibold">Risk Score:</strong> {vitalsData.riskScore}</p>
  <p className="text-gray-700"><strong className="font-semibold">Monitoring Instructions:</strong> {vitalsData.monitoringInstructions}</p>
  <p className="text-gray-700"><strong className="font-semibold">Detailed Diagnosis:</strong> {vitalsData.detailedDiagnosis}</p>
</div>
      <div className="mb-6">
        <h3 className="text-xl font-semibold text-center text-black-600 mb-4">Recommendation</h3>
        <div className="space-y-2">
          <div className="flex justify-between items-center">
            <span className="text-lg text-gray-800">Risk level</span>
            <div className={`w-full h-2 rounded ${vitalsData.riskScore <= 5 ? 'bg-green-400' : vitalsData.riskScore <= 10 ? 'bg-yellow-400' : 'bg-red-500'}`} style={{ width: `${(vitalsData.riskScore / 17) * 80}%` }} />
            {/* <span className="h-2 bg-gray-800 rounded" style={{width: `${(vitalsData.riskScore / 17) * 80}%`}} /> */}
          </div>
          <div className="flex justify-between items-center">
            <span className="text-lg text-gray-800">Next Destination</span>
            <span className="text-lg text-gray-800"> variable1 </span>
          </div>
          <div className="flex justify-between items-center">
            <span className="text-lg text-gray-800">Evaluation</span>
            <div className="w-28 h-2 bg-red-600 rounded" />
          </div>
          <div className="flex justify-between items-center">
            <span className="text-lg text-gray-800">Escalation</span>
            <div className="w-20 h-2 bg-gray-800 rounded" />
          </div>
          <div className="flex justify-between items-center">
            <span className="text-lg text-gray-800">Critical Care/Emergency</span>
            <div className="w-36 h-2 bg-gray-800 rounded" />
          </div>
        </div>
      </div>
    </div>
  )
}

function BarChartIcon(props) {
  return (
    <svg
      {...props}
      xmlns="http://www.w3.org/2000/svg"
      width="24"
      height="24"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <line x1="12" x2="12" y1="20" y2="10" />
      <line x1="18" x2="18" y1="20" y2="4" />
      <line x1="6" x2="6" y1="20" y2="16" />
    </svg>
  )
}


function CreditCardIcon(props) {
  return (
    <svg
      {...props}
      xmlns="http://www.w3.org/2000/svg"
      width="24"
      height="24"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <rect width="20" height="14" x="2" y="5" rx="2" />
      <line x1="2" x2="22" y1="10" y2="10" />
    </svg>
  )
}
