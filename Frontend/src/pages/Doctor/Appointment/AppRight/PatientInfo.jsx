import { FaMale, FaPhone, FaEnvelope } from "react-icons/fa"; // Importing FontAwesome icons
import { MdDateRange } from "react-icons/md"; // Importing Material Icons

const PatientInfo = () => {
  return (
    <div className="w-1/3 col-span-2 p-4 bg-white shadow rounded-md">
      <h2 className="text-2xl font-bold mb-4">Jerome Bellingham</h2>
      <div>
        {/* Gender */}
        <div className="flex items-center mb-3">
          <FaMale className="mr-2" />
          <div>
            <p className="text-xs text-gray-400">Gender</p>
            <p className="text-s">Male</p>
          </div>
        </div>

        {/* Birthday */}
        <div className="flex items-center mb-3">
          <MdDateRange className="mr-2" />
          <div>
            <p className="text-xs text-gray-400">Birthday</p>
            <p className="text-s">12 August 2001</p>
          </div>
        </div>

        {/* Phone */}
        <div className="flex items-center mb-3">
          <FaPhone className="mr-2" />
          <div>
            <p className="text-xs text-gray-400">Phone</p>
            <p className="text-s">83735634323</p>
          </div>
        </div>

        {/* Email */}
        <div className="flex items-center">
          <FaEnvelope className="mr-2" />
          <div>
            <p className="text-xs text-gray-400">Email</p>
            <p className="text-s">jeromebellingham93@mail.com</p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default PatientInfo;
