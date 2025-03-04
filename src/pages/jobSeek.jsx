import {
    Card,
    CardContent,
    CardDescription,
    CardFooter,
    CardHeader,
    CardTitle,
} from "@/components/ui/card"

import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import Link from "next/link"

export default function JobSeeker() {
    return (
        <div className="relative lg:py-22 py-20 items-center">
                <h1>Job Seeker with Scriptum</h1>
                <div className="flex w-full max-w-sm items-center space-x-2">
                    <Input type="text" placeholder="Search Jobs" />
                    <Button type="submit">Search</Button>
                </div>
            <div className="grid grid-cols-2 grid-rows-auto items-center justify-center gap-5 mt-5 sm:grid-cols-2 grid-row-1">
            <Card>
                <CardHeader>
                    <CardTitle>Analyze Resume</CardTitle>
                    <CardDescription>Card Description</CardDescription>
                </CardHeader>
                <CardContent>
                    <p>Card Content</p>
                    <Button>
                        <Link href={""}>
                            Analyze
                        </Link>
                    </Button>
                </CardContent>
                <CardFooter>
                    <p>Card Footer</p>
                </CardFooter>
            </Card>
            
            <Card>
                <CardHeader>
                    <CardTitle>Create Resume</CardTitle>
                    <CardDescription>Card Description</CardDescription>
                </CardHeader>
                <CardContent>
                    <p>Card Content</p>

                    <Button>
                        <Link href={""}>
                            Create
                        </Link>
                    </Button>
                </CardContent>
                <CardFooter>
                    <p>Card Footer</p>
                </CardFooter>
            </Card>
            </div>

        </div>
    )
}