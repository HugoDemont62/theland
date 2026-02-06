import RegisterForm from "@/components/RegisterForm";
import { getUser } from "@/actions/auth";
import { redirect } from "next/navigation";

export default async function RegisterPage() {
  // Si déjà connecté, rediriger vers /account
  const user = await getUser();
  if (user) {
    redirect("/account");
  }

  return <RegisterForm />;
}