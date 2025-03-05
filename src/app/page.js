import Image from "next/image";
import LoginForm from "@/components/public/login-form"
import Homepage from "@/pages/homepage";
import NavigationMenuDemo from "@/components/public/navbar"
import JobSeeker from "@/pages/jobSeek";
import AnalyzeResume from "@/pages/jobSeek/jobAnalyze";
import CreateResume from "@/pages/jobSeek/createResume";
import LibraryHub from "@/pages/resourceHub/libraryHub";
import ToolHub from "@/pages/resourceHub/toolsHub";
import AskAway from "@/pages/askAway/askAway";

export default function Home() {
  return (
    <div className="items-center justify-items-center min-h-screen sm:p-10">
        <NavigationMenuDemo />
        <Homepage />
        <JobSeeker />
        <AnalyzeResume />
        <CreateResume />
        <AnalyzeResume />
        <LibraryHub />
        <ToolHub />
        <AskAway />
    </div>
  );
}
