import React from 'react';
import logo from "@/assets/LogoApp.png";
import {
    Box,
    Button,
    Checkbox,
    Container,
    FormControlLabel,
    IconButton,
    InputAdornment,
    Link,
    Paper,
    TextField,
    Typography,
  } from "@mui/material";

const Logo = ({}) => {
    return(
        <Box sx={{ display: "flex", justifyContent: "center", mb: 3 }}>
        <Box
        component="img"
        src={logo}
        alt="TCG Project Logo"
        sx={{ width: 120, height: 120 }}
        />
        </Box>
    )
}

export default Logo;
