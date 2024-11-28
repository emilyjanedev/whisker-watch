import PropTypes from "prop-types";
import { StyledButton } from "../StyledButton/StyledButton";
import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import DialogContentText from "@mui/material/DialogContentText";
import DialogTitle from "@mui/material/DialogTitle";
import { Alert, TextField } from "@mui/material";
import OutlinedInput from "@mui/material/OutlinedInput";
import { useAuth } from "../../contexts/AuthContext";
import { useState } from "react";

function ResetPasswordModal({ open, handleClose }) {
  const { resetPassword } = useAuth();
  const [email, setEmail] = useState("");
  const [message, setMessage] = useState({
    status: "",
    message: "",
  });

  const handleChange = (e) => {
    setEmail(e.target.value);
  };

  const handlePasswordReset = async (e) => {
    e.preventDefault();
    try {
      await resetPassword(email);
      setMessage({
        ...message,
        status: "success",
        message: "Reset email was sent.",
      });

      setTimeout(() => {
        handleClose();
        setMessage({ status: "", message: "" });
        setEmail("");
      }, 2550);
    } catch (error) {
      console.error(error);
      setMessage({
        ...message,
        status: "error",
        message: "Failed to send reset email.",
      });
    }
  };
  return (
    <Dialog
      open={open}
      onClose={handleClose}
      PaperProps={{
        component: "form",
        onSubmit: handlePasswordReset,
        sx: { backgroundImage: "none" },
      }}
    >
      <DialogTitle>Reset password</DialogTitle>
      <DialogContent
        sx={{ display: "flex", flexDirection: "column", gap: 2, width: "100%" }}
      >
        <DialogContentText>
          Enter your account&apos;s email address, and we&apos;ll send you a
          link to reset your password.
        </DialogContentText>
        {message.status && (
          <Alert severity={message.status}>{message.message}</Alert>
        )}
        <TextField
          autoFocus
          required
          margin="dense"
          id="email"
          name="email"
          label="Email address"
          placeholder="Email address"
          type="email"
          value={email}
          onChange={handleChange}
          fullWidth
        />
      </DialogContent>
      <DialogActions sx={{ pb: 3, px: 3 }}>
        <StyledButton
          variant="outlined"
          color="secondary"
          onClick={handleClose}
        >
          Cancel
        </StyledButton>
        <StyledButton disableElevation variant="contained" type="submit">
          Continue
        </StyledButton>
      </DialogActions>
    </Dialog>
  );
}

ResetPasswordModal.propTypes = {
  handleClose: PropTypes.func.isRequired,
  open: PropTypes.bool.isRequired,
};

export default ResetPasswordModal;
