import { useEffect, useState } from "react";
import axios from "axios";

const PatientDetails = ({ patientId }) => {
  const [patient, setPatient] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  // Fetch patient details once when patientId changes
  useEffect(() => {
    const fetchPatientDetails = async () => {
      try {
        const response = await axios.get(`http://127.0.0.1:8000/api/v1/users/patient/details?${patientId}`); // Adjust the URL as needed
        setPatient(response.data);
        setLoading(false);
      } catch (error) {
        setError(error.message);
        setLoading(false);
      }
    };

    // Only fetch if patientId is valid
    if (patientId) {
      fetchPatientDetails();
    }
  }, [patientId]); // Fetch only when patientId changes

  if (loading) return <div>Loading...</div>;
  if (error) return <div>Error: {error}</div>;

  return (
    <div className="mt-10 w-1/2 border-b-2">
      <h1 className="heading">Patient Profile Details</h1>
      {patient ? (
        <div>
          <div className="mb-5">
            <label>Full Name:</label>
            <div className="text-headingColor">
              {patient.data.userId.fullName || "Not provided"}
            </div>
          </div>
          <div className="mb-5">
            <label>Email:</label>
            <div className="text-headingColor">
              {patient.data.userId.email || "Not provided"}
            </div>
          </div>
          <div className="mb-5">
            <label>Phone:</label>
            <div className="text-headingColor">
              {patient.data.userId.phone || "Not provided"}
            </div>
          </div>
          <div className="mb-5">
            <label>Role:</label>
            <div className="text-headingColor">
              {patient.data.userId.role || "Not provided"}
            </div>
          </div>
          <div className="mb-5">
            <label>Medical History:</label>
            <div className="text-headingColor">
              {patient.data.medicalHistory || "Not provided"}
            </div>
          </div>
        </div>
      ) : (
        <div>No patient details available.</div>
      )}
    </div>
  );
};

export default PatientDetails;
