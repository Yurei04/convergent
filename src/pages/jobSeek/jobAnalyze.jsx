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

import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";

export default function AnalyzeResume() {
  const [resumeText, setResumeText] = useState("");
  const [jobDatabase, setJobDatabase] = useState([]);
  const [recommendedJobs, setRecommendedJobs] = useState([]);
  const [openDialog, setOpenDialog] = useState(false);
  const router = useRouter();

  useEffect(() => {
    fetch("/database/data/resource.json")
      .then((res) => res.json())
      .then((data) => {
        console.log("Job database loaded:", data);
        setJobDatabase(data); 
      })
      .catch((error) => console.error("Failed to load job database:", error));
  }, []);

  // Handle File Upload
  const handleFileUpload = async (event) => {
    const file = event.target.files?.[0];
    if (!file) return;

    const reader = new FileReader();
    reader.readAsDataURL(file);
    reader.onload = async () => {
      const base64File = reader.result?.split(",")[1] || "";

      const response = await fetch("/components/scriptum/parseResume", {
        method: "POST",
        headers: { "Content-Type": "application/json"},
        body: JSON.stringify({ file: base64File })
      });
      const result = await response.json();
      setResumeText(result.text);
    };
  };

  const analyzeResume = () => {
    if (!jobDatabase.length) return;
    
    const { matches, recommendations } = findMatchingJob(resumeText, jobDatabase);
    
    console.log("Exact Matches:", matches);
    console.log("Recommended Alternatives:", recommendations);
  
    setRecommendedJobs(matches.length > 0 ? matches : recommendations);
    setOpenDialog(true);
  };
  
  const goToApplyPage = () => {
    router.push("/apply");
  };

  function findMatchingJob (resumeText, jobDatabase) {
    let matches = [];
    let recommendations = [];

    resumeText = resumeText.toLowerCase();

    jobDatabase.forEach(jobEntry => {
      const { title, keywords } = jobEntry.job;
      const jobTitle = title.toLowerCase();

      if(resumeText.includes(jobTitle) || keywords.some(kw => resumeText.includes(kw.toLowerCase()))) {
        matches.push(jobEntry);
      } else {
        recommendations.push(jobEntry);
      }
    });

    if (matches.length > 0) {
        return { matches, recommendations: [] }; 
    } else {
        return { matches: [], recommendations: recommendations.slice(0, 3) }; // Suggest 3 alternatives
    }
  }

  return (
    <div className="items-center justify-center flex-col mt-5">
        <h1 className="text-transparent bg-clip-text bg-gradient-to-r from-blue-500 to-teal-400 items-center justify-center text-2xl">
            Scriptum 
        </h1>
        <br />
      <Tabs defaultValue="withDID" className="w-[400px]">
        <TabsList className="grid w-full grid-cols-2">
          <TabsTrigger value="withDID">With DID</TabsTrigger>
          <TabsTrigger value="withoutDID">Without DID</TabsTrigger>
        </TabsList>

        {["withDID", "withoutDID"].map((tabValue) => (
          <TabsContent key={tabValue} value={tabValue}>
            <Card>
              <CardHeader>
                <CardTitle>
                  {tabValue === "withDID" ? "With DID" : "Without DID"}
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
                      <TableCell>{entry.job.title || "#"}</TableCell>
                      <TableCell>{entry.job.specifics.type || "#"}</TableCell>
                      <TableCell>
                        <a
                          href={entry.job.specifics.resources.tutorials.links || "#"}
                          target="_blank"
                          className="text-blue-500"
                        >
                          Tutorials
                        </a>
                        ,{" "}
                        <a
                          href={entry.job.specifics.resources.videos.links || "#"}
                          target="_blank"
                          className="text-blue-500"
                        >
                          Videos
                        </a>
                      </TableCell>
                      <TableCell>
                        <a
                          href={entry.job.specifics.Tools.web.links || "#"}
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
