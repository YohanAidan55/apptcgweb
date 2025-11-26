import {
  Box,
  Button,
  Checkbox,
  FormControlLabel,
  Link,
  Paper,
  Typography,
} from "@mui/material";
import { Google } from "@mui/icons-material";
import { useNavigate, Link as RouterLink } from "react-router-dom";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { useSearchParams } from "react-router-dom";
import { toast } from "react-hot-toast";
import { useEffect } from "react";

import { useLoginUserMutation } from "@/Services/userApi.ts";
import Logo from "@/components/shared/Logo.tsx";
import HeadText from "@/components/shared/HeadText.tsx";
import FormInput from "@/components/shared/FormInput.tsx";
import ButtonForm from "@/components/shared/ButtonForm.tsx";
import ToggleTheme from "@/components/shared/ToggleTheme";

import { useTranslation } from "react-i18next";


export default function LoginForm() {
  const navigate = useNavigate();
  const [login, { isLoading, error }] = useLoginUserMutation();
  const { t } = useTranslation();

  const [searchParams, setSearchParams] = useSearchParams();

  useEffect(() => {
    const confirmed = searchParams.get("confirmed");

    if (confirmed === "true") {
      toast.success(t("login.confirmSuccess"));
    } else if (confirmed === "false") {
      toast.error(t("login.confirmError"));
    }
    searchParams.delete("confirmed");
    setSearchParams(searchParams, { replace: true });
  }, [searchParams, setSearchParams, t]);

  type LoginFormData = z.infer<typeof loginSchema>;

  const loginSchema = z.object({
    email: z.string().email(t("login.mailInvalid")),
    password: z.string().min(1, t("login.passwordRequired")),
  });

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<LoginFormData>({
    resolver: zodResolver(loginSchema),
  });

  const onSubmit = async (data: LoginFormData) => {
    try {
      const result = await login(data).unwrap();
      localStorage.setItem("token", result.token);
      navigate("/home");
    } catch (e) {
      console.error("❌ Login failed:", e);
    }
  };

  return (
    <Box
      sx={{
        width: "100vw",
        height: "100vh",
        bgcolor: "background.default",
        color: "text.primary",
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        overflow: "auto",
        p: 2,
        position: "relative",
      }}
    >
      <ToggleTheme />

      <Box
        sx={{
          width: "90%",
          maxWidth: 480,
        }}
      >
        <Logo />

        <HeadText
          title={t("login.title")}
          label={t("login.subTitle")}
        />

        <Paper
          elevation={6}
          sx={{
            p: { xs: 2, sm: 3 },
            borderRadius: 3,
            bgcolor: "background.paper",
            border: "1px solid",
            borderColor: "divider",
          }}
        >
          <Box component="form" onSubmit={handleSubmit(onSubmit)}>
            <FormInput
              name="email"
              label={t("login.email")}
              type="email"
              placeholder="name@email.com"
              register={register}
              error={errors.email}
            />

            <FormInput
              name="password"
              label={t("login.password")}
              type="password"
              placeholder={t("login.createPassword")}
              register={register}
              error={errors.password}
            />

            <Box
              display="flex"
              justifyContent="space-between"
              alignItems="center"
              mt={1}
              mb={2}
            >
              <FormControlLabel
                control={
                  <Checkbox
                    sx={{
                      color: "text.secondary",
                      "&.Mui-checked": { color: "primary.main" },
                    }}
                  />
                }
                label={
                  <Typography variant="body2" color="text.secondary">
                    {t("login.rememberMe")}
                  </Typography>
                }
              />

              <Link
                component={RouterLink}
                to="/forgot-password"
                underline="hover"
                color="primary.main"
                sx={{ fontSize: "0.9rem" }}
              >
                {t("login.mdpOublie")}
              </Link>
            </Box>

            <ButtonForm
              label={isLoading ? t("login.loading") : t("login.button")}
              disabled={isLoading}
            />

            {error && (
              <Typography color="error" variant="body2" sx={{ mt: 1 }}>
                {t("login.error")}
              </Typography>
            )}

            <Typography
              variant="body2"
              align="center"
              color="text.secondary"
              sx={{ my: 2 }}
            >
              {t("login.continue")}
            </Typography>

            <Button
              variant="outlined"
              fullWidth
              startIcon={<Google />}
              onClick={() =>
                (window.location.href =
                  "http://localhost:8080/oauth2/authorization/google")
              }
              sx={{
                borderColor: "divider",
                color: "text.primary",
                textTransform: "none",
                bgcolor: "background.default",
                "&:hover": {
                  bgcolor: "action.hover",
                },
              }}
            >
              {t("login.google")}
            </Button>
          </Box>
        </Paper>

        <Typography
          variant="body2"
          align="center"
          color="text.secondary"
          sx={{ mt: 3 }}
        >
          {t("login.noAccount")}{" "}
          <Link
            component={RouterLink}
            to="/register"
            underline="hover"
            color="primary.main"
          >
            {t("login.signUp")}
          </Link>
        </Typography>
      </Box>
    </Box>
  );
}
