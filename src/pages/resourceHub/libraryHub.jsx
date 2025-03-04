"use client"

import {
    Table,
    TableBody,
    TableCaption,
    TableCell,
    TableHead,
    TableHeader,
    TableRow,
} from "@/components/ui/table"
  

const resources = [
    {
        type: "",
        status: "",
        method: "",
        link: "",
    },
    {
        type: "",
        status: "",
        method: "",
        link: "",
    },
];

export default function LibraryHub() {
    const [resourceDatabase, setResourceDatabase] = useState([]);
    const [recommendedJobs, setRecommendedJobs] = useState([]);
    const [openDialog, setOpenDialog] = useState(false);
    const router = useRouter();
    
    return (
        <div className="relative lg:py-22 py-20 items-center">
            <Table>
                <TableCaption>Library Hub</TableCaption>
                <TableHeader>
                    <TableRow>
                    <TableHead className="w-[100px]">Type</TableHead>
                    <TableHead>Status</TableHead>
                    <TableHead>Method</TableHead>
                    <TableHead className="text-right">Link</TableHead>
                    </TableRow>
                </TableHeader>
                <TableBody>
                    {resources.map((resources) => (
                    <TableRow key={resources.resources}>
                        <TableCell className="font-medium">{resources.type}</TableCell>
                        <TableCell>{resources.status}</TableCell>
                        <TableCell>{resources.method}</TableCell>
                        <TableCell className="text-right">{resources.link}</TableCell>
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
}