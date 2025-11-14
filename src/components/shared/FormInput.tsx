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
          backgroundColor: "#fff",
          borderRadius: 2,
          input: { color: "#000" },
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

        "& input:-webkit-autofill": {
          WebkitBoxShadow: "0 0 0 1000px #fff inset !important",  // Fond toujours blanc
          WebkitTextFillColor: "#000 !important",                  // Texte noir
          caretColor: "#000",                                      // Curseur noir
        },

        "& input:-webkit-autofill:focus": {
          WebkitBoxShadow: "0 0 0 1000px #fff inset !important",
          WebkitTextFillColor: "#000 !important",
        },
      }}
    />
  );
}
