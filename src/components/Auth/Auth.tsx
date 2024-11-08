import React, { useEffect, useState } from "react";
import { Navigate } from "react-router";

import { Box, Typography } from "@mui/material";

import { LoginForm, SignUpForm } from ".";

import { IForm } from "./Auth.interfaces";

import { localStorageManager } from "../../services";

import { TOKEN } from "../../constants";

import routes from "../../routes";

import styles from "./Auth.module.css";

const Auth: React.FC = () => {
  const token = localStorageManager.getItem(TOKEN);

  const [formName, setFormName] = useState<IForm>({
    type: "loginForm",
  });

  useEffect(() => {
    if (window.location.hash === "#signup") {
      setFormName({ type: "signUpForm" });
    } else {
      setFormName({ type: "loginForm" });
    }

    const handleHashChange = () => {
      if (window.location.hash === "#signup") {
        setFormName({ type: "signUpForm" });
      } else {
        setFormName({ type: "loginForm" });
      }
    };

    window.addEventListener("hashchange", handleHashChange);
    return () => {
      window.removeEventListener("hashchange", handleHashChange);
    };
  }, []);

  const handleFormChange = (newForm: IForm) => {
    setFormName(newForm);
  };

  if (token) {
    return <Navigate to={routes.index} />;
  }

  return (
    <Box
      sx={{
        width: "100%",
        height: "100vh",
        overflow: "auto",
        background: "#ffff",
        display: "flex",
        flexDirection: "column",
      }}
    >
      <Box sx={{ border: "1px solid black", padding: "24px" }}>
        <Typography sx={{ fontWeight: "600" }}>FanRabbit</Typography>
      </Box>

      <Box
        sx={{
          display: "flex",
          alignItems: "center",
          justifyContent: "space-between",
          paddingLeft: "164px",
          paddingRight: "164px",
        }}
      >
        <Box sx={{ display: "flex", flexDirection: "column" }}>
          <Typography>
            <Typography variant="span" fontWeight={600}>
              Lorem ipsum
            </Typography>{" "}
            - dolor sit amet, consectetur adipisicing <br /> elit. Sint,
            dolorum.
          </Typography>

          <Typography sx={{ marginTop: "12px" }}>
            <Typography variant="span" fontWeight={600}>
              Lorem ipsum
            </Typography>{" "}
            - dolor sit amet, consectetur adipisicing <br /> elit. Sint,
            dolorum.
          </Typography>

          <Typography sx={{ marginTop: "12px" }}>
            <Typography variant="span" fontWeight={600}>
              Lorem ipsum
            </Typography>{" "}
            - dolor sit amet, consectetur adipisicing <br /> elit. Sint,
            dolorum.
          </Typography>
        </Box>
        <Box
          sx={{
            display: "flex",
            flexDirection: "column",
            justifyContent: "center",
            alignItems: "center",
          }}
        >
          <Box
            sx={{
              display: "flex",
              flexDirection: "column",
              justifyContent: "center",
              alignItems: "center",
              paddingBottom: "12px",
              marginTop: formName.type !== "signUpForm" ? "70px" : "auto",
            }}
          >
            {formName.type === "loginForm" && (
              <LoginForm handleFormChange={handleFormChange} />
            )}

            {formName.type === "signUpForm" && (
              <SignUpForm handleFormChange={handleFormChange} />
            )}
          </Box>
        </Box>
      </Box>
    </Box>
  );
};

export default Auth;
