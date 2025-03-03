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


export default function ResourceHub () {
    return (
        <div className="relative lg:py-22 py-20 items-center">
             <div className="items-center justify-center grid grid-cols-1 grid-rows-1 gap-4 sm:grid-cols-3 grid-rows-auto mt-5">
                <Card className="w-[350px]">
                    <CardHeader>
                        <CardTitle>Resource Hub</CardTitle>
                        <CardDescription>Deploy your new project in one-click.</CardDescription>
                    </CardHeader>
                    <CardContent className="items-center flex gap-2">
                        <Button>Open</Button>
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
                        <CardTitle>Tool Shed</CardTitle>
                        <CardDescription>Deploy your new project in one-click.</CardDescription>
                    </CardHeader>
                    <CardContent className="items-center flex gap-2">
                            <Button>Open</Button>
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
    )
}