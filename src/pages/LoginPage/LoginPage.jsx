import { useState } from "react";
import { Link as RouterLink } from "react-router-dom";
import {
  TextField,
  Typography,
  Stack,
  FormControl,
  Link,
  FormLabel,
  Divider,
  FormControlLabel,
  CssBaseline,
  Checkbox,
  Box,
  styled,
} from "@mui/material";
import MuiCard from "@mui/material/Card";
import PasswordModal from "../../components/PasswordModal/PasswordModal";
import { GoogleIcon, FacebookIcon } from "./CustomIcons";
import { StyledButton } from "../../components/StyledButton/StyledButton";
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
  height: "calc((1 - var(--template-frame-height, 0)) * 100dvh)",
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
  const [open, setOpen] = useState(false);

  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  const handleSubmit = (event) => {
    if (emailError || passwordError) {
      event.preventDefault();
      return;
    }
    const data = new FormData(event.currentTarget);
    console.log({
      email: data.get("email"),
      password: data.get("password"),
    });
  };

  const validateInputs = () => {
    const email = document.getElementById("email");
    const password = document.getElementById("password");

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

    return isValid;
  };

  return (
    <>
      <CssBaseline />
      <SignInContainer
        direction="column"
        justifyContent="space-between"
        sx={{ padding: 0, height: { sm: "90vh" } }}
      >
        <Card
          variant="outlined"
          sx={{
            width: { xs: "100vw" },
            height: { xs: "100vh", sm: "auto" },
            m: { sm: 4 },
          }}
        >
          <Typography
            component="h1"
            variant="h4"
            sx={{ width: "100%", fontSize: "clamp(2rem, 10vw, 2.15rem)" }}
          >
            {action === "login" ? "Sign in" : "Sign up"}
          </Typography>
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
                  error={passwordError}
                  helperText={passwordErrorMessage}
                  name="confirm_password"
                  placeholder="••••••"
                  type="password"
                  id="confirm_password"
                  autoFocus
                  required
                  fullWidth
                  variant="outlined"
                  color={passwordError ? "error" : "primary"}
                />
              </FormControl>
            )}
            <FormControlLabel
              control={<Checkbox value="remember" color="primary" />}
              label="Remember me"
            />
            <PasswordModal open={open} handleClose={handleClose} />
            <StyledButton
              type="submit"
              fullWidth
              disableElevation
              variant="contained"
              onClick={validateInputs}
            >
              {action === "login" ? "Sign in" : "Sign up"}
            </StyledButton>
            {action === "login" && (
              <Link
                component="button"
                type="button"
                onClick={handleClickOpen}
                variant="body2"
                sx={{ alignSelf: "center" }}
                color="secondary"
              >
                Forgot your password?
              </Link>
            )}
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
            {action === "login" && (
              <Typography sx={{ textAlign: "center" }}>
                Don&apos;t have an account?{" "}
                <Link
                  component={RouterLink}
                  to="/sign-up"
                  variant="body2"
                  sx={{ alignSelf: "center" }}
                  color="secondary"
                >
                  Sign up
                </Link>
              </Typography>
            )}
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
