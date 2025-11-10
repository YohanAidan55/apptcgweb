import { Button } from "@mui/material";

export interface ButtonFormProps {
  label: string;
  disabled?: boolean;
}

export default function ButtonForm({ label, disabled }: ButtonFormProps) {
  return (
    <Button
      type="submit"
      variant="contained"
      fullWidth
      disabled={disabled}
      sx={{
        mt: 1,
        mb: 2,
        bgcolor: disabled ? "#8c7a3a" : "#d4af37",
        color: "#000",
        fontWeight: 600,
        textTransform: "none",
        borderRadius: 2,
        py: 1.2,
        "&:hover": {
          bgcolor: disabled ? "#8c7a3a" : "#c19e35",
        },
      }}
    >
      {label}
    </Button>
  );
}
