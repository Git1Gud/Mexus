import React, { useState } from 'react';

function Predict() {
  const [selectedFile, setSelectedFile] = useState(null);
  const [result, setResult] = useState('');
  const [loading, setLoading] = useState(false);

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

    setLoading(true); // Show loading state

    const formData = new FormData();
    formData.append('file', selectedFile);

    try {
      const response = await fetch('http://localhost:5000/predict', {
        method: 'POST',
        body: formData,
      });

      const data = await response.json();
      setResult(`Predicted Label: ${data.label?"Malaria detected":"Malaria not detected"}`);
    } catch (error) {
      console.error('Error:', error);
      setResult('Error in prediction');
    } finally {
      setLoading(false); // Hide loading state
    }
  };

  return (
    <div style={styles.container}>
      <h1 style={styles.heading}>Malaria Detection</h1>
      <form onSubmit={handleSubmit} style={styles.form}>
        <label style={styles.fileLabel}>
          <input 
            type="file" 
            accept="image/*" 
            onChange={handleFileChange} 
            style={styles.fileInput} 
          />
          Choose an image
        </label>
        <button type="submit" style={styles.button}>
          {loading ? 'Processing...' : 'Upload and Predict'}
        </button>
      </form>
      {result && <p style={styles.result}>{result}</p>}
    </div>
  );
}

// Inline styles for simplicity
const styles = {
  container: {
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    justifyContent: 'center',
    height: '100vh',
    backgroundColor: '#f7f9fc',
    padding: '20px',
  },
  heading: {
    fontSize: '2.5rem',
    color: '#333',
    marginBottom: '20px',
  },
  form: {
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    gap: '15px',
  },
  fileLabel: {
    display: 'inline-block',
    padding: '10px 20px',
    backgroundColor: '#007BFF',
    color: '#fff',
    borderRadius: '5px',
    cursor: 'pointer',
    fontWeight: 'bold',
  },
  fileInput: {
    display: 'none', // Hide the actual file input
  },
  button: {
    padding: '10px 20px',
    backgroundColor: '#28a745',
    color: '#fff',
    border: 'none',
    borderRadius: '5px',
    cursor: 'pointer',
    fontSize: '1rem',
    transition: 'background-color 0.3s ease',
  },
  buttonHover: {
    backgroundColor: '#218838',
  },
  result: {
    marginTop: '20px',
    fontSize: '1.2rem',
  },
};

export default Predict;
