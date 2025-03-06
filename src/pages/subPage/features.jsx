"use client"
import {
    Accordion,
    AccordionContent,
    AccordionItem,
    AccordionTrigger,
  } from "@/components/ui/accordion"


export default function Features() {
    return (
<div className="relative lg:py-22 py-20 items-center text-center">
    <div className="text-transparent bg-clip-text bg-gradient-to-r from-blue-500 to-teal-400 items-center justify-center text-5xl">
        <h1>Key Features</h1>
    </div>
    <br />
    <div className="items-center justify-center min-w-lvh h-2/5 mt-10 text-center" id="Features">
        <Accordion type="single" collapsible className="w-full">
            <AccordionItem value="feature-1">
                <AccordionTrigger>Vox Quae</AccordionTrigger>
                <AccordionContent>
                    An algorithm that can help you search your future job!
                </AccordionContent>
            </AccordionItem>
            <AccordionItem value="feature-2">
                <AccordionTrigger>Scriptum</AccordionTrigger>
                <AccordionContent>
                    Both analyzer and creator of resume to help you to identify jobs for you.
                </AccordionContent>
            </AccordionItem>
            <AccordionItem value="feature-3">
                <AccordionTrigger>Sustineo</AccordionTrigger>
                <AccordionContent>
                    Get tailored career advice and recommendations of information and tools for your needs.
                </AccordionContent>
            </AccordionItem>
            <AccordionItem value="feature-4">
                <AccordionTrigger>Resource Hub</AccordionTrigger>
                <AccordionContent>
                    Get Information and resourcecs that can help you accomodate your need no matter your circumstances, for the future or now!
                </AccordionContent>
            </AccordionItem>
        </Accordion>
    </div>
</div>

    )
}