import NavigationMenuDemo from "@/components/public/navbar";
import AnalyzeResume from "../jobSeek/jobAnalyze";
import "@/app/globals.css";
import { ThemeProvider } from "@/components/theme-provider"

export default function ScriptumHomeFunc() {
    return (
        <div className="items-center justify-items-center min-h-screen sm:p-10">
        <ThemeProvider
            attribute="class"
            defaultTheme="dark"
            enableSystem
        >
            <NavigationMenuDemo />
            <AnalyzeResume />
        </ThemeProvider>
        </div>
    )
}