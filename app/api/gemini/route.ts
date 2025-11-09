import { NextResponse } from "next/server";

export async function POST(request: Request) {
  const { text } = await request.json();
  const url = `https://generativelanguage.googleapis.com/v1beta/models/gemini-pro:generateContent?key=${process.env.GEMINI_API_KEY}`;
  const completion = await fetch(url, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ contents: [ { parts: [ { text } ] } ] }),
  });
  const result = await completion.json();
  console.log("[THIS IS THE TRUE GEMINI ROUTE]");
  console.log("[GEMINI RAW RESULT]", JSON.stringify(result));
  return NextResponse.json(result);
}
