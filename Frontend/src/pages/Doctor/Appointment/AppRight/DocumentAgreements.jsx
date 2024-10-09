const documents = [
    { name: 'Agreement_Meditation.zip', size: '2.3 mb' },
    { name: 'Provision of Information.pdf', size: '1.2 mb' },
  ];
  
  const DocumentAgreements = () => {
    return (
      <div className="w-[32%] p-4 bg-white shadow rounded-md">
        <h2 className="text-xl font-bold mb-4">Agreement of Documents</h2>
        <ul>
          {documents.map((doc, index) => (
            <li key={index} className="mb-2">
              <a href="#" className="text-blue-500">
                {doc.name}
              </a>
              <span className="text-sm text-gray-500 ml-2">{doc.size}</span>
            </li>
          ))}
        </ul>
      </div>
    );
  };
  
  export default DocumentAgreements;
  