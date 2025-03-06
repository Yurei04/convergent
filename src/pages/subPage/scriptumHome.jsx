import NavigationMenuDemo from "@/components/public/navbar";
import JobSeeker from "../jobSeek";
import "@/app/globals.css";

export default function ScriptumHome() {
    return (
        <div className="items-center justify-items-center min-h-screen sm:p-10">
            <NavigationMenuDemo />
            <JobSeeker />
        </div>
    )
}