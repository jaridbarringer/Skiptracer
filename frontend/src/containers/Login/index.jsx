import React, { useState } from "react";
import { MuiCard, SignInContainer, styles } from "./styles";
import {
  Box,
  Button,
  Card,
  Checkbox,
  Container,
  Divider,
  FormControl,
  FormControlLabel,
  FormLabel,
  Link,
  Paper,
  Stack,
  TextField,
  Typography,
} from "@mui/material";
import {
  FacebookIcon,
  GoogleIcon,
  SitemarkIcon,
} from "../../assets/icons/CustomIcons";
import ForgotPassword from "./ForgotPassword";
import { CustomTextField } from "../../components";
import { useForm } from "react-hook-form";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { makePostRequest } from "../../../utils/api";
import { urls } from "../../../utils/urls";
import { useNavigate } from "react-router-dom";

const Login = () => {
  const {
    control,
    formState: { errors },
    handleSubmit,
    reset,
    setValue,
    watch,
    getValues,
  } = useForm({
    mode: "onChange",
    defaultValues: {
      email: "",
      password: "",
    },
  });
  const [showPassword, setShowPassword] = useState(false);
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const handlePasswordToggle = () => {
    setShowPassword(!showPassword);
  };

  const onSubmit = async (data) => {
    const { email, password } = data;
    const payload = {
      email,
      password,
    };

    try {
      setLoading(true);
      const response = await makePostRequest(urls.signin, payload, {}, false);
      console.log("response.data", response.data);
      if (response.status === 200) {
        // localStorage.setItem("user", JSON.stringify(response.data));
        navigate("/");
        toast.success("You have successfully logged in", {
          position: "top-right",
          autoClose: 5000,
        });
        dispatch(loginSuccess(response.data));
        setLoading(false);
      } else {
        toast.error(
          response.data?.errors?.message
            ? response.data?.errors?.message
            : "Something went wrong",
          {
            position: "top-right",
            autoClose: 5000,
          }
        );
        setLoading(false);
      }
    } catch (err) {
      console.error(err);
      setLoading(false);
    }
  };
  console.log("errors", errors);
  return (
    <Box sx={styles.mainBox}>
      <Container style={{ maxWidth: "500px" }}>
        <Paper sx={styles.paper} elevation={3}>
          <SitemarkIcon />
          <Typography component="h1" variant="h4" py={2}>
            Sign in
          </Typography>
          <form onSubmit={handleSubmit(onSubmit)}>
            <Stack>
              <FormControl>
                <FormLabel htmlFor="email">Email</FormLabel>

                <CustomTextField
                  variant="standard"
                  name="email"
                  rules={{
                    required: "Email is required",
                    pattern: {
                      value: /^[^\s@]+@[^\s@]+\.[^\s@]+$/,
                      message:
                        "Invalid email format, '@' is required and no spaces are allowed",
                    },
                  }}
                  placeholder="Enter your email"
                  control={control}
                  helperText={errors.email?.message}
                  fullWidth
                  sx={{
                    marginTop: "8px",
                  }}
                  isHookForm={true}
                />
              </FormControl>
              <FormControl>
                <CustomTextField
                  variant="standard"
                  name="password"
                  type={showPassword ? "text" : "password"}
                  rules={{
                    required: "Password is required",
                    validate: {
                      noSpaces: (value) =>
                        !/\s/.test(value) || "No spaces are allowed",
                    },
                  }}
                  sx={{
                    marginTop: "8px",
                  }}
                  placeholder="Enter your password"
                  control={control}
                  helperText={errors.password?.message}
                  isHookForm={true}
                />
                <Stack direction="row" justifyContent="end" pt={1}>
                  <Link
                    component="button"
                    //   onClick={handleClickOpen}
                    variant="body2"
                    sx={{ alignSelf: "baseline" }}
                  >
                    Forgot your password?
                  </Link>
                </Stack>
              </FormControl>
              <FormControlLabel
                control={<Checkbox value="remember" color="primary" />}
                label="Remember me"
                sx={{ paddingTop: "8px", paddingBottom: "8px" }}
              />
              {/* <ForgotPassword
            open={open} handleClose={handleClose}
            /> */}
              <Button
                type="submit"
                fullWidth
                variant="contained"
                disabled={loading}
              >
                {loading ? "Loading ..." : "Sign in"}
              </Button>

              <Typography align="center" pt={1}>
                Don't have an account?{" "}
                <span>
                  <Link
                    href="/material-ui/getting-started/templates/sign-in/"
                    variant="body2"
                    sx={{ alignSelf: "center" }}
                  >
                    Sign up
                  </Link>
                </span>
              </Typography>
            </Stack>
          </form>
          <Divider>or</Divider>
          <Stack spacing={2} pt={1}>
            <Button
              type="submit"
              fullWidth
              variant="outlined"
              startIcon={<GoogleIcon />}
            >
              Sign in with Google
            </Button>
            <Button
              type="submit"
              fullWidth
              variant="outlined"
              startIcon={<FacebookIcon />}
            >
              Sign in with Facebook
            </Button>
          </Stack>
        </Paper>
      </Container>
    </Box>
  );
};

export default Login;
