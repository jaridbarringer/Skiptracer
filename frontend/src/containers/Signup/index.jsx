import React, { useRef, useState } from "react";
import { styles } from "./styles";
import {
  Box,
  Button,
  Checkbox,
  Container,
  Divider,
  FormControl,
  FormControlLabel,
  FormLabel,
  IconButton,
  InputAdornment,
  Link,
  Paper,
  Stack,
  Tooltip,
  Typography,
} from "@mui/material";
import { CustomTextField } from "../../components";
import { useForm } from "react-hook-form";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { makePostRequest } from "../../../utils/api";
import { urls } from "../../../utils/urls";
import { useNavigate } from "react-router-dom";
import { useColorScheme } from "@mui/material/styles";
import VisibilityIcon from "@mui/icons-material/Visibility";
import VisibilityOffIcon from "@mui/icons-material/VisibilityOff";
import { SitemarkIcon } from "../../assets/icons/CustomIcons";

const Signup = () => {
  const {
    control,
    formState: { errors },
    handleSubmit,
    watch,
    reset,
  } = useForm({
    mode: "onChange",
    defaultValues: {
      username: "",
      email: "",
      password: "",
      confirmPassword: "",
    },
  });
  const password = useRef({});
  password.current = watch("password", "");
  const [showPassword, setShowPassword] = useState(false);
  const [ConfirmshowPassword, ConfirmsetShowPassword] = useState(false);

  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const handlePasswordToggle = () => {
    setShowPassword(!showPassword);
  };
  const handleConfirmPasswordToggle = () => {
    ConfirmsetShowPassword(!ConfirmshowPassword);
  };

  const onSubmit = async (data) => {
    const { username, email, password, confirmPassword } = data;
    const payload = {
      name: username,
      email,
      password,
      password_confirmation: confirmPassword,
    };

    try {
      setLoading(true);
      const response = await makePostRequest(urls.signup, payload, {}, false);
      if (response.status === 200) {
        navigate("/signin");
        toast.success("Your account has been created", {
          position: "top-right",
          autoClose: 3000,
        });
        setLoading(false);
      } else {
        toast.error(
          response.data?.errors?.message
            ? response.data?.errors?.message
            : "Something went wrong",
          {
            position: "top-right",
            autoClose: 3000,
          }
        );
        setLoading(false);
      }
    } catch (err) {
      console.error(err);
      setLoading(false);
    }
  };

  return (
    <Box sx={styles.mainBox}>
      <Container style={{ maxWidth: "500px" }}>
        <Paper sx={styles.paper} elevation={3}>
          <SitemarkIcon />
          <Typography component="h1" variant="h4" py={2}>
            Sign up
          </Typography>
          <form onSubmit={handleSubmit(onSubmit)}>
            <Stack>
              <FormControl>
                <CustomTextField
                  variant="standard"
                  name="username"
                  rules={{
                    required: "Username is required",
                    validate: {
                      noSpaces: (value) =>
                        !/\s/.test(value) || "No spaces are allowed",
                    },
                  }}
                  placeholder="Enter your username"
                  control={control}
                  helperText={errors.username?.message}
                  sx={{
                    marginTop: "8px",
                  }}
                  isHookForm={true}
                />
              </FormControl>
              <FormControl>
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
                    required: "You must specify your password",
                    validate: {
                      nospace: (value) =>
                        !/\s/.test(value) || "No spaces allowed",
                      minLength: (value) =>
                        value.length >= 8 ||
                        "Password must have at least 8 characters",
                      maxLength: (value) =>
                        value.length <= 16 ||
                        "Password must not exceed 16 characters",
                      lowercase: (value) =>
                        /[a-z]/.test(value) ||
                        "Must include at least one lowercase letter",
                      uppercase: (value) =>
                        /[A-Z]/.test(value) ||
                        "Must include at least one uppercase letter",
                      number: (value) =>
                        /\d/.test(value) || "Must include at least one number",
                      symbol: (value) =>
                        /[!@#$%^&*()]/.test(value) ||
                        "Must include at least one special character",
                    },
                  }}
                  placeholder="Enter your password"
                  helperText={errors.password?.message}
                  control={control}
                  errors={errors}
                  autoComplete="new-password"
                  fullWidth
                  sx={{
                    marginTop: "8px",
                  }}
                  isHookForm={true}
                  InputProps={{
                    endAdornment: (
                      <InputAdornment>
                        <IconButton
                          size="small"
                          onClick={handlePasswordToggle}
                          cursor="pointer"
                        >
                          {showPassword ? (
                            <Tooltip
                              title={
                                <React.Fragment>
                                  <Typography>Hide password</Typography>
                                </React.Fragment>
                              }
                              placement="top"
                            >
                              <VisibilityIcon />
                            </Tooltip>
                          ) : (
                            <Tooltip
                              title={
                                <React.Fragment>
                                  <Typography>Show password</Typography>
                                </React.Fragment>
                              }
                              placement="top"
                            >
                              <VisibilityOffIcon />
                            </Tooltip>
                          )}
                        </IconButton>
                      </InputAdornment>
                    ),
                  }}
                />
              </FormControl>

              <CustomTextField
                variant="standard"
                name="confirmPassword"
                type={ConfirmshowPassword ? "text" : "password"}
                rules={{
                  required: "You must repeat your password",
                  validate: (value) =>
                    value === password.current || "The passwords do not match",
                }}
                placeholder="Re-Type New Password"
                control={control}
                helperText={errors.confirmPassword?.message}
                fullWidth
                sx={{
                  marginTop: "8px",
                }}
                isHookForm={true}
                InputProps={{
                  endAdornment: (
                    <InputAdornment>
                      <IconButton
                        size="small"
                        aria-label="toggle password visibility"
                        onClick={handleConfirmPasswordToggle}
                      >
                        {ConfirmshowPassword ? (
                          <Tooltip
                            title={
                              <React.Fragment>
                                <Typography>Hide password</Typography>
                              </React.Fragment>
                            }
                            placement="top"
                          >
                            <VisibilityIcon />
                          </Tooltip>
                        ) : (
                          <Tooltip
                            title={
                              <React.Fragment>
                                <Typography>Show password</Typography>
                              </React.Fragment>
                            }
                            placement="top"
                          >
                            <VisibilityOffIcon />
                          </Tooltip>
                        )}
                      </IconButton>
                    </InputAdornment>
                  ),
                }}
              />

              <Button
                type="submit"
                fullWidth
                variant="contained"
                disabled={loading}
                sx={{ marginTop: "8px" }}
              >
                {loading ? "Loading ..." : "Sign up"}
              </Button>

              <Typography align="center" pt={1}>
                Already have an account?{" "}
                <span>
                  <Link
                    href="/signin"
                    variant="body2"
                    sx={{ alignSelf: "center" }}
                  >
                    Sign in
                  </Link>
                </span>
              </Typography>
            </Stack>
          </form>
        </Paper>
      </Container>
    </Box>
  );
};

export default Signup;
