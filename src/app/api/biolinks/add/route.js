import { NextResponse } from "next/server";
import * as cheerio from "cheerio";
import { connectDB } from "@/lib/mongodb";

export async function POST(req) {
  try {
    const db = await connectDB();
    const { url } = await req.json();

    if (!url) {
      return NextResponse.json(
        { error: "URL required" },
        { status: 400 }
      );
    }

    const res = await fetch(url, {
      headers: {
        "User-Agent": "Mozilla/5.0",
      },
    });

    const html = await res.text();
    const $ = cheerio.load(html);

    const title =
      $("meta[property='og:title']").attr("content") ||
      $("title").text();

    const thumbnail =
      $("meta[property='og:image']").attr("content") ||
      $("meta[name='twitter:image']").attr("content") ||
      $("img").first().attr("src");

    const result = await db.collection("biolinks").insertOne({
      url,
      title,
      thumbnail,
      createdAt: new Date(),
    });

    return NextResponse.json({
      success: true,
      id: result.insertedId,
    });
  } catch (err) {
    console.error(err);

    return NextResponse.json(
      { error: "Failed to create link" },
      { status: 500 }
    );
  }
}