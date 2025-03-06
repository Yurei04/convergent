import NavigationMenuDemo from "@/components/public/navbar";
import AnalyzeResume from "../jobSeek/jobAnalyze";
import "@/app/globals.css";

export default function ScriptumHomeFunc() {
    return (
        <div className="items-center justify-items-center min-h-screen sm:p-10">
            <NavigationMenuDemo />
            <AnalyzeResume />
        </div>
    )
}