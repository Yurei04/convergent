import fs from "fs"
import path from "path"

export default function Sustineo (req, res) {
    if (req.method !== "POST") {
        return res.status(405).json({ Message: "Method Not Allowed" })
    }

    try {
        const libraryPath = path.join(process.cwd(), "database.data/library.json")
        const toolsPath = path.join(process.cwd(), "database.data/tools.json")
        const templatesPath = path.join(process.cwd(), "database/template/templates.json")
        const basicPath = path.join(process.cwd(), "database/template.json")
        
        const libraryData = JSON.parse(fs.readFileSync(libraryPath, "utf-8"));
        const toolsData = JSON.parse(fs.readFileSync(toolsPath, "utf-8"));
        const templates = JSON.parse(fs.readFileSync(templatesPath, "utf-8"));
        const basicData = JSON.parse(fs.readFileSync(basicPath, "utf-8"));
        
        const { query } = req.body;
        const words = query.toLowerCase().split(" ");

        let responseText = "I'm not sure, but I can look for resources";
        let matchedTools = [];
        let matchedLibrary = [];

        for (const entry of libraryData.resources) {
            if (entry.keywords.some(keyword => words.includes(keyword))) {
                matchedLibrary.push({
                    title: entry.title,
                    description: entry.description,
                    link: entry.link || "N/A",
                });
            }
        }

        for (const template of templates.responses) {
            if (template.keywords.some(keyword => words.includes(keyword))) {
                matchedTools = toolsData
                    .filter(tool => tool.keywords.some(keyword => words.includes(keyword)))
                    .map(t => ({ title: t.title, type: t.type, des: t.des, link: t.link }));

                responseText = template.template.replace("{tools}", matchedTools.map(t => t.title).join(", "));

                return res.status(200).json({ response: responseText, tools: matchedTools, library: matchedLibrary });
            }
        }
        
        return res.status(200).json({ response: responseText });
    } catch (error) {
        return res.status(500).json({ message: "Failed to load data", error: error.message });
    }

}