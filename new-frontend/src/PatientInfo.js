import React, { useState } from "react";
import { BeatLoader } from "react-spinners";

export default function PatientInfo() {
  const [patientName, setPatientName] = useState("");
  const [nhsNumber, setNhsNumber] = useState("");
  const [isFormForSelf, setIsFormForSelf] = useState(true); // Default to true for "This form is for myself"
  const [conditions, setConditions] = useState("");
  const [successMessage, setSuccessMessage] = useState("");
  const [errorMessage, setErrorMessage] = useState("");
  const [loading, setLoading] = useState(false);

  const handleOptionChange = (event) => {
    console.log("event.target.id:", event.target.id);
    // setIsFormForSelf(event.target.id === "for_myself");
    setIsFormForSelf((prevIsFormForSelf) => !prevIsFormForSelf);
  };

  const handleSubmit = async (event) => {
    event.preventDefault();

    setLoading(true);

    const apiUrl = "http://localhost:8000/api/generate_response";

    const formData = {
      patientName,
      nhsNumber,
      isFormForSelf,
      conditions,
    };

    try {
      const response = await fetch(apiUrl, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(formData),
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
  };

  return (
    <form onSubmit={handleSubmit}>
      <div className="px-4 py-6 space-y-4 md:space-y-0">
        <div className="mx-auto max-w-2xl space-y-4">
          <div className="space-y-2">
            <h1 className="text-3xl font-bold">Patient Information</h1>
            <p className="text-gray-500 dark:text-gray-400">
              Please provide the following information about the patient.
            </p>
          </div>
          <div className="space-y-4">
            <div className="space-y-2">
              <label
                className="text-md font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
                htmlFor="patient-name"
              >
                Patient's Name
              </label>
              <input
                className="flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background file:border-0 file:bg-transparent file:text-sm file:font-medium placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50"
                id="patient-name"
                placeholder="Enter the patient's name"
                required
                value={patientName}
                onChange={(e) => setPatientName(e.target.value)}
              />
            </div>
            <div className="space-y-2">
              <label
                className="text-md font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
                htmlFor="patient-nhs-number"
              >
                Patient's NHS Number
              </label>
              <input
                className="flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background file:border-0 file:bg-transparent file:text-sm file:font-medium placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50"
                id="patient-nhs-number"
                placeholder="Enter the patient's NHS number"
                required
                value={nhsNumber}
                onChange={(e) => setNhsNumber(e.target.value)}
              />
            </div>
        <div className="space-y-2">
          <div className="space-y-2">
            <div className="flex items-center space-x-2">
              <div className="inline-flex items-center">
                <input
                  name="type"
                  type="radio"
                  className="peer h-5 w-5 cursor-pointer opacity-0 absolute"
                  id="for_myself"
                  onChange={handleOptionChange}
                  checked={isFormForSelf}
                />
                <label
                  className="relative flex items-center p-3 rounded-full cursor-pointer"
                  htmlFor="for_myself"
                >
                  <div className={`h-5 w-5 border border-blue-gray-200 rounded-full flex items-center justify-center ${isFormForSelf ? 'bg-gray-900' : ''}`}>
                    {isFormForSelf && (
                      <div className="h-3.5 w-3.5 bg-gray-900 rounded-full"></div>
                    )}
                  </div>
                  <span className="ml-2 text-gray-900 font-light">
                    This form is for myself
                  </span>
                </label>
              </div>
              <div className="inline-flex items-center">
                <input
                  name="type"
                  type="radio"
                  className="peer h-5 w-5 cursor-pointer opacity-0 absolute"
                  id="for_someone_else"
                  onChange={handleOptionChange}
                  checked={!isFormForSelf}
                />
                <label
                  className="relative flex items-center p-3 rounded-full cursor-pointer"
                  htmlFor="for_someone_else"
                >
                  <div className={`h-5 w-5 border border-blue-gray-200 rounded-full flex items-center justify-center ${!isFormForSelf ? 'bg-gray-900' : ''}`}>
                    {!isFormForSelf && (
                      <div className="h-3.5 w-3.5 bg-gray-900 rounded-full"></div>
                    )}
                  </div>
                  <span className="ml-2 text-gray-900 font-light">
                    This form is for someone else
                  </span>
                </label>
              </div>
            </div>
          </div>
        </div>
            {/* Conditions Label and Textarea */}
            <div className="space-y-2">
              <label
                className="text-md font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
                htmlFor="conditions"
              >
                Conditions
              </label>
              <textarea
                className="h-20 w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background file:border-0 file:bg-transparent file:text-sm file:font-medium placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50"
                id="conditions"
                placeholder="Enter the conditions"
                required
                value={conditions}
                onChange={(e) => setConditions(e.target.value)}
              />
            </div>
            <div className="flex justify-center">
              {loading ? (
                <BeatLoader color="#000" />
              ) : (
                <button
                  type="submit"
                  className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded-full focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-opacity-50"
                >
                  Submit
                </button>
              )}
            </div>
          {successMessage && <div className="bg-green-100 text-green-800 p-4 rounded-md">{successMessage}</div>}
          {errorMessage && <div className="bg-red-100 text-red-800 p-4 rounded-md">{errorMessage}</div>}
          </div>
        </div>
      </div>
    </form>
  );
}
