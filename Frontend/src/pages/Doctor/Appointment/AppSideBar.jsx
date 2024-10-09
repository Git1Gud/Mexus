const AppSidebar = () => {
  const patients = [
    { id: 1, name: "Bessie Cooper", registerDate: "12 March 2023" },
    { id: 2, name: "Jerome Bellingham", registerDate: "12 March 2023" },
    { id: 3, name: "Darlene Robertson", registerDate: "12 March 2023" },
    { id: 4, name: "Albert Flores", registerDate: "12 March 2023" },
    { id: 5, name: "Savannah Nguyen", registerDate: "12 March 2023" },
    { id: 6, name: "Jenny Wilson", registerDate: "12 March 2023" },
    { id: 7, name: "Kathryn Murphy", registerDate: "12 March 2023" },
    { id: 8, name: "Kathryn Murphy", registerDate: "12 March 2023" },
    { id: 9, name: "Kathryn Murphy", registerDate: "12 March 2023" },
    { id: 10, name: "Kathryn Murphy", registerDate: "12 March 2023" },
    // Add more patients as needed
  ];

  return (
    <div className="rounded-lg w-1/4 h-screen p-4 overflow-y-auto no-scrollbar">
      <h2 className="text-xl font-bold mb-4">Patient Queue</h2>
      <div>
        {patients.map((patient) => (
          <div
            key={patient.id}
            className="flex justify-between items-center pt-6 pb-4 px-4 bg-white rounded-md mb-2 shadow-sm"
          >
            <div>
              <p className="font-semibold">{patient.name}</p>
              <p className="text-sm text-gray-500">
                Register: {patient.registerDate}
              </p>
            </div>
            <button className="text-gray-500">
              {/* Icon or View More Button */}
              &gt;
            </button>
          </div>
        ))}
      </div>
    </div>
  );
};

export default AppSidebar;
