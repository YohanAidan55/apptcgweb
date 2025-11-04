import React from 'react';
import {
    Button,
  } from "@mui/material";

interface ButtonFormProps {
  label: string;
}

const ButtonForm: React.FC<ButtonFormProps> = ({ label }) => {
    return(
        <Button
        type="submit"
        variant="contained"
        fullWidth
        sx={{
          mt: 1,
          mb: 2,
          bgcolor: "#d4af37",
          color: "#000",
          fontWeight: 600,
          "&:hover": { bgcolor: "#c19e35" },
        }}
      >
        {label}
      </Button>
    )
}

export default ButtonForm;
