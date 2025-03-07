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
import CreateResume from "./createResume";

const jobKeywords = [
  "code", "think", "develop", "debug", "deploy",
  "analyze", "data", "machine learning", "AI",
  "security", "penetration testing", "firewall", "hacking",
  "design", "illustration", "branding", "UI/UX"
];

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

    reader.onload = async (e) => {
      try {
        const base64String = e.target.result.split(",")[1]; 

        const response = await fetch("/api/parseResume", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ file: base64String }),
        });

        if (!response.ok) {
          console.error("API request failed:", response.status, response.statusText);
          return;
        }

        const result = await response.json();

        if (!result.keywords) {
          console.error("No keywords found in API response", result);
          return;
        }

        console.log("Extracted Keywords:", result.keywords);
        setResumeText(result.keywords.join(", ")); 

      } catch (error) {
        console.error("Error parsing resume:", error);
      }
    };

    reader.readAsDataURL(file);
  };


  const analyzeResume = () => {
    if (!jobDatabase.length) return;
    console.log("Check 3")
    const { matches, recommendations } = findMatchingJob(resumeText, jobDatabase);
    
    console.log("Exact Matches:", matches);
    console.log("Recommended Alternatives:", recommendations);
  
    setRecommendedJobs(matches.length > 0 ? matches : recommendations);
    setOpenDialog(true);
  };

  const goToApplyPage = () => {
    router.push("/apply");
  };

  function findMatchingJob(resumeText, jobDatabase) {
    let matches = [];
    let recommendations = [];

    resumeText = resumeText.toLowerCase();

    jobDatabase.forEach(jobEntry => {
      const { title, keywords } = jobEntry.job;
      const jobTitle = title.toLowerCase();

      if (resumeText.includes(jobTitle) || keywords.some(kw => resumeText.includes(kw.toLowerCase()))) {
        matches.push(jobEntry);
      } else {
        recommendations.push(jobEntry);
      }
    });

    console.log("Calling findMatchingJob with:", resumeText, jobDatabase);

    if (matches.length > 0) {
      return { matches, recommendations: [] }; 
    } else {
      return { matches: [], recommendations: recommendations.slice(0, 3) };
    }
  }


  return (
    <div className="items-center justify-center flex-col mt-5">
        <h1 className="text-transparent bg-clip-text bg-gradient-to-r from-blue-500 to-teal-400 items-center justify-center text-2xl">
            Scriptum 
        </h1>
        <br />
      <Tabs defaultValue="Analyze" className="w-[400px]">
        <TabsList className="grid w-full grid-cols-2">
          <TabsTrigger value="Analyze">Analyze</TabsTrigger>
          <TabsTrigger value="Create">Create</TabsTrigger>
        </TabsList>

        {["Analyze"].map((tabValue) => (
          <TabsContent key={tabValue} value={tabValue}>
            <Card>
              <CardHeader>
                <CardTitle>
                  {tabValue === "Analyze" ? "Create" : "Create"}
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

        {["Create"].map((tabValue) => (
          <TabsContent key={tabValue} value={tabValue}>
            <CardContent>
              <CreateResume />
            </CardContent>
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
