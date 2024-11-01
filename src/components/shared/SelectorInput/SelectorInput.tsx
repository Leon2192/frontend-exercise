import React from "react";
import { Box } from "@mui/material";
import {
  Select,
  MenuItem,
  InputBase,
  styled,
  SelectChangeEvent,
} from "@mui/material";

interface SelectorInputProps {
  label: string;
  value: string;
  onChange: (event: SelectChangeEvent<unknown>) => void;
  options: { id: string; name: string }[];
  required?: boolean;
}

const StyledSelect = styled(Select)({
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
  "& .MuiSelect-icon": {
    right: "10px",
  },
});

const SelectorInput: React.FC<SelectorInputProps> = ({
  label,
  value,
  onChange,
  options,
  required,
}) => (
  <Box sx={{ mb: 2 }}>
    <label style={{ marginBottom: "4px", display: "block" }}>{label}</label>
    <StyledSelect
      value={value}
      onChange={(event: SelectChangeEvent<unknown>) => {
        onChange(event as SelectChangeEvent<string>);
      }}
      variant="standard"
      input={<InputBase />}
      required={required}
      fullWidth
      sx={{
        paddingRight: "40px",
      }}
      MenuProps={{
        PaperProps: {
          style: {
            maxHeight: 200,
          },
        },
      }}
    >
      {options.map((option) => (
        <MenuItem key={option.id} value={option.id}>
          {option.name}
        </MenuItem>
      ))}
    </StyledSelect>
  </Box>
);

export default SelectorInput;
