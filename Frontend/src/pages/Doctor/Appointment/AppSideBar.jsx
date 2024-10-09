import { useState } from "react";
import { SlideTabs } from './FilterButton';

const AppSidebar = () => {
  const [searchTerm, setSearchTerm] = useState("");
  const [filter, setFilter] = useState("all");

  const patients = [
    { id: 1, name: "Bessie Cooper", registerDate: "12 April 2023" },
    { id: 2, name: "Jerome Bellingham", registerDate: "12 May 2023" },
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

  // Filter patients based on search term and filter option
  const filteredPatients = patients
    .filter((patient) =>
      patient.name.toLowerCase().includes(searchTerm.toLowerCase())
    )
    .sort((a, b) => {
      if (filter === "oldest") {
        return new Date(a.registerDate) - new Date(b.registerDate);
      } else if (filter === "newest") {
        return new Date(b.registerDate) - new Date(a.registerDate);
      }
      return 0; // No sorting for "all"
    });

  return (
    <div className="rounded-lg w-1/4 h-screen overflow-y-auto no-scrollbar ">
      {/* Header and Search */}
      <h2 className="text-2xl font-bold text-gray-800 mb-4">Patient Queue</h2>
      <div className="relative mb-4">
        <input
          type="text"
          placeholder="Search..."
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          className="w-full p-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-400"
        />
        <span className="absolute top-2.5 right-3 text-gray-400">
          🔍 {/* You can replace this with an actual search icon */}
        </span>
      </div>

      {/* Filters */}
      <div className="flex justify-around mb-4">
        <SlideTabs setFilter={setFilter} />
      </div>

      {/* Patient List */}
      <div>
        {filteredPatients.map((patient) => (
          <div
            key={patient.id}
            className="flex justify-between items-center pt-4 pb-4 px-4 bg-white rounded-md mb-2 shadow-sm transition-transform transform hover:scale-105"
          >
            <div>
              <p className="font-semibold text-gray-700">{patient.name}</p>
              <p className="text-sm text-gray-500">
                Register: {patient.registerDate}
              </p>
            </div>
            <button className="text-gray-500 hover:text-blue-500 transition-colors">
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
