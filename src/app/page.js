import Homepage from "@/pages/homepage";
import NavigationMenuDemo from "@/components/public/navbar"
import About from "@/pages/subPage/about";
import Features from "@/pages/subPage/features";
import Goals from "@/pages/goals";


export default function Home() {
  return (
    <div className="items-center justify-items-center min-h-screen sm:p-10 ">
        <NavigationMenuDemo />
        <Homepage />
        <About />
        <Goals />
        <Features />

    </div>
  );
}
