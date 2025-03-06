"use client"
import {
    Accordion,
    AccordionContent,
    AccordionItem,
    AccordionTrigger,
  } from "@/components/ui/accordion"

export default function Goals() {
    return (
        <div className="items-center justify-center min-w-lvh mt-10 text-center" id="Goals">
            <div className="text-transparent bg-clip-text bg-gradient-to-r from-blue-500 to-teal-400 items-center justify-center text-5xl">
                <h1>Our Goals</h1>
            </div>
            <br />
            <div className="items-center justify-center text-1xl">
                <Accordion type="single" collapsible className="w-full">
                    <AccordionItem value="goal-1">
                        <AccordionTrigger>Enhancing Job Matching</AccordionTrigger>
                        <AccordionContent>
                            We aim to connect job seekers with opportunities that align with their skills and experience, making the hiring process more efficient and effective.
                        </AccordionContent>
                    </AccordionItem>
                    <AccordionItem value="goal-2">
                        <AccordionTrigger>Optimizing Resumes with AI</AccordionTrigger>
                        <AccordionContent>
                            Our AI-powered tools help users refine their resumes, ensuring they highlight key strengths and stand out to potential employers.
                        </AccordionContent>
                    </AccordionItem>
                    <AccordionItem value="goal-3">
                        <AccordionTrigger>Prioritizing User Privacy</AccordionTrigger>
                        <AccordionContent>
                            We are committed to protecting user data by ensuring that all information is used strictly for job matching and career development without unnecessary exposure.
                        </AccordionContent>
                    </AccordionItem>
                </Accordion>
            </div>
        </div>
    )
}