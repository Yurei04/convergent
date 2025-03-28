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

    function searchTool(query) {
        if (!toolDatabase.length) return;
    
        const filteredTools = toolDatabase.filter((item) => {
            return (
                item.tool.title.toLowerCase().includes(query) ||
                item.tool.keywords.some((keyword) => query.includes(keyword.toLowerCase()))
            );
        });
    
        setDefaultTool(filteredTools);
    }
    
    function searchLibrary(query) {
        if (!libraryDatabase.length) return;
    
        const filteredLibraries = libraryDatabase.filter((item) => {
            return (
                item.libraryBook.title.toLowerCase().includes(query) ||
                item.libraryBook.keywords.some((keyword) => query.includes(keyword.toLowerCase()))
            );
        });
    
        setDefaultLibrary(filteredLibraries);
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
                return item.keywords.some((keyword) => lowerQuery.includes(keyword.toLowerCase()));
            });
    
            if (filteredResponse.length > 0) {
                botResponse = filteredResponse[0].response || "I don't have an answer for that.";
            } else {
                botResponse = "Hello! How can I assist you today?";
            }
        } else if (containsRequest) {
            searchLibrary(lowerQuery);
            searchTool(lowerQuery);

            botResponse = "Here are some recommendations based on your request.";
        }
    
        setMessages(prev => [...prev, { role: "bot", content: botResponse }]);
    };

    return (
        <div className="flex flex-col items-center h-screen p-4 w-full">
        <h1 className="text-transparent bg-clip-text bg-gradient-to-r from-blue-500 to-teal-400 items-center justify-center text-2xl">
            Sustineo 
        </h1>
            <Card className="w-full max-w-lg h-full flex flex-col shadow-lg rounded-2xl">
                <CardHeader className="flex-1 overflow-hidden p-4 bg-white dark:bg-gray-900">
                    <ScrollArea className="h-full flex flex-col-reverse">
                        <div className="flex flex-col gap-3">
                            {messages.map((msg, index) => (
                                <div key={index} className={`p-3 rounded-lg max-w-[80%] ${
                                    msg.role === "user" ? "self-end bg-blue-500 text-white dark:text-black" : "self-start bg-gray-300 text-black"
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
                                    <TableRow>
                                        <TableHead>Tool Name</TableHead>
                                        <TableHead>Tool Type</TableHead>
                                        <TableHead>Tool Description</TableHead>
                                        <TableHead>Tool Link</TableHead>
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
                    defaultTool.length === 0 && messages[messages.length - 1]?.content !== "No available information" &&
                    setMessages(prev => [...prev, { role: "bot", content: "No available information" }])

                )}
                 {defaultLibrary.length > 0 ?(
                            <Table>

                                <TableHeader>
                                    <TableRow>
                                        <TableHead>Information Title</TableHead>
                                        <TableHead>Type</TableHead>
                                        <TableHead>Description</TableHead>
                                        <TableHead>Link</TableHead>
                                    </TableRow>
                                </TableHeader>
                                <TableBody>
                                    {defaultLibrary.map((libraryItem, index) => {
                                    if (!libraryItem || !libraryItem.libraryBook) return null;
                                    const libraryBook = libraryItem.libraryBook;

                                        return (
                                        <TableRow key={index}>
                                        <TableCell>{libraryBook.title || "#"}</TableCell>
                                        <TableCell>{libraryBook.type || "#"}</TableCell>
                                        <TableCell>{libraryBook.des || "#"}</TableCell>
                                        <TableCell>
                                            <a
                                            href={libraryBook.link || "#"}
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
                    defaultLibrary.length === 0 && messages[messages.length - 1]?.content !== "No available information" &&
                    setMessages(prev => [...prev, { role: "bot", content: "No available information" }])

                )}
                </CardContent>
                    
                <div className="flex gap-2 p-4 border-t bg-white dark:bg-gray-900">
                    <Input type="text" placeholder="Type a message..." value={query} onChange={(e) => setQuery(e.target.value)} className="flex-1" />
                    <Button onClick={sendMessage}>Send</Button>
                </div>
            </Card>
        </div>
    );
}
