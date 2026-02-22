import { cookies } from "next/headers";
import { NextRequest, NextResponse } from "next/server";

const STRAPI_URL = process.env.NEXT_PUBLIC_STRAPI_URL;

export async function POST(request: NextRequest) {
  const cookieStore = await cookies();
  const token = cookieStore.get("token")?.value;

  if (!token) {
    return NextResponse.json({ error: "Non authentifie" }, { status: 401 });
  }

  const body = await request.json();
  const { teaId } = body;

  if (!teaId) {
    return NextResponse.json({ error: "teaId requis" }, { status: 400 });
  }

  try {
    // Get current user with favorites
    const userRes = await fetch(`${STRAPI_URL}/api/users/me?populate=favorite_teas`, {
      headers: { Authorization: `Bearer ${token}` },
    });

    if (!userRes.ok) {
      return NextResponse.json({ error: "Utilisateur non trouve" }, { status: 401 });
    }

    const user = await userRes.json();
    const currentFavorites: number[] = (user.favorite_teas || []).map((t: any) => t.id);
    const isFavorite = currentFavorites.includes(teaId);

    let newFavorites: number[];
    if (isFavorite) {
      newFavorites = currentFavorites.filter((id) => id !== teaId);
    } else {
      newFavorites = [...currentFavorites, teaId];
    }

    // Update user favorites
    const updateRes = await fetch(`${STRAPI_URL}/api/users/${user.id}`, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
      body: JSON.stringify({ favorite_teas: newFavorites }),
    });

    if (!updateRes.ok) {
      const errData = await updateRes.json();
      console.error("Update favorites error:", errData);
      return NextResponse.json({ error: "Erreur mise a jour" }, { status: 500 });
    }

    return NextResponse.json({
      success: true,
      isFavorite: !isFavorite,
      count: newFavorites.length,
    });
  } catch (error) {
    console.error("Toggle favorite error:", error);
    return NextResponse.json({ error: "Erreur serveur" }, { status: 500 });
  }
}
