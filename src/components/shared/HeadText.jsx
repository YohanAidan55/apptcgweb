import React from 'react';
import logo from "@/assets/LogoApp.png";
import {
    Box,
    Typography,
  } from "@mui/material";

const HeadText = ({title, label}) => {
    return(
        <Box textAlign="left" mb={4}>
          <Typography variant="h6" fontWeight={700}>
            {title}
          </Typography>
          <Typography variant="body2" color="gray">
            {label}
          </Typography>
        </Box>
    )
}

export default HeadText;
