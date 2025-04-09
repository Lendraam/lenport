import { GoogleGenerativeAI } from "@google/generative-ai";

export async function POST(req) {
  const { message } = await req.json();

  const genAI = new GoogleGenerativeAI(process.env.GEMINI_API_KEY);

  // Gunakan model yang tersedia dari Google
  const model = genAI.getGenerativeModel({ model: "gemini-2.0-flash" });

  try {
    const result = await model.generateContent(message);
    const response = result.response.text();

    return new Response(JSON.stringify({ response }), {
      status: 200,
      headers: { "Content-Type": "application/json" },
    });
  } catch (error) {
    console.error("Gemini API Error:", error);
    return new Response(JSON.stringify({ response: "Terjadi kesalahan." }), {
      status: 500,
      headers: { "Content-Type": "application/json" },
    });
  }
}
