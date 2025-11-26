import { useEffect } from "react";
import { useSearchParams, useNavigate } from "react-router-dom";
import { useConfirmMutation } from "@/Services/userApi.ts";

export default function Confirm() {
  const [confirm] = useConfirmMutation();
  const [searchParams] = useSearchParams();
  const navigate = useNavigate();

  const token = searchParams.get("confirmationToken");

  useEffect(() => {
    if (!token) return;

    confirm(token)
      .unwrap()
      .then(() => {
        navigate("/login?confirmed=true");
      })
      .catch(() => {
        navigate("/login?confirmed=false");
      });
  }, [token]);

}
