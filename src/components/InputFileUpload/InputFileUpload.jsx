import PetsIcon from "@mui/icons-material/Pets";
import { styled } from "@mui/material/styles";
import { FormHelperText, FormControl } from "@mui/material";
import PropTypes from "prop-types";
import StyledButton from "../StyledButton/StyledButton";

const VisuallyHiddenInput = styled("input")({
  clip: "rect(0 0 0 0)",
  clipPath: "inset(50%)",
  height: 1,
  overflow: "hidden",
  position: "absolute",
  bottom: 0,
  left: 0,
  whiteSpace: "nowrap",
  width: 1,
});

function InputFileUpload({ name, handleChange, errors }) {
  return (
    <FormControl error={errors ? true : false} sx={{ width: "100%" }}>
      <StyledButton
        size="large"
        component="label"
        role={undefined}
        variant="contained"
        tabIndex={-1}
        startIcon={<PetsIcon />}
        disableElevation
        sx={{ borderRadius: "20px", textTransform: "capitalize" }}
      >
        Upload Pet Image
        <VisuallyHiddenInput
          type="file"
          accept="image/*"
          name={name}
          onChange={handleChange}
          single
        />
      </StyledButton>
      <FormHelperText>{errors || " "}</FormHelperText>
    </FormControl>
  );
}

export default InputFileUpload;

InputFileUpload.propTypes = {
  name: PropTypes.string.isRequired,
  handleChange: PropTypes.func.isRequired,
  errors: PropTypes.string,
};
