"use server";

import { cookies } from "next/headers";
import { redirect } from "next/navigation";
import { revalidatePath } from "next/cache";

const STRAPI_URL = process.env.NEXT_PUBLIC_STRAPI_URL;

export async function login(prevState: any, formData: FormData) {
  console.log("🔵 LOGIN - Start");

  const identifier = formData.get("email") as string;
  const password = formData.get("password") as string;

  console.log("🔵 LOGIN - Données reçues:", { identifier, password: "***" });

  if (!identifier || !password) {
    console.log("🔴 LOGIN - Validation échouée");
    return { error: "Email et mot de passe requis" };
  }

  try {
    console.log(
      "🔵 LOGIN - Envoi vers Strapi:",
      `${STRAPI_URL}/api/auth/local`,
    );

    const res = await fetch(`${STRAPI_URL}/api/auth/local`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ identifier, password }),
    });

    console.log("🟡 LOGIN - Status Strapi:", res.status);

    const data = await res.json();
    console.log("🟡 LOGIN - Réponse Strapi:", data);

    if (!res.ok) {
      console.error("🔴 LOGIN - Erreur Strapi:", data);
      return { error: "Identifiants incorrects" };
    }

    if (!data.jwt) {
      console.error("🔴 LOGIN - Pas de JWT reçu");
      return { error: "Erreur serveur : pas de token reçu" };
    }

    const { jwt } = data;
    console.log("🟢 LOGIN - JWT reçu:", jwt.substring(0, 20) + "...");

    // Stocker le JWT
    const cookieStore = await cookies();
    cookieStore.set("token", jwt, {
      httpOnly: true,
      secure: process.env.NODE_ENV === "production",
      sameSite: "lax",
      maxAge: 60 * 60 * 24 * 7,
    });

    console.log("🟢 LOGIN - Cookie défini");
  } catch (error) {
    console.error("🔴 LOGIN - Exception:", error);
    return { error: "Une erreur est survenue. Veuillez réessayer." };
  }

  console.log("🟢 LOGIN - Avant redirect");

  // ⚠️ CRITICAL : Invalider le cache AVANT le redirect
  revalidatePath("/account");
  revalidatePath("/");

  redirect("/account");
}

export async function register(prevState: any, formData: FormData) {
  const username = formData.get("username") as string;
  const email = formData.get("email") as string;
  const password = formData.get("password") as string;
  const confirmPassword = formData.get("confirmPassword") as string;

  // Validation côté serveur
  if (!username || username.length < 3) {
    return {
      error: "Le nom d'utilisateur doit contenir au moins 3 caractères",
    };
  }

  if (!email || !email.includes("@")) {
    return { error: "Veuillez entrer une adresse email valide" };
  }

  if (!password || password.length < 6) {
    return { error: "Le mot de passe doit contenir au moins 6 caractères" };
  }

  if (password !== confirmPassword) {
    return { error: "Les mots de passe ne correspondent pas" };
  }

  try {
    const res = await fetch(`${STRAPI_URL}/api/auth/local/register`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        username,
        email,
        password,
      }),
    });

    const data = await res.json();

    if (!res.ok) {
      console.error("Strapi error:", data);

      if (
        data.error?.message?.includes("Email already taken") ||
        data.error?.message?.includes("email already taken")
      ) {
        return { error: "Cet email est déjà utilisé" };
      }
      if (
        data.error?.message?.includes("Username already taken") ||
        data.error?.message?.includes("username already taken")
      ) {
        return { error: "Ce nom d'utilisateur est déjà pris" };
      }

      return { error: data.error?.message || "Erreur lors de l'inscription" };
    }

    if (!data.jwt) {
      return { error: "Erreur serveur : pas de token reçu" };
    }

    const { jwt } = data;

    const cookieStore = await cookies();
    cookieStore.set("token", jwt, {
      httpOnly: true,
      secure: process.env.NODE_ENV === "production",
      sameSite: "lax",
      maxAge: 60 * 60 * 24 * 7,
    });
  } catch (error) {
    console.error("Register error:", error);
    return { error: "Une erreur est survenue. Veuillez réessayer." };
  }

  // ⚠️ CRITICAL : Invalider le cache AVANT le redirect
  revalidatePath("/account");
  revalidatePath("/");

  redirect("/account");
}

export async function logout() {
  const cookieStore = await cookies();
  cookieStore.delete("token");

  // ⚠️ Invalider le cache
  revalidatePath("/");
  revalidatePath("/account");

  redirect("/");
}

export async function getUser() {
  const cookieStore = await cookies();
  const token = cookieStore.get("token")?.value;

  console.log("🔵 GET USER - Start");
  console.log(
    "🔵 GET USER - Token:",
    token ? token.substring(0, 30) + "..." : "null",
  );

  if (!token) return null;

  try {
    console.log(
      "🔵 GET USER - Fetching from Strapi:",
      `${STRAPI_URL}/api/users/me?populate=favorites`,
    );
    const res = await fetch(`${STRAPI_URL}/api/users/me?populate=favorites`, {
      headers: { Authorization: `Bearer ${token}` },
      cache: "no-store",
    });

    console.log("🟡 GET USER - Status Strapi:", res.status);

    const data = await res.json();
    console.log("🟡 GET USER - Response body:", data);

    if (!res.ok) {
      console.error("🔴 GET USER - Erreur:", data);
      return null;
    }

    return data;
  } catch (error) {
    console.error("Get user error:", error);
    return null;
  }
}

export async function updateUserInfo(prevState: any, formData: FormData) {
  const cookieStore = await cookies();
  const token = cookieStore.get("token")?.value;

  if (!token) {
    return { error: "Non authentifié" };
  }

  try {
    const user = await getUser();

    if (!user) {
      return { error: "Utilisateur non trouvé" };
    }

    const data = {
      username: formData.get("username") as string,
      email: formData.get("email") as string,
    };

    const res = await fetch(`${STRAPI_URL}/api/users/${user.id}`, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
      body: JSON.stringify(data),
    });

    if (!res.ok) {
      return { error: "Erreur lors de la mise à jour" };
    }

    revalidatePath("/account");
    return { success: true };
  } catch (error) {
    console.error("Update user error:", error);
    return { error: "Une erreur est survenue" };
  }
}
