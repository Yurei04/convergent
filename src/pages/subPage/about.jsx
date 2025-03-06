"use client"
import {
    Accordion,
    AccordionContent,
    AccordionItem,
    AccordionTrigger,
  } from "@/components/ui/accordion"


export default function About() {
    return (
        <div className="items-center justify-center min-w-lvh h-2/5 mt-10 text-center" id="About">
            <div className="text-transparent bg-clip-text bg-gradient-to-r from-blue-500 to-teal-400 items-center justify-center text-5xl">
                <h1>What is Convergent?</h1>
            </div>
            <br />
            <div className="items-center justify-center text-1xl">
                <Accordion type="single" collapsible className="w-full">
                    <AccordionItem value="item-1">
                        <AccordionTrigger>What is Convergent?</AccordionTrigger>
                        <AccordionContent>
                            Convergent is an AI-powered platform designed to streamline job matching and resume enhancement, making job applications more efficient and personalized.
                        </AccordionContent>
                    </AccordionItem>
                    <AccordionItem value="item-2">
                        <AccordionTrigger>How does it help job seekers?</AccordionTrigger>
                        <AccordionContent>
                            Convergent uses AI to analyze resumes, suggest improvements, and match candidates with job opportunities that best fit their skills and experience.
                        </AccordionContent>
                    </AccordionItem>
                    <AccordionItem value="item-3">
                        <AccordionTrigger>Is it secure and private?</AccordionTrigger>
                        <AccordionContent>
                            Yes. Convergent prioritizes user privacy by ensuring that personal data is only used for job matching and resume optimization without external exposure.
                        </AccordionContent>
                    </AccordionItem>
                </Accordion>
            </div>
        </div>
    )
}