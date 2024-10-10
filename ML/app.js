import React, { useState } from 'react';

function MalariaDetection() {
  const [selectedFile, setSelectedFile] = useState(null);
  const [result, setResult] = useState('');

  // Handle file selection
  const handleFileChange = (event) => {
    setSelectedFile(event.target.files[0]);
  };

  // Handle form submission to send the image to the backend
  const handleSubmit = async (event) => {
    event.preventDefault();

    if (!selectedFile) {
      alert('Please select an image.');
      return;
    }

    const formData = new FormData();
    formData.append('file', selectedFile);

    try {
      const response = await fetch('http://localhost:5000/predict', {
        method: 'POST',
        body: formData,
      });

      const data = await response.json();
      setResult(`Predicted Label: ${data.label}`);
    } catch (error) {
      console.error('Error:', error);
      setResult('Error in prediction');
    }
  };

  return (
    <div>
      <h1>Malaria Detection</h1>
      <form onSubmit={handleSubmit}>
        <input type="file" accept="image/*" onChange={handleFileChange} />
        <button type="submit">Upload and Predict</button>
      </form>
      {result && <p>{result}</p>}
    </div>
  );
}

export default MalariaDetection;
