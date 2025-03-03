import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import {
  Tabs,
  TabsContent,
  TabsList,
  TabsTrigger,
} from "@/components/ui/tabs"

import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog"

import {
    Card,
    CardContent,
    CardDescription,
    CardFooter,
    CardHeader,
    CardTitle,
  } from "@/components/ui/card"




export default function AnalyzeResume() {
<div className="items-center justify-center flex mt-5">
                <Tabs defaultValue="account" className="w-[400px]">
                <TabsList className="grid w-full grid-cols-2">
                    <TabsTrigger value="account">With DID</TabsTrigger>
                    <TabsTrigger value="password">Without DID</TabsTrigger>
                </TabsList>
                <TabsContent value="account">
                    <Card>
                    <CardHeader>
                        <CardTitle>With DID</CardTitle>
                        <CardDescription>
                            Make changes to your account here. Click save when you're done.
                        </CardDescription>
                    </CardHeader>
                    <CardContent className="space-y-2">
                        <div className="space-y-1">
                        <Label htmlFor="name">Name</Label>
                        <Input id="name" defaultValue="Pedro Duarte" />
                        </div>
                        <div className="grid w-full max-w-sm items-center gap-1.5">
                        <Label htmlFor="pdf, docx">Resume</Label>
                        <Input id="picture" type="file" />
                        </div>
                    </CardContent>
                    <CardFooter>
                        <DialogTrigger>
                            <Button>Analyze</Button>
                        </DialogTrigger>
                    </CardFooter>
                    </Card>
                    <Dialog>
                        {/* ADD HERE THE RESULTS OF THE ANALYSIS FROM SCRIPTUM */}
                        <DialogContent>
                            <DialogHeader>
                            <DialogTitle>Results</DialogTitle>
                            <DialogDescription>
                                RANDOM RANDOM BLAH BLAH
                            </DialogDescription>
                            </DialogHeader>
                        </DialogContent>
                    </Dialog>
                </TabsContent>

                <TabsContent value="password">
                    <Card>
                    <CardHeader>
                        <CardTitle>Without DID</CardTitle>
                        <CardDescription>
                            Change your password here. After saving, you'll be logged out.
                        </CardDescription>
                    </CardHeader>
                    <CardContent className="space-y-2">
                        <div className="space-y-1">
                        <Label htmlFor="current">Name</Label>
                        <Input id="current" type="password" />
                        </div>
                        <div className="grid w-full max-w-sm items-center gap-1.5">
                        <Label htmlFor="pdf, docx">Resume</Label>
                        <Input id="picture" type="file" />
                        </div>
                    </CardContent>
                    <CardFooter>
                        <DialogTrigger>
                            <Button>Analyze</Button>
                        </DialogTrigger>
                    </CardFooter>
                    </Card>
                    <Dialog>
                        {/* ADD HERE THE RESULTS OF THE ANALYSIS FROM SCRIPTUM */}
                        <DialogContent>
                            <DialogHeader>
                            <DialogTitle>Results</DialogTitle>
                            <DialogDescription>
                                RANDOM RANDOM BLAH BLAH
                            </DialogDescription>
                            </DialogHeader>
                        </DialogContent>
                    </Dialog>

                </TabsContent>
                </Tabs>
            </div>
}
