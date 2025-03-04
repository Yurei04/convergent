import pdfParse from "pdf-parse";


export default async function ParseResume(req, res) {
    if (req.method !== "POST") {
        return res.status(405).json({ Message: "Method Not Allowed" })
    }

    try {
        const fileBuffer = Buffer.from(req.body.file, "base64");
        const data = await pdfParse(fileBuffer);
        req.status(200).json({ text: data.text })

    } catch (error) {
        console.error("Parsing Error: ", error);
        res.status(500).json({ Message: "Failed to Parse"})
    }
}