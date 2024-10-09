import React from "react";
import axios from "axios";

function Report() {
  const user = JSON.parse(localStorage.getItem("user"));

  const getUrl = async () => {
    try {
      console.log(user._id);
      const response = await axios.get(
        `http://localhost:8000/api/v1/users/patient/details?userId=${user._id}`
      );
      console.log(response.data.data);

      return response.data.data.medicalReports[0];
    } catch (error) {
      console.log(error);
    }
  };

  const handleSubmit = async () => {
    const url = await getUrl();
    const data = {
      pdf_url:
        url ||
        "http://res.cloudinary.com/dsvn3knsf/image/upload/v1728497489/yyno1m0xejyq2m8afinq.pdf",
    };
    try {
      const response = await axios.post("http://127.0.0.1:5000/grade", data);
      console.log(response);
    } catch (error) {}
  };

  return <button onClick={handleSubmit}>Summarise</button>;
}

export default Report;
