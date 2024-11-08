import React from "react";

import { Typography } from "@mui/material";

interface IErrorMessage {
  message: string | undefined;
  mr?: number;
}

const ErrorMessage: React.FC<IErrorMessage> = ({ message, mr }) => {
  return (
    <Typography
      sx={{
        fontFamily: "Inter",
        fontWeight: "600",
        marginTop: "5px",
        color: "#FF0000",
        fontSize: "12px",
        display: "inline-block",
        marginRight: `${mr}px`,
        userSelect: "none",
      }}
    >
      {message}
    </Typography>
  );
};

export default ErrorMessage;
