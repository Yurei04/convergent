import fs from "fs"
import path from "path"

export default function Sustineo (req, res) {
    if (req.method !== "POST") {
        return res.status(405).json({ Message: "Method Not Allowed" })
    }


}