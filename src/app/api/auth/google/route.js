import { NextResponse } from "next/server";
import { getGoogleAuthUrl } from "@/lib/server/drive";

export async function GET() {
  try {
    const url = getGoogleAuthUrl();
    return NextResponse.redirect(url);
  } catch (error) {
    return NextResponse.json(
      { message: error?.message || "Google OAuth is not configured." },
      { status: 500 }
    );
  }
}
