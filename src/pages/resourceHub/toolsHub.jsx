"use client"

import * as React from "react"
import {
    Table,
    TableBody,
    TableCaption,
    TableCell,
    TableHead,
    TableHeader,
    TableRow,
} from "@/components/ui/table"
  

const tools = [
    {
        type: "",
        status: "",
        method: "",
        info: "",
        download: "",
    },
    {
        type: "",
        status: "",
        method: "",
        info: "",
        download: "",
    },
];

export default function ToolHub () {
    return (
        <div className="relative lg:py-22 py-20 items-center">
            <Table>
                <TableCaption>Library Hub</TableCaption>
                <TableHeader>
                    <TableRow>
                    <TableHead className="w-[100px]">Type</TableHead>
                    <TableHead>Status</TableHead>
                    <TableHead>Method</TableHead>
                    <TableHead>Info</TableHead>
                    <TableHead className="text-right">Link</TableHead>
                    </TableRow>
                </TableHeader>
                <TableBody>
                    {tools.map((tools) => (
                    <TableRow key={tools.tools}>
                        <TableCell className="font-medium">{tools.type}</TableCell>
                        <TableCell>{tools.status}</TableCell>
                        <TableCell>{tools.method}</TableCell>
                        <TableCell>{tools.info}</TableCell>
                        <TableCell className="text-right">{tools.link}</TableCell>
                    </TableRow>
                    ))}
                </TableBody>
                <TableFooter>
                    <TableRow>
                    <TableCell colSpan={3}></TableCell>
                    <TableCell className="text-right"></TableCell>
                    </TableRow>
                </TableFooter>
            </Table>
        </div>
    )
};