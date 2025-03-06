import NavigationMenuDemo from "@/components/public/navbar";
import JobSeeker from "../jobSeek";
import "@/app/globals.css";
import { ThemeProvider } from "@/components/theme-provider"

export default function ScriptumHome() {
    return (
        <div className="items-center justify-items-center min-h-screen sm:p-10">
        <ThemeProvider
            attribute="class"
            defaultTheme="dark"
            enableSystem
          >
            <NavigationMenuDemo />
            <JobSeeker />
        </ThemeProvider>
        </div>
    )
}