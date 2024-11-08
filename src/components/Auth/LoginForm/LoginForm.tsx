import React, { useEffect, useState } from "react";
import * as Yup from "yup";
import { useForm, SubmitHandler, Controller } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import { toast } from "react-toastify";
import { Navigate, useNavigate } from "react-router-dom";
import { useMutation } from "react-query";

import { Box, Checkbox, FormControlLabel, Typography } from "@mui/material";
import CircularProgress from "@mui/material/CircularProgress";
import Button from "@mui/material/Button";

import {
  CustomPasswordField,
  CustomTextField,
  ErrorMessage,
} from "../../common";

import routes from "../../../routes";

import { IForm, ILoginFormValues } from "../Auth.interfaces";

import { useAuth } from "../../../context/Auth";

import api from "../../../services/apiService";

import { localStorageManager } from "../../../services";

import { REFRESH_TOKEN, TOKEN } from "../../../constants";

import styles from "./LoginForm.module.css";

import MailOutlineIcon from "@mui/icons-material/MailOutline";
import KeyIcon from "@mui/icons-material/Key";

interface LoginForm {
  handleFormChange: (type: IForm) => void;
}

const LoginForm: React.FC<LoginForm> = ({ handleFormChange }) => {
  const validationSchema = Yup.object().shape({
    email: Yup.string().email("Invalid email").required("Email is required"),
    password: Yup.string()
      .required("Password is required")
      .min(4, "Password must be at least 4 characters"),
    rememberMe: Yup.boolean(),
  });

  const navigate = useNavigate();

  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [isAuthenticated, setIsAuthenticated] = useState<boolean>(false);
  const [showPassword, setShowPassword] = useState(false);

  const sendTokenToBackend = async (token: string) => {
    const response = await api.post(routes.googleAuth, { token });
    const { access_token, refresh_token } = response.data;

    localStorageManager.setItem(TOKEN, access_token);
    localStorageManager.setItem(REFRESH_TOKEN, refresh_token);
  };

  const {
    mutate: authenticateWithToken,
    isSuccess,
    isLoading: authenticateWithTokenIsLoading,
  } = useMutation(sendTokenToBackend);

  const {
    register,
    handleSubmit,
    formState: { errors },
    control,
  } = useForm<ILoginFormValues>({
    resolver: yupResolver(validationSchema),
    defaultValues: {
      rememberMe: true,
    },
  });

  const { login } = useAuth();

  const authWithGoogleQuery = async () =>
    api.get(routes.authWithGoogle).then((res) => res.data);

  const {
    mutate: authenticateWithGoogle,
    data: userGoogle,
    isLoading: userDataGoogleIsLoading,
  } = useMutation(authWithGoogleQuery);

  const handleGoogleAuth = () => {
    authenticateWithGoogle();
  };

  const onSubmit: SubmitHandler<ILoginFormValues> = async (data) => {
    setIsLoading(true);
    const formattedData = {
      email: data.email,
      password: data.password,
      rememberMe: data.rememberMe ? true : false,
    };
    try {
      const res = await login(formattedData);
      if (res.access_token) {
        setIsLoading(false);
        toast.success(`Welcome back, User!`);
        setIsAuthenticated(true);
      }
    } catch (e) {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    const urlParams = new URLSearchParams(window.location.search);
    const token = urlParams.get("token");

    if (token) {
      authenticateWithToken(token);
    }
  }, [authenticateWithToken]);

  useEffect(() => {
    if (userGoogle?.url) {
      window.location.href = userGoogle.url;
    }
  }, [userGoogle]);

  useEffect(() => {
    if (isSuccess) {
      navigate("/");
    }
  }, [isSuccess, navigate]);

  return (
    <>
      <Box
        sx={{
          background: "#ffff",
          width: "308px",
          display: "flex",
          height: "400px",
          flexDirection: "column",
          alignItems: "center",
          marginTop: "15px",
        }}
      >
        <Typography
          sx={{
            fontSize: "25px",
            fontWeight: "700",
            color: "#000000",
            userSelect: "none",
            fontFamily: "Inter",
          }}
        >
          Welcome back
        </Typography>

        <Typography
          sx={{
            fontSize: "14px",
            textAlign: "center",
            fontWeight: "500",
            color: "rgba(0, 0, 0, 0.6)",
            userSelect: "none",
            fontFamily: "Inter",
          }}
        >
          Enter your details to access dashboard
        </Typography>

        <form onSubmit={handleSubmit(onSubmit)} className={styles.form}>
          <Box
            sx={{
              display: "flex",
              flexDirection: "column",
            }}
          >
            <Box
              sx={{
                display: "flex",
                flexDirection: "column",
                marginTop: "30px",
              }}
            >
              <Controller
                name="email"
                control={control}
                render={({ field }) => (
                  <CustomTextField
                    {...field}
                    label="Email"
                    name="email"
                    register={register}
                    placeholder="Enter your email"
                    icon={MailOutlineIcon}
                  />
                )}
              />
              {errors.email && (
                <ErrorMessage message={errors.email.message} mr={4} />
              )}
            </Box>

            <Box
              sx={{
                display: "flex",
                flexDirection: "column",
                marginTop: "20px",
                "@media (max-width:768px)": {
                  width: "100%",
                },
              }}
            >
              <CustomPasswordField
                label="Password"
                register={register}
                name="password"
                placeholder="Enter your password"
                icon={KeyIcon}
                showPassword={showPassword}
                setShowPassword={setShowPassword}
              />
              {errors.password && (
                <ErrorMessage message={errors.password.message} />
              )}
            </Box>

            <Box
              sx={{
                marginTop: "15px",
                display: "flex",
                alignContent: "center",
                justifyContent: "space-between",
              }}
            >
              <FormControlLabel
                control={
                  <Checkbox
                    {...register("rememberMe")}
                    defaultChecked
                    name="rememberMe"
                    color="primary"
                    sx={{
                      width: "15px",
                      height: "15px",
                      color: "#E1E1E1",
                      "&.Mui-checked": {
                        color: "#0C0E15",
                      },
                      "& .MuiSvgIcon-root": {
                        width: "20px",
                      },
                      "&.MuiButtonBase-root-MuiCheckbox-root": {
                        padding: "0",
                      },
                      padding: "0",
                    }}
                  />
                }
                label="Remember"
                labelPlacement="end"
                sx={{
                  "& .MuiTypography-root": {
                    color: "rgba(0, 0, 0, 1)",
                    fontSize: "14px",
                    marginTop: "2px",
                    fontWeight: "500",
                    userSelect: "none",
                    fontFamily: "Inter",
                    marginLeft: "8px",
                    marginBottom: "2px",
                  },
                  margin: "0",
                }}
              />

              <Button
                onClick={() => handleFormChange({ type: "forgotPasswordForm" })}
                sx={{
                  color: "#0C0E15",
                  fontFamily: "Inter",
                  fontSize: "14px",
                  fontStyle: "normal",
                  fontWeight: 600,
                  lineHeight: "normal",
                  textTransform: "none",
                  padding: "0",
                  "&:hover": {
                    backgroundColor: "transparent",
                  },
                }}
              >
                Forgot Password
              </Button>
            </Box>

            <Box
              sx={{
                display: "flex",
                marginTop: "8px",
              }}
            ></Box>

            <Button
              sx={{
                marginTop: "26px",
                border: "none",
                backgroundColor: "#0C0E15",
                "&:hover": {
                  backgroundColor: "#0C0E15",
                  border: "none",
                  boxShadow: "none",
                },
                height: "40px",
                borderRadius: "4px",
                color: "rgba(255, 255, 255, 1)",
                fontWeight: "600",
                fontSize: "16px",
                textTransform: "none",
                fontFamily: "Inter",
                boxShadow: "none",
                "&:active": {
                  boxShadow: "none",
                },
                "&:focus": {
                  boxShadow: "none",
                },
              }}
              variant="contained"
              type="submit"
            >
              {isLoading ? (
                <CircularProgress size={24} sx={{ color: "#FFF" }} />
              ) : (
                "Log in"
              )}
            </Button>

            <Button
              onClick={handleGoogleAuth}
              sx={{
                marginTop: "14px",
                border: "1px solid #0C0E15",
                boxShadow: "none",
                backgroundColor: "#0C0E15",
                color: "#fff",
                "&:hover": {
                  backgroundColor: "#0C0E15",
                  border: "none",
                  boxShadow: "none",
                  color: "#fff",
                },
                height: "40px",
                borderRadius: "4px",
                fontWeight: "600",
                fontSize: "16px",
                fontFamily: "Inter",
                textTransform: "none",
                "&:active": {
                  boxShadow: "none",
                },
                "&:focus": {
                  boxShadow: "none",
                },
              }}
              variant="contained"
            >
              {userDataGoogleIsLoading || authenticateWithTokenIsLoading ? (
                <CircularProgress size={24} sx={{ color: "#FFF" }} />
              ) : (
                "Log in with Google"
              )}
            </Button>

            <Box
              sx={{
                display: "flex",
                alignItems: "baseline",
                margin: "15px auto 50px auto",
              }}
            >
              <Typography
                sx={{
                  fontWeight: "500",
                  fontSize: "14px",
                  color: "rgba(0, 0, 0, 1)",
                  fontFamily: "Inter",
                  userSelect: "none",
                }}
              >
                Dont have an account
              </Typography>

              <Button
                sx={{
                  display: "inline",
                  textTransform: "none",
                  padding: "0",
                  marginLeft: "5px",
                  color: "#0C0E15",
                  fontWeight: "600",
                  fontSize: "14px",
                  fontFamily: "Inter",
                  "&:hover": {
                    backgroundColor: "transparent",
                  },
                }}
                onClick={() => handleFormChange({ type: "signUpForm" })}
              >
                Start here for free
              </Button>
            </Box>
          </Box>
        </form>
      </Box>

      {isAuthenticated && <Navigate to={routes.index} />}
    </>
  );
};

export default LoginForm;
