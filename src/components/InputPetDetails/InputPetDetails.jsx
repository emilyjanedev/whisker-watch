import PropTypes from "prop-types";
import {
  FormControl,
  InputLabel,
  Select,
  MenuItem,
  FormHelperText,
} from "@mui/material";

function InputPetDetails({
  options,
  inputName,
  label,
  handleChange,
  value,
  errors,
}) {
  return (
    <FormControl
      fullWidth
      error={errors ? true : false}
      sx={{ width: { sm: "32%" } }}
    >
      <InputLabel id={inputName} color="secondary">
        {label}
      </InputLabel>
      <Select
        labelId={inputName}
        name={inputName}
        value={value}
        label={label}
        color="secondary"
        onChange={handleChange}
      >
        {options.map((option) => (
          <MenuItem key={option} value={option}>
            {option}
          </MenuItem>
        ))}
      </Select>
      <FormHelperText>{errors || " "}</FormHelperText>
    </FormControl>
  );
}

export default InputPetDetails;

InputPetDetails.propTypes = {
  options: PropTypes.array.isRequired,
  inputName: PropTypes.string.isRequired,
  label: PropTypes.string.isRequired,
  handleChange: PropTypes.func.isRequired,
  value: PropTypes.string.isRequired,
  errors: PropTypes.string,
};
