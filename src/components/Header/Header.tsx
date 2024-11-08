import React from "react";
import { useQuery } from "react-query";

import { Box, CircularProgress, Typography } from "@mui/material";

import { HeaderDropdown } from "..";

import { IUser } from "../../interfaces/user.interfaces";

import routes from "../../routes";

import { usePages } from "../../context";

import api from "../../services/apiService";

import { localStorageManager } from "../../services";

import { USER_ID } from "../../constants";

const Header: React.FC = () => {
  const getToken = (key: string) => {
    return localStorageManager.getItem(key);
  };

  const { pageName } = usePages();

  const getUserCreditsFormsQuery = async () =>
    api
      .get<IUser>(routes.userDetail)
      .then((res) => res.data);

  const {
    data: userQueryData,
    isFetching: userIsFetching,
    isLoading: userIsLoading,
  } = useQuery<IUser>(
    [getToken(USER_ID), "getUserCreditsFormsQuery"],
    getUserCreditsFormsQuery
  );

  if (userIsFetching || userIsLoading) {
    return (
      <CircularProgress
        size={24}
        sx={{
          color: "#0C0E15",
          position: "absolute",
          left: "50%",
          top: "50%",
          transform: "translate(-50%, -50%)",
        }}
      />
    );
  }

  return (
    <Box
      sx={{
        display: "flex",
        alignItems: "center",
        justifyContent: "space-between",
        padding: "24px 36px",
        background: "#fff",
        width: "calc(100% - 289px)%",
        borderBottom: "1px solid #E1E1E1",
        position: "relative",
      }}
    >
      <Box sx={{ display: "flex", flexDirection: "column" }}>
        <Typography
          sx={{
            fontSize: "19px",
            fontWeight: "600",
            color: "#000000",
            userSelect: "none",
            fontFamily: "Inter",
          }}
        >
          {pageName === "Auth" ? "Home" : pageName}
        </Typography>
      </Box>

      <Box sx={{ display: "flex", alignItems: "center" }}>
        <Box
          sx={{
            height: "38px",
            width: "38px",
            background: "rgba(0, 0, 0, 1)",
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
            justifyContent: "center",
            borderRadius: "50%",
            marginLeft: "25px",
          }}
        >
          <Typography
            sx={{
              color: "#FFFFFF",
              fontSize: "18px",
              fontWeight: "600",
              userSelect: "none",
            }}
          >
            {userQueryData?.first_name.charAt(0)}
          </Typography>
        </Box>

        <Typography
          sx={{
            marginLeft: "8px",
            userSelect: "none",
            color: "#000000",
            fontWeight: "600",
            fontSize: "14px",
            fontFamily: "Inter",
          }}
        >
          {userQueryData?.first_name} {userQueryData?.last_name}
        </Typography>

        <HeaderDropdown />
      </Box>
    </Box>
  );
};

export default Header;
