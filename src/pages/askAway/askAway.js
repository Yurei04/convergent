"use client";

import { useEffect, useState, useRef } from "react";
import { Card, CardContent } from "@/components/ui/card";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Table, TableHeader, TableRow, TableHead, TableBody, TableCell } from "@/components/ui/table";

export default function SustineoChatbot() {
    const [messages, setMessages] = useState([]);
    const [query, setQuery] = useState("");
    const [database, setDatabase] = useState(null); // Store JSON data
    const chatEndRef = useRef(null);

    useEffect(() => {
        setMessages([{ role: "bot", content: "Hello! How can I assist you today?" }]);
        
        // Fetch the JSON database on mount
        fetch("/components/sustineo/sustineo")
            .then((res) => res.json())
            .then((data) => setDatabase(data))
            .catch((err) => console.error("Error loading database:", err));
    }, []);

    useEffect(() => {
        chatEndRef.current?.scrollIntoView({ behavior: "smooth" });
    }, [messages]);

    const findResponse = (userQuery) => {
        if (!database) return { response: "I'm not sure how to respond to that.", tools: [] };

        const lowerQuery = userQuery.toLowerCase();
        const match = database.responses.find((entry) =>
            entry.keywords.some((keyword) => lowerQuery.includes(keyword.toLowerCase()))
        );

        return match ? { response: match.response, tools: match.tools || [] } 
                     : { response: "I couldn't find relevant resources.", tools: [] };
    };

    const sendMessage = async () => {
        if (!query.trim()) return;

        const userMessage = { role: "user", content: query };
        setMessages((prev) => [...prev, userMessage]);
        setQuery("");

        const botResponse = findResponse(query);
        setMessages((prev) => [...prev, { role: "bot", content: botResponse.response, tools: botResponse.tools }]);
    };

    return (
        <div className="flex flex-col items-center h-screen p-4">
            <Card className="w-full max-w-lg h-full flex flex-col shadow-lg rounded-2xl">
                <CardContent className="flex-1 overflow-hidden p-4 bg-gray-100">
                    <ScrollArea className="h-full flex flex-col-reverse">
                        <div className="flex flex-col gap-3">
                            {messages.map((msg, index) => (
                                <div key={index} className={`p-3 rounded-lg max-w-[80%] ${
                                    msg.role === "user" ? "self-end bg-blue-500 text-white" : "self-start bg-gray-300 text-black"
                                }`}>
                                    {msg.content}
                                    {msg.tools?.length > 0 && (
                                        <Table className="mt-2">
                                            <TableHeader>
                                                <TableRow>
                                                    <TableHead>Title</TableHead>
                                                    <TableHead>Type</TableHead>
                                                    <TableHead>Description</TableHead>
                                                    <TableHead>Link</TableHead>
                                                </TableRow>
                                            </TableHeader>
                                            <TableBody>
                                                {msg.tools.map((tool, i) => (
                                                    <TableRow key={i}>
                                                        <TableCell>{tool.title}</TableCell>
                                                        <TableCell>{tool.type || "N/A"}</TableCell>
                                                        <TableCell>{tool.des || "No description"}</TableCell>
                                                        <TableCell>
                                                            {tool.link ? (
                                                                <a href={tool.link} target="_blank" className="text-blue-500 underline">
                                                                    Open
                                                                </a>
                                                            ) : "N/A"}
                                                        </TableCell>
                                                    </TableRow>
                                                ))}
                                            </TableBody>
                                        </Table>
                                    )}
                                </div>
                            ))}
                            <div ref={chatEndRef} />
                        </div>
                    </ScrollArea>
                </CardContent>
                <div className="flex gap-2 p-4 border-t bg-white">
                    <Input type="text" placeholder="Type a message..." value={query} onChange={(e) => setQuery(e.target.value)} className="flex-1" />
                    <Button onClick={sendMessage}>Send</Button>
                </div>
            </Card>
        </div>
    );
}
