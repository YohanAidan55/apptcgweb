import React from 'react';
import {
    Button,
  } from "@mui/material";

const ButtonForm = ({label}) => {
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
