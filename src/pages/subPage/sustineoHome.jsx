import Sustineo from "@/pages/sustineo/sustineo";
import NavigationMenuDemo from "@/components/public/navbar";
import "@/app/globals.css";

export default function SustineoHome() {
    return (
        <div className="items-center justify-items-center min-h-screen sm:p-10">
            <NavigationMenuDemo />
            <Sustineo />
        </div>
    )
}