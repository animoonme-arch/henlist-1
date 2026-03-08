import { NextResponse } from "next/server";
import { connectDB } from "@/lib/mongodb";
import { ObjectId } from "mongodb";

export async function POST(req) {
  const db = await connectDB();
  const { links } = await req.json();

  for (let i = 0; i < links.length; i++) {
    await db.collection("biolinks").updateOne(
      { _id: new ObjectId(links[i]) },
      { $set: { order: i } }
    );
  }

  return NextResponse.json({ success: true });
}