import  { useState } from "react";
import {
  FormControl,
  FormLabel,
  Input,
  Select,
  Button,
} from "@chakra-ui/react";
import { useToast } from "@chakra-ui/react";
import { Link, useNavigate } from "react-router-dom";
import axios from "axios";
import { motion } from "framer-motion";

const Register = () => {
  const toast = useToast();
  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);
  const [userData, setUserData] = useState({
    fullName: "",
    phone: "",
    email: "",
    password: "",
    role: "",
    specialization: "",
    experience: "",
  });

  const handleInputChange = (event) => {
    const { name, value } = event.target;
    setUserData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    
    if (!userData.email || !userData.fullName || !userData.phone || !userData.password) {
      toast({
        title: "Error",
        description: "All fields are required!",
        status: "error",
        duration: 9000,
        isClosable: true,
      });
      return;
    }

    // Validate doctor's additional fields
    if (userData.role === "doctor" && (!userData.specialization || !userData.experience)) {
      toast({
        title: "Error",
        description: "Specialization and experience are required for doctors!",
        status: "error",
        duration: 9000,
        isClosable: true,
      });
      return;
    }

    try {
      setLoading(true);
      const response = await axios.post(
        "http://localhost:8000/api/v1/users/register",
        userData
      );

      if (response.data.success) {
        toast({
          title: "Account created.",
          description: "We've created your account for you.",
          status: "success",
          duration: 9000,
          isClosable: true,
        });
        navigate("/login");
      }
    } catch (error) {
      toast({
        title: "Error",
        description: `${error.response.data.message}`,
        status: "error",
        duration: 9000,
        isClosable: true,
      });
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="overflow-y-auto no-scrollbar">
      <motion.div
        initial={{ opacity: 0, y: 50 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8, ease: "easeOut" }}
        className="w-screen min-h-screen flex justify-center items-center bg-Greyish  overflow-y-auto no-scrollbar"
      >
        <motion.div
          initial={{ scale: 0.95 }}
          animate={{ scale: 1 }}
          transition={{ duration: 0.6, ease: "easeInOut" }}
          className="bg-white shadow-lg rounded-lg w-[60vw] max-w-lg p-6"
        >
          <form className="flex flex-col" onSubmit={handleSubmit}>
            <h1 className="text-2xl font-bold text-center text-gray-700 py-4">
              REGISTER
            </h1>

            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.2, duration: 0.8 }}
              className="flex flex-col gap-4"
            >
              <div className="flex flex-row gap-3">
                <FormControl>
                  <FormLabel>Full Name</FormLabel>
                  <Input
                    name="fullName"
                    type="text"
                    onChange={handleInputChange}
                  />
                </FormControl>
                <FormControl>
                  <FormLabel>Phone</FormLabel>
                  <Input
                    name="phone"
                    type="number"
                    onChange={handleInputChange}
                  />
                </FormControl>
              </div>

              <div className="flex flex-row gap-3">
                <FormControl>
                  <FormLabel>Email</FormLabel>
                  <Input
                    name="email"
                    type="email"
                    onChange={handleInputChange}
                  />
                </FormControl>
                <FormControl>
                  <FormLabel>Password</FormLabel>
                  <Input
                    name="password"
                    type="password"
                    onChange={handleInputChange}
                  />
                </FormControl>
              </div>

              <div className="flex flex-row gap-3">
                <FormControl>
                  <FormLabel as="legend">Role</FormLabel>
                  <Select
                    name="role"
                    placeholder="Select Role"
                    onChange={handleInputChange}
                  >
                    <option>patient</option>
                    <option>doctor</option>
                    <option>admin</option>
                  </Select>
                </FormControl>
              </div>

              {userData.role === "doctor" && (
                <div className="flex flex-row gap-3">
                  <FormControl>
                    <FormLabel>Specialization</FormLabel>
                    <Input
                      name="specialization"
                      type="text"
                      onChange={handleInputChange}
                    />
                  </FormControl>
                  <FormControl>
                    <FormLabel>Experience</FormLabel>
                    <Input
                      name="experience"
                      type="number"
                      onChange={handleInputChange}
                    />
                  </FormControl>
                </div>
              )}
            </motion.div>

            {loading ? (
              <motion.p
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ duration: 0.5 }}
                className="text-center text-xl font-bold text-sky-500 my-8"
              >
                Please wait...
              </motion.p>
            ) : (
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 0.3, duration: 0.7 }}
                className="flex justify-center py-6"
              >
                <Button colorScheme="teal" size="lg" type="submit">
                  REGISTER
                </Button>
              </motion.div>
            )}

            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.4, duration: 0.7 }}
              className="flex justify-center items-center py-4"
            >
              <p className="text-center text-xl font-bold">
                Already have an account?{" "}
                <span className="text-sky-500">
                  <Link to="/login">Login</Link>
                </span>
              </p>
            </motion.div>
          </form>
        </motion.div>
      </motion.div>
    </div>
  );
};

export default Register;
