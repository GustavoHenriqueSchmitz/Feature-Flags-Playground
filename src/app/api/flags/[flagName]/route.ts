import { get } from "@vercel/edge-config";
import { NextResponse } from "next/server";

export const dynamic = "force-dynamic";

export async function GET(
  request: Request,
  context: { params: { flagName: string } }
) {
  try {
    const flagName = context.params.flagName;

    if (!flagName) {
      return NextResponse.json(
        { error: "Flag name is required" },
        { status: 400 }
      );
    }

    const flagValue = await get(flagName);

    if (flagValue === undefined) {
      console.warn(`Edge Config key not found: ${flagName}`);
    }

    return NextResponse.json({ value: flagValue });
  } catch (error) {
    console.error("Error fetching from Edge Config:", error);
    return NextResponse.json(
      { error: "Internal Server Error" },
      { status: 500 }
    );
  }
}
