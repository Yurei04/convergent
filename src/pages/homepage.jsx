"use client";
import React from "react";
import Image from "next/image";
import { TypeAnimation } from "react-type-animation";
import { motion } from "framer-motion";
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
} from "@/components/ui/dialog"

import Link from "next/link";


export default  function HomePage () {
  return (
    <div className="relative lg:py-22 py-20 items-center">
        <div className="grid grid-cols-1 sm:grid-cols-12 gap-8 items-center bg-opacity-80">
            <motion.div
                initial={{ opacity: 0, scale: 0.5 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ duration: 0.5 }}
                className="col-span-12 sm:col-span-8 text-center sm:text-left"
                >
                <h3 className="text-black mb-4 text-4xl sm:text-5xl lg:text-8xl">
                    <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-500 to-teal-400">
                        Convergent{" "}
                    </span>
                <br />
                <TypeAnimation
                    sequence={[
                    "Search",
                    1500,
                    "Learn, Apply",
                    1500,
                    "Search, Learn, Apply",
                    1500,
                    "Learn, Apply",
                    1500,
                    "Search",
                    1500,
                    "",
                    1500,
                    ]}
                    wrapper="span"
                    style={{ fontSize: "0.5em" }}
                    speed={50}
                    repeat={Infinity}
                />
                </h3>
                    <p className="text-[#ADB7BE] text-base sm:text-lg lg:text-xl mb-6">
                        Convergent find jobs no matter the circumstances.
                    </p>
        </motion.div>

        <motion.div
            initial={{ opacity: 0, scale: 0.5 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.5 }}
            className="col-span-12 sm:col-span-4 flex justify-center mt-4 lg:mt-0"
            >
            <div className="relative rounded-full bg-[#181818] w-60 h-60 lg:w-72 lg:h-72">
                <Image
                    src="/public/images/temp.png"
                    alt="logo image"
                    className="absolute transform -translate-x-1/2 -translate-y-1/2 top-1/2 left-1/2 object-fill"
                    width={300}
                    height={300}
                    objectFit="cover"
                />
            </div>
        </motion.div>
    </div>
    <br />
    <div className="items-center justify-center grid grid-cols-1 grid-rows-1 gap-4 sm:grid-cols-3 grid-rows-auto mt-5">
                <Card className="w-[350px]">
                    <CardHeader>
                        <CardTitle>Job Seeker</CardTitle>
                        <CardDescription>Analyze and Create your Resume</CardDescription>
                    </CardHeader>
                    <CardContent className="items-center flex gap-2">
                        <Button>
                            <Link href={"/jobSeek"}>Lets Go!</Link>
                        </Button>
                        <Dialog>
                        <DialogTrigger asChild>
                            <Button>Details</Button>    
                        </DialogTrigger>
                            <DialogContent>
                                <DialogHeader>
                                <DialogTitle>What is Scriptum?</DialogTitle>
                                <DialogDescription>
                                    Is a resume AI analyzer and creator that can help you find job base on your resume.
                                </DialogDescription>
                                </DialogHeader>
                                <DialogFooter className="sm:justify-start">
                                    <DialogClose asChild>
                                        <Button type="button">
                                            Close
                                        </Button>
                                    </DialogClose>
                                </DialogFooter>
                            </DialogContent>
                        </Dialog>
                    </CardContent>
                    <CardFooter className="flex justify-between">
                        <CardDescription>Deploy your new project in one-click.</CardDescription>
                    </CardFooter>
                </Card>


                <Card className="w-[350px]">
                    <CardHeader>
                        <CardTitle>Sustineo</CardTitle>
                        <CardDescription>An AI chatbot that provides answer and provide recommendation</CardDescription>
                    </CardHeader>
                    <CardContent className="items-center flex gap-2">
                        <Button>
                            <Link href={"/jobSeek"}>Lets Go!</Link>
                        </Button>
                        <Dialog>
                        <DialogTrigger asChild>
                            <Button>Details</Button>    
                        </DialogTrigger>
                            <DialogContent>
                                <DialogHeader>
                                <DialogTitle>Are you absolutely sure?</DialogTitle>
                                <DialogDescription>
                                    This action cannot be undone. This will permanently delete your account
                                    and remove your data from our servers.
                                </DialogDescription>
                                </DialogHeader>
                                <DialogFooter className="sm:justify-start">
                                    <DialogClose asChild>
                                        <Button type="button">
                                            Close
                                        </Button>
                                    </DialogClose>
                                </DialogFooter>
                            </DialogContent>
                        </Dialog>
                    </CardContent>
                    <CardFooter className="flex justify-between">
                        <CardDescription>Deploy your new project in one-click.</CardDescription>
                    </CardFooter>
                </Card>

                <Card className="w-[350px]">
                    <CardHeader>
                        <CardTitle>Resource Hub</CardTitle>
                        <CardDescription>Deploy your new project in one-click.</CardDescription>
                    </CardHeader>
                    <CardContent className="items-center flex gap-2">
                    <Button>
                            <Link href={"/jobSeek"}>Lets Go!</Link>
                        </Button>
                        <Dialog>
                        <DialogTrigger asChild>
                            <Button>Details</Button>    
                        </DialogTrigger>
                            <DialogContent>
                                <DialogHeader>
                                <DialogTitle>Are you absolutely sure?</DialogTitle>
                                <DialogDescription>
                                    This action cannot be undone. This will permanently delete your account
                                    and remove your data from our servers.
                                </DialogDescription>
                                </DialogHeader>
                                <DialogFooter className="sm:justify-start">
                                    <DialogClose asChild>
                                        <Button type="button">
                                            Close
                                        </Button>
                                    </DialogClose>
                                </DialogFooter>
                            </DialogContent>
                        </Dialog>
                    </CardContent>
                    <CardFooter className="flex justify-between">
                        <CardDescription>Deploy your new project in one-click.</CardDescription>
                    </CardFooter>
                </Card>
            </div>
</div>
  );
};


