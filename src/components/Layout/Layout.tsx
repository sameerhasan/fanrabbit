import React from "react";
import { Outlet } from "react-router-dom";

import { Box } from "@mui/material";

import { Header, Sidebar } from "..";

// import { useAuth } from "../../context";

const Layout: React.FC = () => {
  // const { logout, userData } = useAuth();

  return (
    <>
      <Box
        sx={{
          display: "flex",
          width: "100%",
          height: "100vh",
        }}
      >
        <Sidebar />
        <Box
          sx={{
            display: "flex",
            flexDirection: "column",
            width: "100%",
          }}
        >
          <Header />
          <Outlet />
        </Box>
      </Box>
    </>
  );
};

export default Layout;
