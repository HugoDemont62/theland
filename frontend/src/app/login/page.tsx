import LoginForm from "@/components/LoginForm";
import { getUser } from "@/actions/auth";
import { redirect } from "next/navigation";

export default async function LoginPage() {
  // Si déjà connecté, rediriger vers /account
  const user = await getUser();
  if (user) {
    redirect("/account");
  }

  return <LoginForm />;
}