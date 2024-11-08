import React from "react";

import {
  FormControl,
  FormHelperText,
  IconButton,
  InputAdornment,
  InputBase,
  InputLabel,
  styled,
} from "@mui/material";

import { SvgIconComponent } from "@mui/icons-material";
import VisibilityIcon from "@mui/icons-material/Visibility";
import VisibilityOffIcon from "@mui/icons-material/VisibilityOff";

const CustomInput = styled(InputBase)(({ theme }) => ({
  "& .MuiFormLabel-root": {
    fontSize: "14px",
    fontFamily: 'Inter',
  },
  "label + &": {
    marginTop: theme.spacing(3),
    color: "#d9d9d9",
    fontFamily: 'Inter',
  },
  "& .MuiInputBase-input": {
    borderRadius: 4,
    position: "relative",
    fontFamily: 'Inter',
    backgroundColor: "#ffff",
    border: "1px solid rgba(225, 225, 225, 1)",
    fontSize: 14,
    color: 'rgba(0, 0, 0)',
    width: "100%",
    height: "38px",
    padding: "0 12px",
    transition: theme.transitions.create(["border-color", "box-shadow"]),
    "&:focus": {
      border: "1px solid #616161",
    },
    "&:hover": {
      border: "1px solid #616161",
    },
  },
}));

const CustomPasswordField = React.forwardRef(
  (
    {
      label,
      helperText,
      name,
      icon,
      placeholder,
      showPassword,
      setShowPassword,
      register,
      ...props
    }: {
      label: string;
      helperText?: string;
      name: string;
      icon?: SvgIconComponent;
      placeholder: string;
      showPassword: boolean;
      register: unknown;
      setShowPassword: (value: boolean) => void;
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
            fontFamily: 'Inter',
            color: "rgba(0, 0, 0, 1)",
            fontWeight: "600",
            userSelect: "none",
            "&.Mui-focused": {
              color: "rgba(0, 0, 0, 1)",
            },
          }}
        >
          {label}
        </InputLabel>
        <CustomInput
          // eslint-disable-next-line @typescript-eslint/ban-ts-comment
          //@ts-expect-error
          {...register(name)}
          id={name}
          type={showPassword ? "text" : "password"}
          {...props}
          inputRef={ref}
          placeholder={placeholder}
          endAdornment={
            <InputAdornment
              position="end"
              style={{
                position: "absolute",
                zIndex: "1",
                right: "16px",
              }}
            >
              <IconButton
                onClick={() => setShowPassword(!showPassword)}
                edge="end"
              >
                {showPassword ? <VisibilityOffIcon sx={{fontSize: '1rem'}}/> : <VisibilityIcon sx={{fontSize: '1rem'}}/>}
              </IconButton>
            </InputAdornment>
          }
        />
        {helperText && <FormHelperText>{helperText}</FormHelperText>}
      </FormControl>
    );
  }
);

export default React.memo(CustomPasswordField);
