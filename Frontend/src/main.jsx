import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import { PageNotFound,Login,Register } from "./pages/index.js";
import { ChakraProvider } from "@chakra-ui/react";
import "./index.css";
import { Dashboard } from "./components/index.js";
import Home from "./pages/Home/Home.jsx";


const router = createBrowserRouter([
  {
    path: "/",
    element: <Home/>,
    errorElement: <PageNotFound />,
  },{
    path: '/home',
    children:[

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
