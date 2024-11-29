import { useState, useEffect } from "react";
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
import { GoogleIcon } from "../LoginPage/GoogleIcon";
import StyledButton from "../../components/StyledButton/StyledButton";
import { useAuth } from "../../contexts/AuthContext";
import { validateForm } from "../../utils/validateForm";
import * as backend from "../../api/backend.js";
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

function SignUpUpdatePage({ action }) {
  const [formData, setFormData] = useState({
    user_name: "",
    user_email: "",
    password: "",
    confirm_password: "",
  });
  const [errors, setErrors] = useState({});
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState({
    status: "",
    message: "",
  });
  const { signup, loginWithGoogle } = useAuth();
  const navigate = useNavigate();

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({ ...prevData, [name]: value }));
  };

  useEffect(() => {
    const loadUserData = async () => {
      console.log("Load User Data");
    };
    action === "update" && loadUserData();
  }, [action]);

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

  const handleSubmit = async (event) => {
    event.preventDefault();
    setMessage({
      status: "",
      message: "",
    });
    const newErrors = validateForm(formData);
    setErrors(newErrors);

    if (Object.keys(newErrors).length === 0) {
      if (formData.confirm_password !== formData.password) {
        setErrors({ ...errors, confirm_password: "Passwords do not match" });
        return;
      }
      try {
        setLoading(true);
        if (action === "signup") {
          const { user } = await signup(formData.user_email, formData.password);
          const userId = user.uid;

          const backendUserData = {
            id: userId,
            user_name: formData.user_name,
            user_email: formData.user_email,
          };
          const newUser = await backend.addUser(backendUserData);

          if (userId && newUser.id) {
            setMessage({
              ...message,
              status: "success",
              message: "User account created!",
            });
          }
        } else {
          console.log("Update Profile");
          //profile update logic
        }
      } catch (error) {
        setMessage({
          ...message,
          status: "error",
          message:
            action === "signup"
              ? "Could not create user account."
              : "Could not update user account.",
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
            {action === "signup" ? "Sign up" : "Update Profile"}
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
              <FormLabel htmlFor="email">Name</FormLabel>
              <TextField
                value={formData.user_name}
                onChange={handleChange}
                error={errors.user_name ? true : false}
                helperText={errors.user_name}
                id="user_name"
                type="text"
                name="user_name"
                placeholder="Jane Doe"
                autoFocus
                required
                fullWidth
                variant="outlined"
                color="secondary"
              />
            </FormControl>
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
            <FormControl>
              <FormLabel htmlFor="password">Confirm Password</FormLabel>
              <TextField
                value={formData.confirm_password}
                onChange={handleChange}
                error={errors.confirm_password ? true : false}
                helperText={errors.confirm_password}
                name="confirm_password"
                placeholder="••••••"
                type="password"
                id="confirm_password"
                autoFocus
                required
                fullWidth
                variant="outlined"
                color="secondary"
              />
            </FormControl>
            <StyledButton
              type="submit"
              fullWidth
              disableElevation
              variant="contained"
              disabled={loading}
            >
              {action === "signup" ? "Sign up" : "Update"}
            </StyledButton>
          </Box>
          {action === "signup" && (
            <>
              <Divider>or</Divider>
              <Box sx={{ display: "flex", flexDirection: "column", gap: 2 }}>
                <StyledButton
                  fullWidth
                  variant="outlined"
                  onClick={handleGoogleLogin}
                  startIcon={<GoogleIcon />}
                  color="secondary"
                >
                  Sign up with Google
                </StyledButton>

                <Typography sx={{ textAlign: "center" }}>
                  Already have an account?{" "}
                  <Link
                    component={RouterLink}
                    to="/login"
                    variant="body2"
                    sx={{ alignSelf: "center" }}
                    color="secondary"
                  >
                    Login
                  </Link>
                </Typography>
              </Box>
            </>
          )}
        </Card>
      </SignInContainer>
    </>
  );
}

export default SignUpUpdatePage;

SignUpUpdatePage.propTypes = {
  action: PropTypes.string.isRequired,
};
