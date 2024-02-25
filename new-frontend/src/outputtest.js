import { useParams } from 'react-router-dom';

export default function Component() {
  const { id } = useParams();
  console.log(id)
  return (
    <div className="bg-white p-6 max-auto mx-auto rounded-lg shadow-md">
      <div className="flex justify-between items-center mb-6">
        <h3 className="text-xl font-semibold text-black-600">Personal Details</h3>
        <CreditCardIcon className="text-gray-700 w-12 h-12" />
      </div>
      <div className="flex justify-between items-center mb-6">
        <h3 className="text-xl font-semibold text-black-600">Vitals</h3>
        <BarChartIcon className="text-gray-700 w-12 h-12" />
      </div>
      <div className="mb-6">
        <h3 className="text-xl font-semibold text-center text-black-600 mb-4">Recommendation</h3>
        <div className="space-y-2">
          <div className="flex justify-between items-center">
            <span className="text-lg text-gray-800">Risk level</span>
            <span className="w-24 h-2 bg-gray-800 rounded" />
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
