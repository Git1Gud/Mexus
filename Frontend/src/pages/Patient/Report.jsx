import React, { useState } from "react";
import axios from "axios";
import { Button, Input, Box, VStack, Text, Divider,useToast } from "@chakra-ui/react";

function Report() {
  const user = JSON.parse(localStorage.getItem("user"));
  const [file, setFile] = useState(null); // State to hold the selected file
  const [reportData, setReportData] = useState(null); // State to store fetched report details
  const [no,setNo]=useState('')
const toast=useToast(); 
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
      pdf_url: url || "http://res.cloudinary.com/dsvn3knsf/image/upload/v1728497489/yyno1m0xejyq2m8afinq.pdf",
    };
    if(!no){
        return ;
    }
  
    try {
      const response = await axios.post(`http://127.0.0.1:5000/grade/${no}`, data);
      console.log("API Response:", response.data); // Check the response
      if (response.data) {
        setReportData(response.data);
      } else {
        console.error("No data returned from the API.");
      }
      toast({
        title: "SMS sent",
        status: "success",
        duration: 9000,
        isClosable: true,
      });
    } catch (error) {
      console.error("Error fetching report data:", error);
    }
  };
  
  const handleUpload = async () => {
    if (!file || !no) {
      alert("Please select a file to upload and a no.");
      return;
    }

    const medicalReport=file

    try {
      const response = await axios.patch(
        "http://localhost:8000/api/v1/users/patient/update-medical-reports", // Replace with your upload API
        {
            medicalReport,
            userId:user._id,
        },
        {
          headers: {
            "Content-Type": "multipart/form-data",
          },
        }
      );
      console.log(response.data);
      toast({
        title: "File Uploaded",
        status: "success",
        duration: 9000,
        isClosable: true,
      });
    } catch (error) {
      console.error("File upload failed", error);
    }
  };

  const handleFileChange = (event) => {
    setFile(event.target.files[0]); // Get the selected file
  };

  return (
    <Box
      display="flex"
      justifyContent="center"
      alignItems="center"
      backgroundColor="gray.50"
      padding={6}
    >
      <VStack
        spacing={4}
        padding={8}
        backgroundColor="white"
        boxShadow="lg"
        borderRadius="md"
        width={["90%", "70%", "50%", "30%"]}
      >
        <Text fontSize="2xl" fontWeight="bold" color="teal.600">
          Medical Report Upload
        </Text>

        {/* File input for uploading a file */}
        <Input
          type="file"
          onChange={handleFileChange}
          padding={2}
          borderColor="teal.300"
          focusBorderColor="teal.500"
        />

        {/* Buttons for upload and summarization */}
        <Button
          colorScheme="teal"
          variant="solid"
          size="md"
          width="100%"
          onClick={handleUpload}
        >
          Upload
        </Button>
        <Input
          type="number"
          onChange={(e)=>setNo(e.target.value)}
          padding={2}
          borderColor="teal.300"
          focusBorderColor="teal.500"
        />
        <Button
          colorScheme="blue"
          variant="outline"
          size="md"
          width="100%"
          onClick={handleSubmit}
        >
          Summarise
        </Button>

        {/* Divider between upload section and report details */}
        <Divider />

        {/* Display report data if available */}
        {false && (
          <Box
            backgroundColor="gray.100"
            padding={4}
            borderRadius="md"
            width="100%"
          >
            <Text fontSize="lg" fontWeight="bold" color="teal.500">
                {reportData}
            </Text>
            
          </Box>
        )}
      </VStack>
    </Box>
  );
}

export default Report;
