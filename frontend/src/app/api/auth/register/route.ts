import { cookies } from "next/headers";
import { NextRequest, NextResponse } from "next/server";

const STRAPI_URL = process.env.NEXT_PUBLIC_STRAPI_URL;

export async function POST(request: NextRequest) {
  const body = await request.json();
  const { username, email, password, confirmPassword } = body;

  if (!username || username.length < 3) {
    return NextResponse.json(
      { error: "Le nom d'utilisateur doit contenir au moins 3 caracteres" },
      { status: 400 }
    );
  }

  if (!email || !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
    return NextResponse.json(
      { error: "Veuillez entrer une adresse email valide" },
      { status: 400 }
    );
  }

  if (!password || password.length < 6) {
    return NextResponse.json(
      { error: "Le mot de passe doit contenir au moins 6 caracteres" },
      { status: 400 }
    );
  }

  if (password !== confirmPassword) {
    return NextResponse.json(
      { error: "Les mots de passe ne correspondent pas" },
      { status: 400 }
    );
  }

  try {
    const res = await fetch(`${STRAPI_URL}/api/auth/local/register`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ username, email, password }),
    });

    const data = await res.json();

    if (!res.ok) {
      let errorMsg = "Erreur lors de l'inscription";
      const msg = data.error?.message || "";
      if (msg.toLowerCase().includes("email already taken")) {
        errorMsg = "Cet email est deja utilise";
      } else if (msg.toLowerCase().includes("username already taken")) {
        errorMsg = "Ce nom d'utilisateur est deja pris";
      }
      return NextResponse.json({ error: errorMsg }, { status: 400 });
    }

    if (!data.jwt) {
      return NextResponse.json(
        { error: "Erreur serveur : pas de token recu" },
        { status: 500 }
      );
    }

    const cookieStore = await cookies();
    cookieStore.set("token", data.jwt, {
      httpOnly: true,
      secure: process.env.NODE_ENV === "production",
      sameSite: "lax",
      maxAge: 60 * 60 * 24 * 7,
      path: "/",
    });

    return NextResponse.json({ success: true, user: data.user });
  } catch (error) {
    console.error("Register error:", error);
    return NextResponse.json(
      { error: "Une erreur est survenue" },
      { status: 500 }
    );
  }
}
