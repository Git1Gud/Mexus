import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import { PageNotFound,Login,Register, Appointment } from "./pages/index.js";
import { ChakraProvider } from "@chakra-ui/react";
import "./index.css";
import './App.css'
import { Dashboard } from "./components/index.js";
import Home from "./pages/Home/Home.jsx";
import Zegovideo from "./components/Zegovideo.jsx";
import VideozegoRoom from "./components/VideozegoRoom.jsx";
import Report from "./pages/Patient/Report.jsx";
import Chat from "./components/Chat.jsx";
import Predict from "./pages/Predict.jsx";
// /

import {Main} from './pages/index.js'
import NewChat from "./components/NewChat/NewChat.jsx";
import PatientDB from "./components/Patient/PatientDB.jsx";
// import ChatApp from "./pages/Chat/Chat.jsx";


const router = createBrowserRouter([
  {
    path: "/",
    element: <Home/>,
    errorElement: <PageNotFound />,
  },{
    path: '/home',
    children:[
      {
        path:'consultation',

      },
      {
        path: 'videocall',
        element: <Zegovideo/>,
      },
      
      {
        path:"room/:id",
        element:<VideozegoRoom/>
      },{
        path: 'main',
        element: <Main/>
      },
      {
        path: 'appointment',
        element: <Appointment/>
      },{
        path:'report',
        element: <Report/>
      },
      {
        path: 'chat',
        element: <Chat />,
      },{
        path: 'Predict',
        element: <Predict/>
      
      },
      {
        path: 'newchat',
        element: <NewChat />,
      },
      {
        path: 'patientDB',
        element: <PatientDB />,
      },
      
    ],
    element: <Dashboard/>
  },
  {
    path: "/register",
    element: <Register />,
    errorElement: <PageNotFound />,
  },
  {
    path: "/login",
    element: <Login />,
    errorElement: <PageNotFound />,
  },

]);

createRoot(document.getElementById("root")).render(
  <StrictMode>
    <ChakraProvider>
      <RouterProvider router={router} />
    </ChakraProvider>
  </StrictMode>
);
