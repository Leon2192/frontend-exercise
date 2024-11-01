import React from "react";
import TextField from "@mui/material/TextField";
import { Box } from "@mui/material"; 

interface TextInputProps {
  label: string;
  placeholder: string;
  value: string;
  onChange: (event: React.ChangeEvent<HTMLInputElement>) => void;
  required?: boolean;
  maxLength?: number;
  name?: string;
}

const TextInput: React.FC<TextInputProps> = ({
  label,
  placeholder,
  value,
  onChange,
  required,
  maxLength,
}) => (
  <Box sx={{ mb: 2 }}>
    <label style={{ marginBottom: "4px", display: "block" }}>{label}</label>
    <TextField
      placeholder={placeholder}
      value={value}
      onChange={onChange}
      required={required}
      inputProps={{ maxLength }}
      variant="standard"
      fullWidth
      sx={{
        borderBottom: "1px solid gray",
        "& .MuiInputBase-root:before": {
          borderBottom: "1px solid gray",
        },
        "& .MuiInputBase-root:hover:before": {
          borderBottom: "2px solid gray",
        },
        "& .MuiInputBase-root:after": {
          borderBottom: "2px solid gray",
        },
      }}
    />
  </Box>
);

export default TextInput;
