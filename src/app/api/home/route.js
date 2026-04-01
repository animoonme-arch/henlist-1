import { connectDB } from "@/lib/mongodb";

export async function GET() {
  try {
    const db = await connectDB();
    const collection = db.collection("content");

    // ✅ Latest FIRST
    const data = await collection
      .find({})
      .sort({ position: -1 }) // or createdAt: -1
      .toArray();

    return Response.json(data);
  } catch (err) {
    return Response.json(
      { error: err.message || "Server Error" },
      { status: 500 }
    );
  }
}