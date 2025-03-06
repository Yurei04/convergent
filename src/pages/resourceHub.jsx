"use client"

import NavigationMenuDemo from "@/components/public/navbar";
import LibraryHub from "./resourceHub/libraryHub";
import ToolHub from "./resourceHub/toolsHub";
import "@/app/globals.css";

export default function ResourceHub () {
    return (
        <div className="items-center justify-items-center min-h-screen sm:p-10">
             <NavigationMenuDemo />
             <br />
             <h1 className="text-transparent bg-clip-text bg-gradient-to-r from-blue-500 to-teal-400 text-4xl m-10">
                Resource Hub
            </h1>
        <div className="flex flex-row m-10">
        <ToolHub />
        <LibraryHub />
        </div>
        </div>
    )
}