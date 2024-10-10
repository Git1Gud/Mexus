
import DoctorsList from './DoctorsList';
import PatientDetails from './PatientDetails';

const PatientDB = () => {

const userId = JSON.parse(localStorage.getItem("user"))?._id;
console.log(userId);

  return (
    <div>
      <h1 className='heading spanColor !font-anta mt-2'>Patient Dashboard</h1>
      <div className='flex w-full h-full flex-row items-start justify-around px-10 py-5 gap-20 ' >
        <DoctorsList />
        <PatientDetails patientId = {userId} />

      </div>
    </div>
  );
};

export default PatientDB;