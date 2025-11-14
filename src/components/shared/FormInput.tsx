import { useState } from "react";
import {
  TextField,
  IconButton,
  InputAdornment,
} from "@mui/material";
import { Visibility, VisibilityOff } from "@mui/icons-material";
import type { UseFormRegister } from "react-hook-form";


/**
 * Champ de formulaire universel compatible avec React Hook Form
 * et stylisé pour ton design sombre / doré.
 */
interface FormInputProps {
  name: string;
  label: string;
  type?: string;
  placeholder?: string;
  register: UseFormRegister<any>;
  error?: { message?: string };
}

export default function FormInput({
  name,
  label,
  type = "text",
  placeholder = "",
  register,
  error,
}: FormInputProps) {
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
          backgroundColor: "background.default",
          borderRadius: 2,
          input: { color: "text.primary" },
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
