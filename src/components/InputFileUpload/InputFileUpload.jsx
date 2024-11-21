import PetsIcon from "@mui/icons-material/Pets";
import { styled } from "@mui/material/styles";
import { Button, FormHelperText, FormControl } from "@mui/material";

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
    <FormControl error={errors ? true : false}>
      <Button
        component="label"
        role={undefined}
        variant="contained"
        tabIndex={-1}
        startIcon={<PetsIcon />}
        disableElevation
      >
        Upload Pet Image
        <VisuallyHiddenInput
          type="file"
          accept="image/*"
          name={name}
          onChange={handleChange}
          single
        />
      </Button>
      <FormHelperText>{errors}</FormHelperText>
    </FormControl>
  );
}

export default InputFileUpload;
