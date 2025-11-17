import {
  Box,
  Typography,
  Link,
} from "@mui/material";
import { useNavigate } from "react-router-dom";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";

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

      alert(t("ForgotPassword.mailInvalid"));
      navigate("/login");

    } catch (err) {
      alert(t("ForgotPassword.mailInvalid"));
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
          p: 2
        }}
      >
        <Box
          sx={{
            width: "90%",
            maxWidth: 480,   // <= large sur PC, compact sur mobile
          }}
        >
        {/* ✅ Logo centré */}
        <Logo />

        {/* ✅ Titre et sous-texte */}
        <HeadText
          title={t("ForgotPassword.title")}
          label={t("ForgotPassword.subTitle")}
        />

        {/* ✅ Champ email factorisé */}
        <FormInput
          name="email"
          label={t("ForgotPassword.email")}
          type="email"
          placeholder="name@email.com"
          register={register}
          error={errors.email}
        />

        {/* ✅ Bouton d’envoi */}
        <ButtonForm
          label={isLoading ? t("ForgotPassword.loading") : t("ForgotPassword.button")}
          disabled={isLoading}
        />

        {/* ✅ Message d’erreur API */}
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

        {/* ✅ Retour connexion */}
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
  );
}
