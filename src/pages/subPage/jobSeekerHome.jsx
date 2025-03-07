
import NavigationMenuDemo from "@/components/public/navbar";
import "@/app/globals.css";
import { ThemeProvider } from "@/components/theme-provider"

import JobSeeker from "../jobSeek";

export default function SustineoHome() {
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