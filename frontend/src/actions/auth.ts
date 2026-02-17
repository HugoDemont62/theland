"use server";

import { cookies } from "next/headers";
import { redirect } from "next/navigation";
import { revalidatePath } from "next/cache";

const STRAPI_URL = process.env.NEXT_PUBLIC_STRAPI_URL;

export async function getUser() {
  const cookieStore = await cookies();
  const token = cookieStore.get("token")?.value;

  if (!token) return null;

  try {
    const res = await fetch(`${STRAPI_URL}/api/users/me`, {
      headers: { Authorization: `Bearer ${token}` },
      cache: "no-store",
    });

    const data = await res.json();
    if (!res.ok) return null;
    return data;
  } catch (error) {
    console.error("Get user error:", error);
    return null;
  }
}

export async function getUserWithFavorites() {
  const cookieStore = await cookies();
  const token = cookieStore.get("token")?.value;

  if (!token) return null;

  try {
    const res = await fetch(`${STRAPI_URL}/api/users/me?populate=favorite_teas`, {
      headers: { Authorization: `Bearer ${token}` },
      cache: "no-store",
    });

    const data = await res.json();
    if (!res.ok) return null;
    return data;
  } catch {
    return null;
  }
}

export async function logout() {
  const cookieStore = await cookies();
  cookieStore.delete("token");
  revalidatePath("/", "layout");
  redirect("/");
}

export async function updateUserInfo(
  prevState: { error: string; success: boolean },
  formData: FormData
): Promise<{ error: string; success: boolean }> {
  const cookieStore = await cookies();
  const token = cookieStore.get("token")?.value;

  if (!token) {
    return { error: "Non authentifie", success: false };
  }

  try {
    const user = await getUser();
    if (!user) {
      return { error: "Utilisateur non trouve", success: false };
    }

    const data = {
      username: (formData.get("username") as string)?.trim(),
      email: (formData.get("email") as string)?.trim(),
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
      return { error: "Erreur lors de la mise a jour", success: false };
    }

    revalidatePath("/account");
    return { error: "", success: true };
  } catch (error) {
    console.error("Update user error:", error);
    return { error: "Une erreur est survenue", success: false };
  }
}
