import { NextResponse } from "next/server";
import { connectDB } from "@/lib/mongodb";
import { ObjectId } from "mongodb";

export async function GET() {
  const db = await connectDB();

  const links = await db
    .collection("biolinks")
    .find({})
    .sort({ order: 1 })
    .toArray();

  return NextResponse.json(links);
}

export async function POST(req) {
  const db = await connectDB();
  const { url } = await req.json();

  const res = await fetch(url, {
    headers: { "User-Agent": "Mozilla/5.0" },
  });

  const html = await res.text();
  const $ = cheerio.load(html);

  const title =
    $("meta[property='og:title']").attr("content") ||
    $("title").text();

  const thumbnail =
    $("meta[property='og:image']").attr("content") ||
    $("img").first().attr("src");

  const last = await db
    .collection("biolinks")
    .find({})
    .sort({ order: -1 })
    .limit(1)
    .toArray();

  const order = last.length ? last[0].order + 1 : 1;

  const result = await db.collection("biolinks").insertOne({
    url,
    title,
    thumbnail,
    order,
    createdAt: new Date(),
  });

  return NextResponse.json({
    success: true,
    id: result.insertedId,
  });
}

export async function DELETE(req) {
  const db = await connectDB();
  const { id } = await req.json();

  await db.collection("biolinks").deleteOne({
    _id: new ObjectId(id),
  });

  return NextResponse.json({ success: true });
}