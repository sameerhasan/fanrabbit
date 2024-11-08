import React, { useEffect, useState } from "react";
import { useMutation } from "react-query";
import { useNavigate } from "react-router-dom";
import * as Yup from "yup";
import { useForm, SubmitHandler, Controller } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import { Navigate } from "react-router";
import { toast } from "react-toastify";

import { Box, Button, CircularProgress, Typography } from "@mui/material";

import {
  CustomPasswordField,
  ErrorMessage,
  CustomTextField,
} from "../../common";

import { IForm, IRegistrationFormValues } from "../Auth.interfaces";

import { useAuth } from "../../../context/Auth";

import routes from "../../../routes";

import api from "../../../services/apiService";

import { localStorageManager } from "../../../services";

import { REFRESH_TOKEN, TOKEN } from "../../../constants";

import styles from "./SignUpForm.module.css";

import KeyIcon from "@mui/icons-material/Key";

interface SignUpForm {
  handleFormChange: (type: IForm) => void;
}

const SignUpForm: React.FC<SignUpForm> = ({ handleFormChange }) => {
  const validationSchema = Yup.object().shape({
    first_name: Yup.string().required("First Name is required"),
    last_name: Yup.string().required("Last Name is required"),
    email: Yup.string().email("Invalid email").required("Email is required"),
    password: Yup.string()
      .required("Password is required")
      .min(4, "Password must be at least 4 characters"),
    confirm_password: Yup.string()
      .required("Confirm password is required")
      .oneOf([Yup.ref("password")], "Password must match"),
  });

  const navigate = useNavigate();

  const [showPassword, setShowPassword] = useState<boolean>(false);
  const [showConfirmPassword, setShowConfirmPassword] =
    useState<boolean>(false);
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [isAuthenticated, setIsAuthenticated] = useState<boolean>(false);

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
  } = useForm<IRegistrationFormValues>({
    resolver: yupResolver(validationSchema),
  });

  const { signUp } = useAuth();

  const authWithGoogleQuery = () =>
    api.get(routes.authWithGoogle).then((res) => res.data);

  const {
    mutate: authenticateWithGoogle,
    data: userGoogle,
    isLoading: userDataGoogleIsLoading,
  } = useMutation(authWithGoogleQuery);

  const handleGoogleAuth = () => {
    authenticateWithGoogle();
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

  const onSubmit: SubmitHandler<IRegistrationFormValues> = async (data) => {
    setIsLoading(true);

    const formattedData = {
      first_name: data.first_name,
      last_name: data.last_name,
      email: data.email,
      password: data.password,
    };
    try {
      const res = await signUp(formattedData);
      if (res.access_token) {
        setIsLoading(false);
        toast.success(`Welcome back, User!`);
        setIsAuthenticated(true);
      }
    } catch (e) {
      setIsLoading(false);
    }
  };

  return (
    <>
      <Box
        sx={{
          background: "#ffff",
          width: "380px",
          marginTop: "32px",
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          border: "1px solid lightgray",
          padding: "16px",
        }}
      >
        <Typography
          sx={{
            fontSize: "25px",
            fontWeight: "700",
            color: "#000000",
            fontFamily: "Inter",
            userSelect: "none",
            marginTop: "15px",
          }}
        >
          FanRabbit is Free Forever
        </Typography>

        <Typography
          sx={{
            fontSize: "14px",
            fontWeight: "500",
            textAlign: "center",
            color: "#000000",
            fontFamily: "Inter",
            userSelect: "none",
          }}
        >
          No credit card required. Cancel anytime.
        </Typography>

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
            width: "100%",
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
            "Sign up with Google"
          )}
        </Button>

        <Typography sx={{ marginTop: "24px", fontSize: "12px" }}>
          Lorem ipsum, dolor sit amet consectetur adipisicing elit. Architecto,
          blanditiis!
        </Typography>

        <form onSubmit={handleSubmit(onSubmit)} className={styles.form}>
          <Box
            sx={{
              marginTop: "24px",
              display: "flex",
              flexDirection: "column",
            }}
          >
            <Box
              sx={{
                display: "flex",
                alignItems: "center",
                justifyContent: "space-between",
              }}
            >
              <Box
                sx={{
                  display: "flex",
                  flexDirection: "column",
                  width: "157px",
                }}
              >
                <Controller
                  name="first_name"
                  control={control}
                  render={({ field }) => (
                    <CustomTextField
                      {...field}
                      label="First_name"
                      name="first_name"
                      register={register}
                      placeholder="First name"
                    />
                  )}
                />
                {errors.first_name && (
                  <ErrorMessage message={errors.first_name.message} mr={4} />
                )}
              </Box>

              <Box
                sx={{
                  display: "flex",
                  flexDirection: "column",
                  width: "157px",
                }}
              >
                <Controller
                  name="last_name"
                  control={control}
                  render={({ field }) => (
                    <CustomTextField
                      {...field}
                      label="Surname"
                      name="last_name"
                      register={register}
                      placeholder="Surname"
                    />
                  )}
                />
                {errors.last_name && (
                  <ErrorMessage message={errors.last_name.message} mr={4} />
                )}
              </Box>
            </Box>

            <Box
              sx={{
                display: "flex",
                flexDirection: "column",
                marginTop: "12px",
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
                marginTop: "12px",
              }}
            >
              <CustomPasswordField
                label="Password"
                register={register}
                name="password"
                icon={KeyIcon}
                placeholder="Enter your password"
                showPassword={showPassword}
                setShowPassword={setShowPassword}
              />
              {errors.password && (
                <ErrorMessage message={errors.password.message} mr={4} />
              )}
            </Box>

            <Box
              sx={{
                display: "flex",
                flexDirection: "column",
                marginTop: "12px",
              }}
            >
              <CustomPasswordField
                label="Repeat password"
                register={register}
                name="confirm_password"
                icon={KeyIcon}
                placeholder="Repeat your password"
                showPassword={showConfirmPassword}
                setShowPassword={setShowConfirmPassword}
              />
              {errors.confirm_password && (
                <ErrorMessage message={errors.confirm_password.message} />
              )}
            </Box>

            <Box
              sx={{
                display: "flex",
                marginTop: "8px",
                flexWrap: "wrap",
              }}
            ></Box>

            <Button
              sx={{
                marginTop: "14px",
                border: "none",
                boxShadow: "none",
                backgroundColor: "#0C0E15",
                "&:hover": {
                  backgroundColor: "#0C0E15",
                  border: "none",
                  boxShadow: "none",
                },
                height: "40px",
                color: "#FFFFFF",
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
              type="submit"
            >
              {isLoading ? (
                <CircularProgress size={24} sx={{ color: "#FFF" }} />
              ) : (
                "Start for free"
              )}
            </Button>

            <Box
              sx={{
                display: "flex",
                alignItems: "center",
                margin: "12px auto 12px auto",
              }}
            >
              <Typography
                sx={{
                  fontWeight: "500",
                  fontSize: "14px",
                  color: "#000000",
                  fontFamily: "Inter",
                  userSelect: "none",
                }}
              >
                Already have an account
              </Typography>

              <Button
                sx={{
                  display: "inline",
                  textTransform: "none",

                  fontSize: "14px",
                  fontFamily: "Inter",
                  color: "#0C0E15",
                  fontWeight: "600",
                  "&:hover": {
                    backgroundColor: "transparent",
                  },
                }}
                onClick={() => handleFormChange({ type: "loginForm" })}
              >
                Log in here
              </Button>
            </Box>

            <Typography sx={{ fontSize: "8px" }}>
              Lorem ipsum dolor sit amet consectetur adipisicing elit. Quos illo
              harum officiis eos nihil temporibus, corporis quisquam saepe fugit
              ab.
            </Typography>
          </Box>
        </form>
      </Box>
      {isAuthenticated && <Navigate to={routes.index} />}
    </>
  );
};

export default SignUpForm;
