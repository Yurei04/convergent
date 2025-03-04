"use client";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  Tabs,
  TabsContent,
  TabsList,
  TabsTrigger,
} from "@/components/ui/tabs";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";

import PdfParse from "pdf-parse";
import * as mammoth from "mammoth"; 
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";

export default function AnalyzeResume() {
  const [resumeText, setResumeText] = useState("");
  const [jobDatabase, setJobDatabase] = useState([]);
  const [recommendedJobs, setRecommendedJobs] = useState([]);
  const [openDialog, setOpenDialog] = useState(false);
  const router = useRouter();

  useEffect(() => {
    fetch("/database/data/resources.json")
      .then((res) => res.json())
      .then((data) => setJobDatabase(data))
      .catch((err) => console.error("Failed to load job database:", err));
  }, []);

  // Handle File Upload
  const handleFileUpload = async (event) => {
    const file = event.target.files?.[0];
    if (!file) return;

    const reader = new FileReader();
    reader.onload = async (e) => {
      const fileData = e.target.result;
      if (file.type === "application/pdf") {
        try {
          const pdfData = await PdfParse(Buffer.from(new Uint8Array(fileData)));
          setResumeText(pdfData.text);
        } catch (error) {
          console.error("PDF parsing error:", error);
        }
      } else if (
        file.type ===
        "application/vnd.openxmlformats-officedocument.wordprocessingml.document"
      ) {
        try {
          const docxText = await mammoth.extractRawText({
            arrayBuffer: fileData,
          });
          setResumeText(docxText.value);
        } catch (error) {
          console.error("DOCX parsing error:", error);
        }
      } else {
        alert("Unsupported file format. Please upload a PDF or DOCX.");
      }
    };
    reader.readAsArrayBuffer(file);
  };

  const analyzeResume = () => {
    if (!jobDatabase.length) return;
    const matchedJobs = jobDatabase.filter((entry) =>
      entry.job.keywords.some((keyword) =>
        resumeText.toLowerCase().includes(keyword)
      )
    );
    setRecommendedJobs(matchedJobs);
    setOpenDialog(true);
  };

  const goToApplyPage = () => {
    router.push("/apply");
  };

  return (
    <div className="items-center justify-center flex mt-5">
      <Tabs defaultValue="account" className="w-[400px]">
        <TabsList className="grid w-full grid-cols-2">
          <TabsTrigger value="account">With DID</TabsTrigger>
          <TabsTrigger value="password">Without DID</TabsTrigger>
        </TabsList>

        {["account", "password"].map((tabValue) => (
          <TabsContent key={tabValue} value={tabValue}>
            <Card>
              <CardHeader>
                <CardTitle>
                  {tabValue === "account" ? "With DID" : "Without DID"}
                </CardTitle>
                <CardDescription>
                  Upload your resume and analyze job matches.
                </CardDescription>
              </CardHeader>
              <CardContent>
                <Label htmlFor="resumeUpload">Upload Resume</Label>
                <Input
                  id="resumeUpload"
                  type="file"
                  accept=".pdf,.docx"
                  onChange={handleFileUpload}
                />
              </CardContent>
              <CardFooter>
                <Button onClick={analyzeResume}>Analyze</Button>
              </CardFooter>
            </Card>
          </TabsContent>
        ))}

        <Dialog open={openDialog} onOpenChange={setOpenDialog}>
          <DialogContent>
            <DialogHeader>
              <DialogTitle>Recommended Jobs</DialogTitle>
            </DialogHeader>

            {recommendedJobs.length > 0 ? (
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
                  {recommendedJobs.map((entry, index) => (
                    <TableRow key={index}>
                      <TableCell>{entry.job.title}</TableCell>
                      <TableCell>{entry.job.specifics.type}</TableCell>
                      <TableCell>
                        <a
                          href={entry.job.specifics.resources.tutorials.links}
                          target="_blank"
                          className="text-blue-500"
                        >
                          Tutorials
                        </a>
                        ,{" "}
                        <a
                          href={entry.job.specifics.resources.videos.links}
                          target="_blank"
                          className="text-blue-500"
                        >
                          Videos
                        </a>
                      </TableCell>
                      <TableCell>
                        <a
                          href={entry.job.specifics.Tools.web.links}
                          target="_blank"
                          className="text-blue-500"
                        >
                          Web Tools
                        </a>
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            ) : (
              <p>No matching jobs found.</p>
            )}

            <Button className="w-full mt-4" onClick={goToApplyPage}>
              Apply Now
            </Button>
          </DialogContent>
        </Dialog>
      </Tabs>
    </div>
  );
}
