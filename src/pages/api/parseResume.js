import pdfParse from "pdf-parse";

export default async function handler(req, res) {
  if (req.method !== "POST") {
    return res.status(405).json({ message: "Method Not Allowed" });
  }

  try {
    if (!req.body.file) {
      return res.status(400).json({ message: "No file provided" });
    }

    console.log("Step 1: Received File");

    // Convert Base64 to Buffer
    const fileBuffer = Buffer.from(req.body.file, "base64");

    // Parse PDF
    const data = await pdfParse(fileBuffer);
    const resumeText = data.text ? data.text.toLowerCase() : "";

    console.log("Step 2: Extracted Resume Text ->", resumeText);

    if (!resumeText.trim()) {
      return res.status(400).json({ message: "Failed to extract text" });
    }

    // Define job-related keywords
    const jobKeywords = [
      "code", "think", "develop", "debug", "deploy",
      "analyze", "data", "machine learning", "AI",
      "security", "penetration testing", "firewall", "hacking",
      "design", "illustration", "branding", "UI/UX"
    ];

    // Extract matching keywords
    const extractedKeywords = jobKeywords.filter(keyword => resumeText.includes(keyword));

    console.log("Step 3: Extracted Keywords ->", extractedKeywords);

    res.status(200).json({ keywords: extractedKeywords, resumeText });

  } catch (error) {
    console.error("Parsing Error: ", error);
    res.status(500).json({ message: "Failed to Parse" });
  }
}
