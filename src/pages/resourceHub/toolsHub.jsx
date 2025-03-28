"use client"

import {
    Table,
    TableBody,
    TableCell,
    TableHead,
    TableHeader,
    TableRow,
  } from "@/components/ui/table";
  
import {
Dialog,
DialogContent,
DialogHeader,
DialogTitle,
} from "@/components/ui/dialog";

import {
    Pagination,
    PaginationContent,
    PaginationEllipsis,
    PaginationItem,
    PaginationLink,
    PaginationNext,
    PaginationPrevious,
  } from "@/components/ui/pagination"
  

import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import Link from "next/link"
import { useEffect, useState } from "react"

  
export default function ToolHub () {
    const [toolDatabase, setToolDatabase] = useState([]);
    const [defaultTool, setDefaultTool] = useState([]);
    const [searchTerm, setSearchTerm] = useState("");
    const [openDialog, setOpenDialog] = useState(false);

    useEffect(() => {
        fetch("/database/data/tools.json")
        .then((res) => res.json())
        .then((data) => {
            console.log("Database Sustineo Loaded", data)
            setToolDatabase(data);
        })
        .catch((error) => console.error("Failed to load job database:", error));
    }, []); 

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
        setOpenDialog(true)
        setDefaultTool(filteredJobs);
    }


    return (
        <div className="items-center border-1 p-1.5 m-1">
        <h1 className="text-transparent bg-clip-text bg-gradient-to-r from-blue-500 to-teal-400 items-center justify-center text-2xl">
            Tools Hub  
        </h1>
        <br />
        <div className="flex w-full max-w-sm items-center space-x-2">
            <Input
                type="text"
                placeholder="Search Jobs"
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
            ></Input>
            <Button type="submit" onClick={searchTool}>
                Search
            </Button>

        </div>
        <br />
        <div>
           {/* Display Searched Jobs */}
           {defaultTool.length > 0 ? (
                <Dialog open={openDialog} onOpenChange={setOpenDialog}>
                    <DialogHeader>
                        <DialogTitle>Job Search Results</DialogTitle>
                    </DialogHeader>
                    <DialogContent>
                        <Table>
                            <TableHeader>
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
                    </DialogContent>
                </Dialog>
            ) : (
                <p>No matching jobs found.</p>
            )}

            {/* Default Jobs Table */}
            <Table>
                <TableHeader>
                    <TableRow>
                        <TableHead>Job Title</TableHead>
                        <TableHead>Type</TableHead>
                        <TableHead>Resources</TableHead>
                        <TableHead>Tools</TableHead>
                    </TableRow>
                </TableHeader>
                <TableBody>
                    {toolDatabase.map((toolItem, index) => {
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
        </div>

        <div>
        <Pagination>
        <PaginationContent>
            <PaginationItem>
            <PaginationPrevious href="#" />
            </PaginationItem>
            <PaginationItem>
            <PaginationLink href="#">1</PaginationLink>
            </PaginationItem>
            <PaginationItem>
            <PaginationLink href="#">2</PaginationLink>
            </PaginationItem>
            <PaginationItem>
            <PaginationLink href="#">3</PaginationLink>
            </PaginationItem>
            <PaginationItem>
            <PaginationEllipsis />
            </PaginationItem>
            <PaginationItem>
            <PaginationNext href="#" />
            </PaginationItem>
        </PaginationContent>
        </Pagination>

        </div>
    </div>
    )
};