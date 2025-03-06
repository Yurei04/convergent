import Homepage from "@/pages/homepage";
import NavigationMenuDemo from "@/components/public/navbar"


import About from "@/pages/subPage/about";
import Tutorial from "@/pages/subPage/tutorial";

export default function Home() {
  return (
    <div className="items-center justify-items-center min-h-screen sm:p-10 ">
        <NavigationMenuDemo />
        <Homepage />
        <About />
        <Tutorial />
    </div>
  );
}
