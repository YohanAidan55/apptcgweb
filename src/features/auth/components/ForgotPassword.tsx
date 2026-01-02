import {
  Box,
  Typography,
  Link,
} from "@mui/material";
import { useNavigate } from "react-router-dom";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { toast } from "react-hot-toast";

import { useForgotPasswordMutation } from "@/Services/userApi.ts";

import Logo from "@/components/shared/Logo.tsx";
import HeadText from "@/components/shared/HeadText.tsx";
import FormInput from "@/components/shared/FormInput.tsx";
import ButtonForm from "@/components/shared/ButtonForm.tsx";

import { useTranslation } from "react-i18next";

export default function ForgotPassword() {

  const navigate = useNavigate();
  const { t } = useTranslation();
  
  // ✅ Schéma Zod
  const schema = z.object({
    email: z.string().email(t("ForgotPassword.mailInvalid")),
  });

type ForgotPasswordForm = z.infer<typeof schema>;

  // ✅ Hook RTK Query
  const [forgotPassword, { isLoading, error }] = useForgotPasswordMutation();

  // ✅ React Hook Form
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<ForgotPasswordForm>({
    resolver: zodResolver(schema),
    mode: "onTouched",
  });

  // ✅ Soumission
  const onSubmit = async (data: ForgotPasswordForm) => {
    try {
      await forgotPassword({ email: data.email }).unwrap();
      toast.success(t("ForgotPassword.linkSent"));
      navigate("/login");
    } catch (err) {
      toast.success(t("ForgotPassword.mailInvalid"));
      
    }
  };


  return (
    <Box
      sx={{
        minHeight: "100vh",
        bgcolor: "background.default",
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
      }}
    >
      <Box
        sx={{
          width: "100%",
          maxWidth: 480,
          px: 2,
          pt: { xs: 0, sm: 0 },
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
        }}
      >
        <Logo />

        <HeadText
          title={t("ForgotPassword.title")}
          label={t("ForgotPassword.subTitle")}
        />

        <Box component="form" onSubmit={handleSubmit(onSubmit)}>

        <FormInput
          name="email"
          label={t("ForgotPassword.email")}
          type="email"
          placeholder="name@email.com"
          register={register}
          error={errors.email}
        />

        <ButtonForm
          label={isLoading ? t("ForgotPassword.loading") : t("ForgotPassword.button")}
          disabled={isLoading}
        />

        {error && (
          <Typography
            variant="body2"
            color="error"
            textAlign="center"
            sx={{ mt: 1 }}
          >
            {t("ForgotPassword.error")}
          </Typography>
        )}

        <Typography
          variant="body2"
          align="center"
          color="gray"
          sx={{ mt: 3 }}
        >
          {t("ForgotPassword.remember")}{" "}
          <Link
            onClick={() => navigate("/login")}
            underline="hover"
            color="#d4af37"
            sx={{ cursor: "pointer" }}
          >
            {t("ForgotPassword.backToLogin")}
          </Link>
        </Typography>
      </Box>
      </Box>
    </Box>
  );
}
