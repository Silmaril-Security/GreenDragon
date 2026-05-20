import { connection } from "next/server";
import { getChallenges } from "@/lib/db/queries";

export async function GET() {
  await connection();

  try {
    const challenges = await getChallenges();

    return Response.json(challenges);
  } catch (error) {
    console.error("Failed to fetch challenges:", error);
    return Response.json(
      { error: "Failed to fetch challenges" },
      { status: 500 }
    );
  }
}
