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
import { GoogleIcon } from "./GoogleIcon";
import StyledButton from "../../components/StyledButton/StyledButton";
import { useAuth } from "../../contexts/AuthContext";
import { validateForm } from "../../utils/validateForm";
import ResetPasswordModal from "../../components/ResetPasswordModal/ResetPasswordModal";

const Card = styled(MuiCard)(({ theme }) => ({
  display: "flex",
  flexDirection: "column",
  alignSelf: "center",
  width: "100%",
  padding: theme.spacing(4),
  gap: theme.spacing(2),
  margin: "auto",
  [theme.breakpoints.up("sm")]: {
    maxWidth: "28.125rem",
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

function LoginPage() {
  const [formData, setFormData] = useState({
    user_email: "",
    password: "",
  });
  const [errors, setErrors] = useState({});
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState({
    status: "",
    message: "",
  });
  const [open, setOpen] = useState(false);
  const { login, loginWithGoogle } = useAuth();
  const navigate = useNavigate();

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({ ...prevData, [name]: value }));
  };

  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  const handleGoogleLogin = async () => {
    setMessage({
      status: "",
      message: "",
    });
    try {
      await loginWithGoogle();
      navigate("/");
    } catch (error) {
      console.error(error);
      setMessage({
        ...message,
        status: "error",
        message: "Could not sign in with Google.",
      });
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setMessage({
      status: "",
      message: "",
    });
    const newErrors = validateForm(formData);
    setErrors(newErrors);

    if (Object.keys(newErrors).length === 0) {
      try {
        setLoading(true);
        await login(formData.user_email, formData.password);
        navigate("/");
      } catch (error) {
        setMessage({
          ...message,
          status: "error",
          message: "Could not login.",
        });
        console.error(error);
      }
      setLoading(false);
    }
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
            Sign In
          </Typography>
          {message.status && (
            <Alert severity={message.status}>{message.message}</Alert>
          )}
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
                value={formData.user_email}
                onChange={handleChange}
                error={errors.user_email ? true : false}
                helperText={errors.user_email}
                id="user_email"
                type="email"
                name="user_email"
                placeholder="your@email.com"
                autoComplete="email"
                autoFocus
                required
                fullWidth
                variant="outlined"
                color="secondary"
              />
            </FormControl>
            <FormControl>
              <FormLabel htmlFor="password">Password</FormLabel>
              <TextField
                value={formData.password}
                onChange={handleChange}
                error={errors.password ? true : false}
                helperText={errors.password}
                name="password"
                placeholder="••••••"
                type="password"
                id="password"
                autoComplete="current-password"
                autoFocus
                required
                fullWidth
                variant="outlined"
                color="secondary"
              />
            </FormControl>
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
            <StyledButton
              type="submit"
              fullWidth
              disableElevation
              variant="contained"
              disabled={loading}
            >
              Sign in
            </StyledButton>
          </Box>
          <ResetPasswordModal open={open} handleClose={handleClose} />

          <Divider>or</Divider>
          <Box sx={{ display: "flex", flexDirection: "column", gap: 2 }}>
            <StyledButton
              fullWidth
              variant="outlined"
              onClick={handleGoogleLogin}
              startIcon={<GoogleIcon />}
              color="secondary"
            >
              Sign in with Google
            </StyledButton>
            <Typography sx={{ textAlign: "center" }}>
              Don&apos;t have an account?{" "}
              <Link
                component={RouterLink}
                to="/signup"
                variant="body2"
                sx={{ alignSelf: "center" }}
                color="secondary"
              >
                Sign up
              </Link>
            </Typography>
          </Box>
        </Card>
      </SignInContainer>
    </>
  );
}

export default LoginPage;
