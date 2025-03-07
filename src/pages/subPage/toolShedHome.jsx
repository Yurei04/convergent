import ToolHub from "../resourceHub/toolsHub";
import NavigationMenuDemo from "@/components/public/navbar";
import "@/app/globals.css";
import { ThemeProvider } from "@/components/theme-provider"

export default function ToolHubHome() {
    return (
        <div className="items-center justify-items-center min-h-screen sm:p-10">
        <ThemeProvider
            attribute="class"
            defaultTheme="dark"
            enableSystem
          >
            <NavigationMenuDemo className="relative z-50"/>
            <br />
            <ToolHub />
            </ThemeProvider>
        </div>
    )
}