import { ThemeProvider } from "@/components/theme-provider"
import NavigationMenuDemo from "@/components/public/navbar";
import LibraryHub from "./resourceHub/libraryHub";
import ToolHub from "./resourceHub/toolsHub";
import "@/app/globals.css";
import { Button } from "@/components/ui/button";
import {
    Card,
    CardContent,
    CardDescription,
    CardFooter,
    CardHeader,
    CardTitle,
  } from "@/components/ui/card"
  
import {
      Dialog,
      DialogContent,
      DialogDescription,
      DialogHeader,
      DialogTitle,
      DialogTrigger,
      DialogFooter,
      DialogClose
} from "@/components/ui/dialog";
import Link from "next/link";


export default function ResourceHub () {
    return (
        <div className="items-center justify-items-center min-h-screen sm:p-10">
            <ThemeProvider
                attribute="class"
                defaultTheme="dark"
                enableSystem
            >
             <NavigationMenuDemo />
             <br />
             <h1 className="text-transparent bg-clip-text bg-gradient-to-r from-blue-500 to-teal-400 text-4xl m-10">
                Resource Hub
            </h1>
            <div className="flex flex-col items-center w-full max-w-screen-lg mx-auto gap-6">
                <Card className="w-full max-w-2xl">
                    <CardHeader>
                        <CardTitle>Library Hub</CardTitle>
                        <CardDescription>Page where you can search and scroll information you need</CardDescription>
                    </CardHeader>
                    <CardContent className="items-center flex gap-2">


                                <Button>
                                <Link href={"/subPage/libraryHubHome"}>Lets Go!</Link>
                                </Button>    



                    </CardContent>
                    <CardFooter className="flex justify-between">
                        <CardDescription>Deploy your new project in one-click.</CardDescription>
                    </CardFooter>
                </Card>

                <Card className="w-full max-w-2xl">
                    <CardHeader>
                        <CardTitle>Tool Shed</CardTitle>
                        <CardDescription>Page where you can search and scroll tools you need</CardDescription>
                    </CardHeader>
                    <CardContent className="items-center flex gap-2">

                                <Button>
                                    <Link href={"/subPage/toolShedHome"}>Lets Go!</Link>
                                </Button>    

                           
                    </CardContent>
                    <CardFooter className="flex justify-between">
                        <CardDescription>Deploy your new project in one-click.</CardDescription>
                    </CardFooter>
                </Card>
            </div>

        </ThemeProvider>
        </div>
    )
}