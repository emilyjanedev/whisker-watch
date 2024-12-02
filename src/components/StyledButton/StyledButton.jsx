import { styled } from "@mui/system";
import Button from "@mui/material/Button";

const StyledButton = styled(Button)(() => ({
  width: "100%",
  borderRadius: "1.25rem",
  textTransform: "capitalize",
}));

export default StyledButton;
