import Sustineo from "@/pages/sustineo/sustineo";
import NavigationMenuDemo from "@/components/public/navbar";
import "@/app/globals.css";
import { ThemeProvider } from "@/components/theme-provider"

export default function SustineoHome() {
    return (
        <div className="items-center justify-items-center min-h-screen sm:p-10">
        <ThemeProvider
            attribute="class"
            defaultTheme="dark"
            enableSystem
          >
            <NavigationMenuDemo />
            <Sustineo />
            </ThemeProvider>
        </div>
    )
}