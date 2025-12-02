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
import toast from "react-hot-toast";


import { useCreateUserMutation } from "@/Services/userApi.ts";

  import Logo from "@/components/shared/Logo.tsx";
  import HeadText from "@/components/shared/HeadText.tsx";
  import FormInput from "@/components/shared/FormInput.tsx";
  import ButtonForm from "@/components/shared/ButtonForm.tsx";
  import ToggleTheme from "@/components/shared/ToggleTheme";

  import { useTranslation } from "react-i18next";


export default function RegisterForm() {

  const navigate = useNavigate();
  const [createUser, { isLoading }] = useCreateUserMutation();
  const { t } = useTranslation();

    // --- ✅ Schéma de validation avec Zod
  const registerSchema = z
    .object({
      firstName: z.string().min(2, t("register.caractereRequis")),
      lastName: z.string().min(2, t("register.caractereRequis")),
      userName: z.string().min(2, t("register.caractereRequis")),
      email: z.string().email(t("register.mailInvalid")),
      password: z
        .string()
        .min(8, t("register.mdpCaractere"))
        .regex(/[0-9]/, t("register.mdpChiffre"))
        .regex(/[^a-zA-Z0-9]/, t("register.mdpSymbole")),
    });

  type RegisterFormData = z.infer<typeof registerSchema>;

  // ✅ React Hook Form
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<RegisterFormData>({
    resolver: zodResolver(registerSchema),
    defaultValues: {
      firstName: "",
      lastName: "",
      userName: "",     
      email: "",
      password: "",},
  });

  // ✅ Soumission du formulaire → API
const onSubmit = async (data: RegisterFormData) => {
  try {
    await createUser(data).unwrap();

    toast.success(t("register.mailSent"));

    navigate("/login");
  } catch (err: any) {
    console.log("API Error:", err);

    // Lecture du message backend si disponible
    const message = t(`errors.${err.data.code}`) || err.data.detail;

    toast.error(message);
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
            maxWidth: 480,   // <= large sur PC, compact sur mobile
          }}
        >

        <Logo />

        <HeadText title={t("register.title")}
        label={t("register.subTitle")} />

        {/* Formulaire */}
        <Paper
          elevation={6}
          sx={{
            p: 3,
            borderRadius: 3,
            backgroundColor: "background.paper",
            border: "1px solid #222",
          }}
        >
          <Box component="form" onSubmit={handleSubmit(onSubmit)}>

            <FormInput
              name="firstName"
              label={t("register.firstName")}
              placeholder={t("register.firstName")}
              register={register}
              error={errors.firstName}
            />

            <FormInput
              name="lastName"
              label={t("register.lastName")}
              placeholder={t("register.lastName")}
              register={register}
              error={errors.lastName}
            />

            <FormInput
              name="userName"
              label={t("register.userName")}
              placeholder={t("register.userName")}
              register={register}
              error={errors.lastName}
            />

            <FormInput
              name="email"
              label={t("register.email")}
              type="email"
              placeholder="name@email.com"
              register={register}
              error={errors.email}
            />

            <FormInput
              name="password"
              label={t("register.password")}
              type="password"
              placeholder={t("register.createPassword")}
              register={register}
              error={errors.password}
            />

            {/* Conditions du mot de passe */}
            <Box textAlign="left" mt={1} mb={1} pl={1}>
              <Typography variant="body2" color="gray">
                • {t("register.8caractere")}
              </Typography>
              <Typography variant="body2" color="gray">
                • {t("register.numberSymbol")}
              </Typography>
            </Box>

            {/* Terms & policy */}
            <Box
              display="flex"
              justifyContent="space-between"
              alignItems="center"
              mb={2}
            >
              <FormControlLabel
                control={
                  <Checkbox
                    sx={{
                      color: "#aaa",
                      "&.Mui-checked": { color: "#d4af37" },
                    }}
                  />
                }
                label={
                  <Typography variant="body2" color="gray">
                    {t("register.agreeTerms")}
                  </Typography>
                }
              />
              <Link href="#" underline="hover" color="#d4af37">
                {t("register.viewTerms")}
              </Link>
            </Box>

            {/* Bouton principal */}
            <ButtonForm
              label={isLoading ? t("register.loading") : t("register.creationAccount")}
              disabled={isLoading}
            />
            

            <Typography
              variant="body2"
              align="center"
              color="gray"
              sx={{ my: 2 }}
            >
              {t("register.continue")}
            </Typography>

            <Button
              variant="outlined"
              fullWidth
              startIcon={<Google />}
              onClick={() => window.location.href = "http://localhost:8080/oauth2/authorization/google"}
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
              {t("register.google")}
            </Button>
          </Box>
        </Paper>

        {/* Bas de page */}
        <Typography
          variant="body2"
          align="center"
          color="gray"
          sx={{ mt: 3 }}
        >
          {t("register.haveAccount")}{" "}
          <Link
            component={RouterLink}
            to="/login"
            underline="hover"
            color="#d4af37"
          >
            {t("register.login")}
          </Link>
        </Typography>
      </Box>
    </Box>
  );
}
