"use client";

import { useEffect, useState, useRef } from "react";
import { Card, CardContent } from "@/components/ui/card";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Table, TableHeader, TableRow, TableHead, TableBody, TableCell } from "@/components/ui/table";

export default function SustineoChatbot() {
    const [libraryDatabase, setLibraryDatabase] = useState([]);
    const [basicDatabase, setbasicDatabase] = useState([]);
    const [toolDatabase, setToolDatabase] = useState([]);
    const [templateDatabase, setTemplateDatabase] = useState([]);

    const [messages, setMessages] = useState([]);
    const [query, setQuery] = useState("");
    const chatEndRef = useRef(null);

    // Data base for basic Responses
    useEffect(() => {
        if (!basicDatabase.length) {
            setMessages([{ role: "bot", content: "I'm still loading resources, please try again." }]);
        }
        
        setMessages([{ role: "bot", content: "Hello, how can I help you today." }]);
        
        fetch("/database/template/basics.json")
        .then((res) => res.json())
        .then((data) => {
            console.log("Database Basic Sustineo Loaded", data)
            setbasicDatabase(data);
        })
        .catch((error) => console.error("Failed to load job database:", error));
    }, []); 


    // Database for tools 
    useEffect(() => {
        fetch("/database/data/tools.json")
        .then((res) => res.json())
        .then((data) => {
            console.log("Database Tools Sustineo Loaded", data)
            setToolDatabase(data);
        })
        .catch((error) => console.error("Failed to load job database:", error));
    }, []); 

    // database for library
    useEffect(() => {
        fetch("/database/data/library.json")
        .then((res) => res.json())
        .then((data) => {
            console.log("Database Library Sustineo Loaded", data)
            setLibraryDatabase(data);
        })
        .catch((error) => console.error("Failed to load job database:", error));
    }, []); 

    // database for responses template
    useEffect(() => {
        fetch("/database/template/templates.json")
        .then((res) => res.json())
        .then((data) => {
            console.log("Database Templates Sustineo Loaded", data)
            setTemplateDatabase(data);
        })
        .catch((error) => console.error("Failed to load job database:", error));
    }, []); 

    useEffect(() => {
        chatEndRef.current?.scrollIntoView({ behavior: "smooth" });
    }, [messages]);


    const sendMessage = async () => {
        if (!query.trim()) return;
    
        const lowerQuery = query.toLowerCase();
        const userMessage = { role: "user", content: query };
        setMessages((prev) => [...prev, userMessage]);
        setQuery("");
    
        const greetings = ["hello", "hi", "hey", "good morning", "good evening"];
        const requestWords = ["help", "recommend", "suggest", "need", "assist"];
    
        const containsGreeting = greetings.some((word) => lowerQuery.includes(word));
        const containsRequest = requestWords.some((word) => lowerQuery.includes(word));
    
        let botResponse;
    
        if (containsGreeting && !containsRequest) {
            const match = basicDatabase.find((entry) =>
                entry.keywords.some((keyword) => lowerQuery.includes(keyword.toLowerCase()))
            );
            botResponse = match ? match.response : "Hello! How can I assist you today?";
        } else  if (containsRequest) {
            const matchLibrary = libraryDatabase.find((entry) =>
                entry.keywords.some((keyword) => lowerQuery.includes(keyword.toLowerCase()))
            );
    
            const matchTool = toolDatabase.find((entry) =>
                entry.keywords.some((keyword) => lowerQuery.includes(keyword.toLowerCase()))
            );
    
            let resources = [];
    
            if (matchLibrary) {
                resources = [...resources, ...matchLibrary.resources];
            }
            if (matchTool) {
                resources = [...resources, ...matchTool.resources];
            }
    
            if (resources.length > 0) {
                const templateMatch = templateDatabase.find((template) =>
                    template.keywords.some((keyword) => lowerQuery.includes(keyword.toLowerCase()))
                );
    
                if (templateMatch) {
                    botResponse = templateMatch.response.replace("{tools}", resources.join(", "));
                } else {
                    botResponse = `I found some useful resources: ${resources.join(", ")}`;
                }
            } else {
                botResponse = "I couldn't find relevant resources.";
            }
        } else {
            botResponse = "Sorry I do not understand.";
        }
        setMessages((prev) => [...prev, { role: "bot", content: botResponse }]);
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
