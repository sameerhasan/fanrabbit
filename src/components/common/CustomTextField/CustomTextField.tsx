import React from "react";

import FormControl from "@mui/material/FormControl";
import InputLabel from "@mui/material/InputLabel";
import FormHelperText from "@mui/material/FormHelperText";
import { InputBase } from "@mui/material";
import { styled, useTheme } from "@mui/material/styles";

const CustomInput = styled(InputBase)(() => {
  const customTheme = useTheme();

  return {
    "& .MuiFormLabel-root": {
      fontSize: "14px",
      fontFamily: "Inter",
    },
    "label + &": {
      marginTop: customTheme.spacing(3),
      color: "rgba(0, 0, 0, 0.3)",
      fontFamily: "Inter",
    },
    "& .MuiInputBase-input": {
      fontFamily: "Inter",
      borderRadius: 4,
      position: "relative",
      backgroundColor: "#ffff",
      border: "1px solid rgba(225, 225, 225, 1)",
      color: "rgba(0, 0, 0)",
      fontSize: 14,
      width: "100%",
      height: "20px",
      padding: "10px 15px",
      transition: customTheme.transitions.create([
        "border-color",
        "box-shadow",
      ]),
      "&:focus": {
        border: "1px solid #616161",
      },
      "&:hover": {
        border: "1px solid #616161",
      },
    },
  };
});

const CustomTextField = React.forwardRef(
  (
    {
      isTextArea,
      icon,
      placeholder,
      label,
      helperText,
      name,
      register,
      defaultValue,
      onChange,
      multiline,
      maxRows,
      width,
      rows,
      value,
      readOnly,
      ...props
    }: {
      label?: string;
      helperText?: string;
      name: string;
      register?: unknown;
      placeholder?: string | undefined;
      icon?: React.ElementType;
      isTextArea?: boolean;
      defaultValue?: string | undefined;
      onChange?: (event: React.ChangeEvent<HTMLInputElement>) => void;
      width?: string | undefined;
      multiline?: boolean;
      maxRows?: number;
      rows?: number;
      value: string;
      readOnly?: boolean;
    },
    ref
  ) => {
    return (
      <FormControl variant="standard">
        <InputLabel
          shrink
          htmlFor={name}
          sx={{
            fontSize: "16px",
            userSelect: "none",
            fontFamily: "Inter",
            color: "rgba(0, 0, 0, 1)",
            fontWeight: "600",
            "&.Mui-focused": {
              color: "rgba(0, 0, 0, 1)",
            },
          }}
        >
          {label}
        </InputLabel>
        <CustomInput
          sx={{ width: width || undefined }}
          // eslint-disable-next-line @typescript-eslint/ban-ts-comment
          {...(typeof register === "function" ? register(name) : {})}
          id={name}
          {...props}
          placeholder={placeholder}
          defaultValue={defaultValue}
          value={value}
          inputRef={ref}
          onChange={onChange}
          multiline={multiline ? true : false}
          maxRows={maxRows ? maxRows : undefined}
          rows={rows ? rows : undefined}
          readOnly={readOnly ? true : false}
        />
        {helperText && <FormHelperText>{helperText}</FormHelperText>}
      </FormControl>
    );
  }
);
export default CustomTextField;
