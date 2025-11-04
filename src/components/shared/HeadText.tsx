import React from 'react';
import {
    Box,
    Typography,
  } from "@mui/material";

interface HeadTextProps {
  title: string;
  label: string;
}

const HeadText: React.FC<HeadTextProps> = ({ title, label }) => {
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
