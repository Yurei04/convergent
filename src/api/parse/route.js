import { NextResponse } from "next/server";
import pdf from "pdf-parse";

export async function POST(req) {
  try {
    const formData = await req.formData();
    const file = formData.get("file");

    if (!file) {
      return NextResponse.json({ error: "No file uploaded" }, { status: 400 });
    }

    const arrayBuffer = await file.arrayBuffer();
    const text = await pdf(Buffer.from(arrayBuffer));

    return NextResponse.json({ text: text.text });
  } catch (error) {
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}
