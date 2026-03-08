import { NextResponse } from "next/server";
import { connectDB } from "@/lib/mongodb";
import { ObjectId } from "mongodb";
import * as cheerio from "cheerio";

export async function GET() {
  try {
    const db = await connectDB();

    const links = await db
      .collection("biolinks")
      .find({})
      .sort({ order: 1 })
      .toArray();

    return NextResponse.json(links);
  } catch {
    return NextResponse.json({ error: "Fetch failed" }, { status: 500 });
  }
}

export async function POST(req) {
  try {
    const db = await connectDB();
    const { url } = await req.json();

    if (!url) {
      return NextResponse.json({ error: "URL required" }, { status: 400 });
    }

    const res = await fetch(url, {
      headers: { "User-Agent": "Mozilla/5.0" },
    });

    const html = await res.text();
    const $ = cheerio.load(html);

    const thumbnail =
      $("video.video-player").attr("poster") ||
      $("meta[property='og:image']").attr("content") ||
      "";

    const videoUrl =
      $("video.video-player source").attr("src") ||
      "";

    const last = await db
      .collection("biolinks")
      .find({})
      .sort({ order: -1 })
      .limit(1)
      .toArray();

    const order = last.length ? last[0].order + 1 : 1;

    // 🔥 AUTO NUMBERED TITLE
    const title = `#${order} Sauce`;

    const result = await db.collection("biolinks").insertOne({
      url,
      title,
      thumbnail,
      videoUrl,
      order,
      createdAt: new Date(),
    });

    return NextResponse.json({
      success: true,
      id: result.insertedId,
    });

  } catch {
    return NextResponse.json(
      { error: "Scrape failed" },
      { status: 500 }
    );
  }
}

export async function DELETE(req) {
  try {
    const db = await connectDB();
    const { id } = await req.json();

    await db.collection("biolinks").deleteOne({
      _id: new ObjectId(id),
    });

    return NextResponse.json({ success: true });

  } catch {
    return NextResponse.json(
      { error: "Delete failed" },
      { status: 500 }
    );
  }
}