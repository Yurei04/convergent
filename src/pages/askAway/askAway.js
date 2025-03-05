"use client";

import { useEffect, useState, useRef } from "react";
import { Card, CardContent, CardHeader } from "@/components/ui/card";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Table, TableHeader, TableRow, TableHead, TableBody, TableCell } from "@/components/ui/table";

export default function SustineoChatbot() {
    const [libraryDatabase, setLibraryDatabase] = useState([]);
    const [basicDatabase, setBasicDatabase] = useState([]);
    const [toolDatabase, setToolDatabase] = useState([]);
    const [templateDatabase, setTemplateDatabase] = useState([]);

    const [defaultLibrary, setDefaultLibrary] = useState([]);
    const [defaultTool, setDefaultTool] = useState([]);
    const [defaultBasic, setDefaultBasic] = useState([]);

    const [messages, setMessages] = useState([{ role: "bot", content: "Hello, how can I help you today?" }]);
    const [query, setQuery] = useState("");
    const chatEndRef = useRef(null);

    // Load database files
    useEffect(() => {
        const fetchData = async () => {
            try {
                const [basicRes, toolsRes, libraryRes, templateRes] = await Promise.all([
                    fetch("/database/template/basics.json").then(res => res.json()),
                    fetch("/database/data/tools.json").then(res => res.json()),
                    fetch("/database/data/library.json").then(res => res.json()),
                    fetch("/database/template/templates.json").then(res => res.json())
                ]);

                console.log("Databases Loaded:", { basicRes, toolsRes, libraryRes, templateRes });

                setBasicDatabase(basicRes || []);
                setToolDatabase(toolsRes || []);
                setLibraryDatabase(libraryRes || []);
                setTemplateDatabase(templateRes || []);
            } catch (error) {
                console.error("Failed to load databases:", error);
                setMessages([{ role: "bot", content: "Error loading resources. Please refresh the page." }]);
            }
        };

        fetchData();
    }, []);

    useEffect(() => {
        chatEndRef.current?.scrollIntoView({ behavior: "smooth" });
    }, [messages]);

    function searchTool() {
        if (!toolDatabase.length) return;

        // Filter jobs based on title or keywords
        const filteredJobs = toolDatabase.filter((item) => {
            const tool = item.tool;
            const titleMatch = tool.title.toLowerCase().includes(searchTerm.toLowerCase());
            const keywordMatch = tool.keywords.some((keyword) =>
                keyword.toLowerCase().includes(searchTerm.toLowerCase())
            );
            return titleMatch || keywordMatch;
        });
        setDefaultTool(filteredJobs);
    }
    
    function searchLibrary() {
        if (!libraryDatabase.length) return;

        // Filter jobs based on title or keywords
        const filteredJobs = libraryDatabase.filter((item) => {
            const library = item.library;
            const titleMatch = library.title.toLowerCase().includes(searchTerm.toLowerCase());
            const keywordMatch = library.keywords.some((keyword) =>
                keyword.toLowerCase().includes(searchTerm.toLowerCase())
            );
            return titleMatch || keywordMatch;
        });
        setDefaultLibrary(filteredJobs);
    }

    const sendMessage = async () => {
        if (!query.trim()) return;

        const lowerQuery = query.toLowerCase();
        const userMessage = { role: "user", content: query };
        setMessages(prev => [...prev, userMessage]);
        setQuery("");

        const greetings = ["hello", "hi", "hey", "good morning", "good evening"];
        const requestWords = ["help", "recommend", "suggest", "need", "assist"];

        const containsGreeting = greetings.some(word => lowerQuery.includes(word));
        const containsRequest = requestWords.some(word => lowerQuery.includes(word));

        let botResponse = "Sorry, I do not understand.";

        if (containsGreeting && !containsRequest) {

            const filteredResponse = basicDatabase.filter((item) => {
                const basics = item.basics;
                const titleMatch = basics.title.toLowerCase().includes(searchTerm.toLowerCase());
                const keywordMatch = basics.keywords.some((keyword) =>
                    keyword.toLowerCase().includes(searchTerm.toLowerCase())
                );
                return titleMatch || keywordMatch;
            });

            setDefaultBasic(filteredResponse);

            botResponse = basicResponse.response;

        } else if (containsRequest) {
            searchTool();
            searchLibrary();
        } else {
            botResponse = "Sorry, I do not understand.";
        }

        setMessages(prev => [...prev, { role: "bot", content: botResponse }]);
    };

    return (
        <div className="flex flex-col items-center h-screen p-4">
            <Card className="w-full max-w-lg h-full flex flex-col shadow-lg rounded-2xl">
                <CardHeader className="flex-1 overflow-hidden p-4 bg-gray-100">
                    <ScrollArea className="h-full flex flex-col-reverse">
                        <div className="flex flex-col gap-3">
                            {messages.map((msg, index) => (
                                <div key={index} className={`p-3 rounded-lg max-w-[80%] ${
                                    msg.role === "user" ? "self-end bg-blue-500 text-white" : "self-start bg-gray-300 text-black"
                                }`}>
                                    {msg.content}
                                </div>
                            ))}
                            <div ref={chatEndRef} />
                        </div>
                    </ScrollArea>
                </CardHeader>
                <CardContent>
                {defaultTool.length > 0 ?(
                            <Table>
                                <TableHeader>
                                    <h2>Recommendations</h2>
                                    <TableRow>
                                        <TableHead>Job Title</TableHead>
                                        <TableHead>Type</TableHead>
                                        <TableHead>Resources</TableHead>
                                        <TableHead>Tools</TableHead>
                                    </TableRow>
                                </TableHeader>
                                <TableBody>
                                    {defaultTool.map((toolItem, index) => {
                                        const tool = toolItem.tool;
                                        return (
                                        <TableRow key={index}>
                                        <TableCell>{tool.title || "#"}</TableCell>
                                        <TableCell>{tool.type || "#"}</TableCell>
                                        <TableCell>{tool.des || "#"}</TableCell>
                                        <TableCell>
                                            <a
                                            href={tool.link || "#"}
                                            target="_blank"
                                            className="text-blue-500"
                                            >
                                            Web Tools
                                            </a>
                                        </TableCell>
                                        </TableRow>
                                        );
                                    })}
                                </TableBody>
                            </Table>
                ) : (
                    setMessages([{ role: "bot", content: "No available information" }])
                )}
                 {defaultLibrary.length > 0 ?(
                            <Table>
                                <TableHeader>
                                    <h2>Recommendations</h2>
                                    <TableRow>
                                        <TableHead>Job Title</TableHead>
                                        <TableHead>Type</TableHead>
                                        <TableHead>Resources</TableHead>
                                        <TableHead>Information</TableHead>
                                    </TableRow>
                                </TableHeader>
                                <TableBody>
                                    {defaultTool.map((libraryItem, index) => {
                                        const library = libraryItem.tool;
                                        return (
                                        <TableRow key={index}>
                                        <TableCell>{library.title || "#"}</TableCell>
                                        <TableCell>{library.type || "#"}</TableCell>
                                        <TableCell>{library.des || "#"}</TableCell>
                                        <TableCell>
                                            <a
                                            href={library.link || "#"}
                                            target="_blank"
                                            className="text-blue-500"
                                            >
                                            Web Information
                                            </a>
                                        </TableCell>
                                        </TableRow>
                                        );
                                    })}
                                </TableBody>
                            </Table>
                ) : (
                    setMessages([{ role: "bot", content: "No available tool" }])
                )}
                </CardContent>
                    
                <div className="flex gap-2 p-4 border-t bg-white">
                    <Input type="text" placeholder="Type a message..." value={query} onChange={(e) => setQuery(e.target.value)} className="flex-1" />
                    <Button onClick={sendMessage}>Send</Button>
                </div>
            </Card>
        </div>
    );
}
