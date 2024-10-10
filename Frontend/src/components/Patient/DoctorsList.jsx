import React, { useEffect, useState } from 'react';
import axios from 'axios';

const DoctorList = () => {
  const [doctors, setDoctors] = useState([]);

  // Function to fetch all doctors
  const fetchDoctors = async () => {
    try {
      const response = await axios.get('http://127.0.0.1:8000/api/v1/users/doctor/doctors');
      console.log(response) // Adjust the URL as needed
      if (Array.isArray(response.data)) {
        setDoctors(response.data);
      } else {
        console.error('API response is not an array:', response.data);
      }
    } catch (error) {
      console.error('Error fetching doctors:', error);
    }
  };

  // Function to create an appointment
  const createAppointment = async (doctorId) => {
    try {
      const response = await axios.post('/api/appointments', { doctorId }); // Adjust the URL and payload as needed
      console.log('Appointment created:', response.data);
    } catch (error) {
      console.error('Error creating appointment:', error);
    }
  };

  useEffect(() => {
    fetchDoctors();
  }, []);

  return (
    <div className="mt-10 w-1/2">
      <div className="heading">Doctors List</div>
      <table className="w-full border-collapse">
        <thead>
          <tr>
            <th className="border-b border-solid border-[#0066ff61] py-3 text-left">Name</th>
            <th className="border-b border-solid border-[#0066ff61] py-3 text-left">Specialization</th>
            <th className="border-b border-solid border-[#0066ff61] py-3 text-left">Experience</th>
            <th className="border-b border-solid border-[#0066ff61] py-3 text-left">Action</th>
          </tr>
        </thead>
        <tbody>
          {Array.isArray(doctors) && doctors.map((doctor) => (
            <tr key={doctor._id}>
              <td className="border-b border-solid border-[#0066ff61] py-3">{doctor.userId.fullName}</td>
              <td className="border-b border-solid border-[#0066ff61] py-3">{doctor.specialization}</td>
              <td className="border-b border-solid border-[#0066ff61] py-3">{doctor.experience}</td>
              <td className="border-b border-solid border-[#0066ff61] py-3">
                <button
                  onClick={() => createAppointment(doctor._id)}
                  className="bg-primaryColor text-black py-2 px-4 rounded bg-bluee"
                >
                  Book Appointment
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default DoctorList;