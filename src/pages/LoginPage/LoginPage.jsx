import { useState } from "react";
import { Link as RouterLink, useNavigate } from "react-router-dom";
import {
  TextField,
  Typography,
  Stack,
  FormControl,
  Link,
  FormLabel,
  Divider,
  Box,
  styled,
  Alert,
} from "@mui/material";
import MuiCard from "@mui/material/Card";
import { GoogleIcon, FacebookIcon } from "./CustomIcons";
import { StyledButton } from "../../components/StyledButton/StyledButton";
import { useAuth } from "../../contexts/AuthContext";

import PropTypes from "prop-types";

const Card = styled(MuiCard)(({ theme }) => ({
  display: "flex",
  flexDirection: "column",
  alignSelf: "center",
  width: "100%",
  padding: theme.spacing(4),
  gap: theme.spacing(2),
  margin: "auto",
  [theme.breakpoints.up("sm")]: {
    maxWidth: "450px",
  },
  boxShadow:
    "hsla(220, 30%, 5%, 0.05) 0px 5px 15px 0px, hsla(220, 25%, 10%, 0.05) 0px 15px 35px -5px",
  ...theme.applyStyles("dark", {
    boxShadow:
      "hsla(220, 30%, 5%, 0.5) 0px 5px 15px 0px, hsla(220, 25%, 10%, 0.08) 0px 15px 35px -5px",
  }),
}));

const SignInContainer = styled(Stack)(({ theme }) => ({
  minHeight: "100%",
  padding: theme.spacing(2),
  [theme.breakpoints.up("sm")]: {
    padding: theme.spacing(4),
  },
  "&::before": {
    content: '""',
    display: "block",
    position: "absolute",
    zIndex: -1,
    inset: 0,
  },
}));

function LoginPage({ action }) {
  const [emailError, setEmailError] = useState(false);
  const [emailErrorMessage, setEmailErrorMessage] = useState("");
  const [passwordError, setPasswordError] = useState(false);
  const [passwordErrorMessage, setPasswordErrorMessage] = useState("");
  const [passwordConfirmError, setPasswordConfirmError] = useState(false);
  const [passwordConfirmErrorMessage, setPasswordConfirmErrorMessage] =
    useState("");
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState({
    status: "",
    message: "",
  });
  const { signup, login, currentUser } = useAuth();
  const navigate = useNavigate();

  const handleSubmit = async (event) => {
    event.preventDefault();
    setMessage({
      status: "",
      message: "",
    });

    if (emailError || passwordError) {
      return;
    }

    if (validateInputs()) {
      const data = new FormData(event.currentTarget);
      console.log({
        email: data.get("email"),
        password: data.get("password"),
        passwordConfirm: data.get("confirm-password"),
      });

      try {
        setLoading(true);
        if (action === "signup") {
          const { user } = await signup(
            data.get("email"),
            data.get("password")
          );
          const userData = user._delegate;
          console.log(userData);

          if (userData) {
            setMessage({
              ...message,
              status: "success",
              message: "User account created!",
            });
          }
        } else {
          const { user } = await login(data.get("email"), data.get("password"));
          const userData = user._delegate;
          console.log(userData);
          navigate("/");
        }
      } catch (error) {
        setMessage({
          ...message,
          status: "error",
          message:
            action === "login"
              ? "Could not login."
              : "Could not create user account.",
        });
        console.error(error);
      }
      setLoading(false);
    }
  };

  const validateInputs = () => {
    const email = document.getElementById("email");
    const password = document.getElementById("password");
    const passwordConfirm = document.getElementById("confirm-password");

    let isValid = true;

    if (!email.value || !/\S+@\S+\.\S+/.test(email.value)) {
      setEmailError(true);
      setEmailErrorMessage("Please enter a valid email address.");
      isValid = false;
    } else {
      setEmailError(false);
      setEmailErrorMessage("");
    }

    if (!password.value || password.value.length < 6) {
      setPasswordError(true);
      setPasswordErrorMessage("Password must be at least 6 characters long.");
      isValid = false;
    } else {
      setPasswordError(false);
      setPasswordErrorMessage("");
    }

    if (
      passwordConfirm &&
      (!passwordConfirm.value || passwordConfirm.value !== password.value)
    ) {
      setPasswordConfirmError(true);
      setPasswordConfirmErrorMessage("Passwords do not match.");
      isValid = false;
    } else {
      setPasswordConfirmError(false);
      setPasswordErrorMessage("");
    }
    console.log(isValid);
    return isValid;
  };

  return (
    <>
      <SignInContainer
        direction="column"
        justifyContent="space-between"
        sx={{ padding: 0 }}
      >
        <Card
          variant="outlined"
          sx={{
            width: { xs: "100vw" },
            height: { xs: "100vh", sm: "auto" },
            m: { sm: 4 },
            borderRadius: { sm: "20px" },
          }}
        >
          <Typography
            component="h1"
            variant="h4"
            sx={{
              width: "100%",
              fontSize: "clamp(2rem, 10vw, 2.15rem)",
              fontWeight: "medium",
            }}
          >
            {action === "login" ? "Sign in" : "Sign up"}
          </Typography>
          {message.status && (
            <Alert severity={message.status}>{message.message}</Alert>
          )}
          {currentUser && currentUser.email}
          <Box
            component="form"
            onSubmit={handleSubmit}
            noValidate
            sx={{
              display: "flex",
              flexDirection: "column",
              width: "100%",
              gap: 2,
            }}
          >
            <FormControl>
              <FormLabel htmlFor="email">Email</FormLabel>
              <TextField
                error={emailError}
                helperText={emailErrorMessage}
                id="email"
                type="email"
                name="email"
                placeholder="your@email.com"
                autoComplete="email"
                autoFocus
                required
                fullWidth
                variant="outlined"
                color={emailError ? "error" : "primary"}
              />
            </FormControl>
            <FormControl>
              <FormLabel htmlFor="password">Password</FormLabel>
              <TextField
                error={passwordError}
                helperText={passwordErrorMessage}
                name="password"
                placeholder="••••••"
                type="password"
                id="password"
                autoComplete="current-password"
                autoFocus
                required
                fullWidth
                variant="outlined"
                color={passwordError ? "error" : "primary"}
              />
            </FormControl>
            {action === "signup" && (
              <FormControl>
                <FormLabel htmlFor="password">Confirm Password</FormLabel>
                <TextField
                  error={passwordConfirmError}
                  helperText={passwordConfirmErrorMessage}
                  name="confirm-password"
                  placeholder="••••••"
                  type="password"
                  id="confirm-password"
                  autoFocus
                  required
                  fullWidth
                  variant="outlined"
                  color={passwordConfirmError ? "error" : "primary"}
                />
              </FormControl>
            )}
            <StyledButton
              type="submit"
              fullWidth
              disableElevation
              variant="contained"
              disabled={loading}
              onClick={validateInputs}
            >
              {action === "login" ? "Sign in" : "Sign up"}
            </StyledButton>
          </Box>
          <Divider>or</Divider>
          <Box sx={{ display: "flex", flexDirection: "column", gap: 2 }}>
            <StyledButton
              fullWidth
              variant="outlined"
              onClick={() => alert("Sign in with Google")}
              startIcon={<GoogleIcon />}
              color="secondary"
            >
              {action === "login" ? "Sign in" : "Sign up"} with Google
            </StyledButton>
            <StyledButton
              fullWidth
              variant="outlined"
              onClick={() => alert("Sign in with Facebook")}
              startIcon={<FacebookIcon />}
              color="secondary"
            >
              {action === "login" ? "Sign in" : "Sign up"} with Facebook
            </StyledButton>

            <Typography sx={{ textAlign: "center" }}>
              {action === "login"
                ? "Don&apos;t have an account? "
                : "Already have an account? "}
              <Link
                component={RouterLink}
                to={action === "login" ? "/signup" : "/login"}
                variant="body2"
                sx={{ alignSelf: "center" }}
                color="secondary"
              >
                {action === "login" ? "Sign up" : "Login"}
              </Link>
            </Typography>
          </Box>
        </Card>
      </SignInContainer>
    </>
  );
}

export default LoginPage;

LoginPage.propTypes = {
  action: PropTypes.string.isRequired,
};
