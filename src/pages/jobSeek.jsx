"use client"

import {
    Card,
    CardContent,
    CardDescription,
    CardFooter,
    CardHeader,
    CardTitle,
} from "@/components/ui/card"

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
DialogTrigger,
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


export default function JobSeeker() {
    const [jobDatabase, setJobDatabase] = useState([]);
    const [defaultJobs, setDefaultJobs] = useState([]);
    const [searchTerm, setSearchTerm] = useState("");
    const [openDialog, setOpenDialog] = useState(false);

    useEffect(() => {
        fetch("/database/data/resource.json")
        .then((res) => res.json())
        .then((data) => {
            console.log("Database JobSeek Loaded", data)
            setJobDatabase(data);
        })
        .catch((error) => console.error("Failed to load job database:", error));
    }, []);

    function searchJob() {
        if (!jobDatabase.length) return;

        // Filter jobs based on title or keywords
        const filteredJobs = jobDatabase.filter((item) => {
            const job = item.job;
            const titleMatch = job.title.toLowerCase().includes(searchTerm.toLowerCase());
            const keywordMatch = job.keywords.some((keyword) =>
                keyword.toLowerCase().includes(searchTerm.toLowerCase())
            );
            return titleMatch || keywordMatch;
        });
        setOpenDialog(true)
        setDefaultJobs(filteredJobs);
    }


    return (
        <div className="relative lg:py-22 py-20 items-center">
        <h1 className="text-transparent bg-clip-text bg-gradient-to-r from-blue-500 to-teal-400 items-center justify-center text-2xl">
            Job Seeker with Vox Quae
        </h1>
        <div className="flex w-full max-w-sm items-center space-x-2">
            <Input
                type="text"
                placeholder="Search Jobs"
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
            ></Input>
            <Button type="submit" onClick={searchJob}>
                Search
            </Button>

        </div>
        <br />
        <div>
            {/* Display Searched Jobs */}
            {defaultJobs.length > 0 ? (
                <Dialog open={openDialog} onOpenChange={setOpenDialog}>
                    <DialogHeader>
                        <DialogTitle >
                            Job Search Results
                        </DialogTitle>
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
                                {defaultJobs.map((jobItem, index) => {
                                    const job = jobItem.job;
                                    return (
                                        <TableRow key={index}>
                                        <TableCell>{job.title || "#"}</TableCell>
                                        <TableCell>{job.specifics.type || "#"}</TableCell>
                                        <TableCell>
                                          <a
                                            href={job.specifics.resources.tutorials.links || "#"}
                                            target="_blank"
                                            className="text-blue-500"
                                          >
                                            Tutorials
                                          </a>
                                          ,{" "}
                                          <a
                                            href={job.specifics.resources.videos.links || "#"}
                                            target="_blank"
                                            className="text-blue-500"
                                          >
                                            Videos
                                          </a>
                                        </TableCell>
                                        <TableCell>
                                          <a
                                            href={job.specifics.Tools.web.links || "#"}
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
                    {jobDatabase.map((jobItem, index) => {
                        const job = jobItem.job;
                        return (
                            <TableRow key={index}>
                            <TableCell>{job.title || "#"}</TableCell>
                            <TableCell>{job.specifics.type || "#"}</TableCell>
                            <TableCell>
                              <a
                                href={job.specifics.resources.tutorials.links || "#"}
                                target="_blank"
                                className="text-blue-500"
                              >
                                Tutorials
                              </a>
                              ,{" "}
                              <a
                                href={job.specifics.resources.videos.links || "#"}
                                target="_blank"
                                className="text-blue-500"
                              >
                                Videos
                              </a>
                            </TableCell>
                            <TableCell>
                              <a
                                href={job.specifics.Tools.web.links || "#"}
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

        {/* Resume Actions */}
        <div className="grid grid-cols-2 grid-rows-auto items-center justify-center gap-5 mt-5 sm:grid-cols-2 grid-row-1">
            <Card>
                <CardHeader>
                    <CardTitle>Analyze Resume</CardTitle>
                    <CardDescription>Upload and analyze your resume.</CardDescription>
                </CardHeader>
                <CardContent>
                    <Button>
                        <Link href={"/analyze-resume"}>Analyze</Link>
                    </Button>
                </CardContent>
                <CardFooter>
                    <p>Get insights from your resume.</p>
                </CardFooter>
            </Card>

            <Card>
                <CardHeader>
                    <CardTitle>Create Resume</CardTitle>
                    <CardDescription>Build a professional resume.</CardDescription>
                </CardHeader>
                <CardContent>
                    <Button>
                        <Link href={"/create-resume"}>Create</Link>
                    </Button>
                </CardContent>
                <CardFooter>
                    <p>Start crafting your resume now.</p>
                </CardFooter>
            </Card>
        </div>
        <br />
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
}