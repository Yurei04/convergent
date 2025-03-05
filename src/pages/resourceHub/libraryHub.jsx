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
import { useEffect, useState } from "react"

  
export default function LibraryHub () {
    const [libraryDatabase, setLibraryDatabase] = useState([]);
    const [defaultLibrary, setDefaultLibrary] = useState([]);
    const [searchTerm, setSearchTerm] = useState("");
    const [openDialog, setOpenDialog] = useState(false);

    useEffect(() => {
        fetch("/database/data/library.json")
        .then((res) => res.json())
        .then((data) => {
            console.log("Database Sustineo Loaded", data)
            setLibraryDatabase(data);
        })
        .catch((error) => console.error("Failed to load job database:", error));
    }, []); 

    function searchLibrary() {
        if (!libraryDatabase.length) return;

        // Filter jobs based on title or keywords
        const filteredJobs = libraryDatabase.filter((item) => {
            const tool = item.tool;
            const titleMatch = tool.title.toLowerCase().includes(searchTerm.toLowerCase());
            const keywordMatch = tool.keywords.some((keyword) =>
                keyword.toLowerCase().includes(searchTerm.toLowerCase())
            );
            return titleMatch || keywordMatch;
        });
        setOpenDialog(true)
        setDefaultLibrary(filteredJobs);
    }


    return (
        <div className="relative lg:py-22 py-20 items-center">
        <h1>Job Seeker with Scriptum</h1>
        <div className="flex w-full max-w-sm items-center space-x-2">
            <Input
                type="text"
                placeholder="Search Jobs"
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
            ></Input>
            <Button type="submit" onClick={searchLibrary}>
                Search
            </Button>

        </div>
        <br />
        <div>
           {/* Display Searched Jobs */}
           {defaultLibrary.length > 0 ? (
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
                                {defaultLibrary.map((libraryItem, index) => {
                                    const library = libraryItem.library;
                                    return (
                                        <TableRow key={index}>
                                        <TableCell>{library.title || "#"}</TableCell>
                                        <TableCell>{library.type || "#"}</TableCell>
                                        <TableCell>
                                          <a
                                            href={library.links || "#"}
                                            target="_blank"
                                            className="text-blue-500"
                                          >
                                            Tutorials
                                          </a>
                                        </TableCell>
                                        <TableCell>
                                          <a
                                            href={library.links || "#"}
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
                    {libraryDatabase.map((libraryItem, index) => {
                        const library = libraryItem.library;
                        return (
                            <TableRow key={index}>
                            <TableCell>{library.title || "#"}</TableCell>
                            <TableCell>{library.specifics.type || "#"}</TableCell>
                            <TableCell>
                              <a
                                href={library.specifics.resources.tutorials.links || "#"}
                                target="_blank"
                                className="text-blue-500"
                              >
                                Tutorials
                              </a>
                              ,{" "}
                              <a
                                href={library.specifics.resources.videos.links || "#"}
                                target="_blank"
                                className="text-blue-500"
                              >
                                Videos
                              </a>
                            </TableCell>
                            <TableCell>
                              <a
                                href={library.specifics.Tools.web.links || "#"}
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