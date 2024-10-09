const appointments = [
    { date: '12 Oct 2023', treatment: 'Prosthetic Tooth Fabrication', doctor: 'Drg. Wade Warren' },
    { date: '12 Sep 2023', treatment: 'Post-Surgical Care', doctor: 'Drg. Marvin McKinney' },
    { date: '12 Aug 2023', treatment: 'Implant Placement', doctor: 'Drg. Floyd Miles' },
  ];
  
  const AppSchedule = () => {
    return (
      <div className="p-4 w-1/3 overflow-y-auto no-scrollbar bg-white shadow rounded-md">
        <h2 className="text-xl font-bold mb-4">Appointment Schedule</h2>
        <ul>
          {appointments.map((appointment, index) => (
            <li key={index} className="mb-4">
              <p className="font-semibold">{appointment.date}</p>
              <p>{appointment.treatment}</p>
              <p className="text-sm text-gray-500">{appointment.doctor}</p>
            </li>
          ))}
        </ul>
      </div>
    );
  };
  
  export default AppSchedule;
  