import React from "react";

import { Box } from "@mui/material";

import { NavItem } from "..";

import routes from "../../routes";

import { usePages } from "../../context";

import styles from "./SideBar.module.css";

const Sidebar: React.FC = () => {
  const { setPageName } = usePages();
  return (
    <Box
      sx={{
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        backgroundColor: "#ffff",
        padding: "38px",
        paddingTop: "28px",
        borderRight: "1px solid #E1E1E1",
      }}
    >
      <img alt="logo" className={styles.logo} />

      <Box
        sx={{
          display: "flex",
          flexDirection: "column",
          justifyContent: "space-between",
          marginTop: "25px",
          width: "100%",
          height: "100%",
        }}
      >
        <Box
          sx={{
            display: "flex",
            flexDirection: "column",
            paddingBottom: "38px",
          }}
        >
          <Box onClick={() => setPageName("Home")}>
            <NavItem
              // img={dashboard}
              title="Home"
              route={routes.index}
            />
          </Box>
        </Box>
      </Box>
    </Box>
  );
};

export default Sidebar;
