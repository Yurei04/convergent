"use client"
import { Button } from "@/components/ui/button"
import { TypeAnimation } from "react-type-animation"
import * as React from "react"
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card"
 
export default function homepage() {
    return (
        <div className="relative lg:py-22 py-20 items-center">
            <div className="text-black mb-4 text-4xl sm:text-2xl lg:text-8xl">
                <h1>
                <span className="text-transparent bg-clip-text bg-gradient-to-r text-8xl from-blue-500 to-teal-400">
                    Convergent {" "}
                </span>
                <br />
                <TypeAnimation
                sequence={[
                    'One',
                    500,
                    'One Two', 
                    500,
                    'One Two Three',
                    500,
                    'One Two',
                    500,
                    'One',
                    500,
                    '',
                    500,
                ]}
                wrapper="span"
                style={{ fontSize: '0.5em' }}
                speed={50}
                repeat={Infinity}
                />
                </h1>
                <br />
                </div>
                <div className="items-center justify-center grid grid-cols-1 grid-rows-1 gap-4 sm:grid-cols-3 grid-rows-auto">
                    <Card className="w-[350px]">
                        <CardHeader>
                            <CardTitle>Scriptum</CardTitle>
                            <CardDescription>Deploy your new project in one-click.</CardDescription>
                        </CardHeader>
                        <CardContent className="items-center justify-center">
                            <Button>Start</Button>
                        </CardContent>
                        <CardFooter className="flex justify-between">
                            <CardDescription>Deploy your new project in one-click.</CardDescription>
                        </CardFooter>
                    </Card>
                    <Card className="w-[350px]">
                        <CardHeader>
                            <CardTitle>Scriptum</CardTitle>
                            <CardDescription>Deploy your new project in one-click.</CardDescription>
                        </CardHeader>
                        <CardContent className="items-center justify-center">
                            <Button>Start</Button>
                        </CardContent>
                        <CardFooter className="flex justify-between">
                            <CardDescription>Deploy your new project in one-click.</CardDescription>
                        </CardFooter>
                    </Card>
                    <Card className="w-[350px]">
                        <CardHeader>
                            <CardTitle>Scriptum</CardTitle>
                            <CardDescription>Deploy your new project in one-click.</CardDescription>
                        </CardHeader>
                        <CardContent className="items-center justify-center">
                            <Button>Start</Button>
                        </CardContent>
                        <CardFooter className="flex justify-between">
                            <CardDescription>Deploy your new project in one-click.</CardDescription>
                        </CardFooter>
                    </Card>
                </div>


        </div>
    )
}