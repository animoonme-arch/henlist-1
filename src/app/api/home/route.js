import { connectDB } from "@/lib/mongodb";

export async function GET(req) {
  try {
    const db = await connectDB();
    const collection = db.collection("content");

    const { searchParams } = new URL(req.url);
    const page = parseInt(searchParams.get("page")) || 1;
    const limit = 50;

    const skip = (page - 1) * limit;

    // 🔥 Get latest mixed data
    const data = await collection
      .find({})
      .sort({ createdAt: -1 })
      .skip(skip)
      .limit(limit)
      .toArray();

    return Response.json(data);
  } catch (err) {
    return Response.json({ error: err.message }, { status: 500 });
  }
}