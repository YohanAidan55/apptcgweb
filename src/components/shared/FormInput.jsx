import { useState } from "react";
import {
  TextField,
  IconButton,
  InputAdornment,
} from "@mui/material";
import { Visibility, VisibilityOff } from "@mui/icons-material";

/**
 * Champ de formulaire universel compatible avec React Hook Form
 * et stylisé pour ton design sombre / doré.
 */
export default function FormInput({
  name,
  label,
  type = "text",
  placeholder = "",
  register,
  error,
}) {
  const [showPassword, setShowPassword] = useState(false);

  const isPassword = type === "password";
  const inputType = isPassword ? (showPassword ? "text" : "password") : type;

  return (
    <TextField
      label={label}
      placeholder={placeholder}
      type={inputType}
      fullWidth
      margin="normal"
      {...register(name)}
      error={!!error}
      helperText={error?.message}
      InputProps={{
        sx: {
          backgroundColor: "#1a1a1a",
          borderRadius: 2,
          input: { color: "#fff" },
        },
        ...(isPassword && {
          endAdornment: (
            <InputAdornment position="end">
              <IconButton
                onClick={() => setShowPassword((p) => !p)}
                edge="end"
                sx={{ color: "#888" }}
              >
                {showPassword ? <VisibilityOff /> : <Visibility />}
              </IconButton>
            </InputAdornment>
          ),
        }),
      }}
      InputLabelProps={{ style: { color: "#aaa" } }}
      sx={{
        mb: 1,
      }}
    />
  );
}
