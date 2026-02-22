import { NextRequest, NextResponse } from "next/server";

const STRAPI_URL = process.env.NEXT_PUBLIC_STRAPI_URL;
const API_KEY = process.env.STRAPI_API_KEY;

export async function GET(request: NextRequest) {
  const q = request.nextUrl.searchParams.get("q")?.trim();

  if (!q || q.length < 1) {
    return NextResponse.json({ data: [] });
  }

  try {
    const res = await fetch(
      `${STRAPI_URL}/api/teas?filters[name][$containsi]=${encodeURIComponent(q)}&populate=tea_category&pagination[limit]=5&sort=name:asc`,
      {
        headers: { Authorization: `Bearer ${API_KEY}` },
      }
    );

    const data = await res.json();

    if (!res.ok) {
      return NextResponse.json({ data: [] });
    }

    return NextResponse.json({ data: data.data || [] });
  } catch {
    return NextResponse.json({ data: [] });
  }
}
