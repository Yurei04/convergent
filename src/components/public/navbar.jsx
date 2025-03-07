"use client"

import * as React from "react"
import Link from "next/link"

import { cn } from "@/lib/utils"
import {
  NavigationMenu,
  NavigationMenuContent,
  NavigationMenuItem,
  NavigationMenuLink,
  NavigationMenuList,
  NavigationMenuTrigger,
  navigationMenuTriggerStyle,
} from "@/components/ui/navigation-menu"
import { ModeToggle } from "../modes"
import { FontToggle } from "../fontModes"

const components = [
    {
        title: "Accessibility",
        href: "",
        description:
        "Convergent is equipped of various accessibility feature to ensure all are accomodated",
    },
    {
        title: "Job Seeker",
        href: "/subPage/jobSeekerHome",
        description:
        "Seek job know matter your circumstances.",
    },
    {
        title: "Sustineo",
        href: "/subPage/sustineoHome",
        description:
        "Need help? ask sustineo for advice, recommendations and many more.",
    },
    {
        title: "Resource Hub",
        href: "/resourceHub",
        description: "Libraries and Tools to accomodate and help your future job.",
    },
    {
        title: "Scriptum",
        href: "/subPage/scriptumFuncHome",
        description:
        "Analyze or Create your resume for recommendations and analysis",
    },
    {
        title: "Vox Quae",
        href: "/subPage/scriptumFuncHome",
        description:
        "An algorithm that finds jobs, information, and tools for you.",
    },
];

export default function NavigationMenuDemo() {
  return (
    <NavigationMenu>
      <NavigationMenuList>
      <NavigationMenuItem>
          <Link href="/" legacyBehavior passHref>
            <NavigationMenuLink className={navigationMenuTriggerStyle()}>
              Home
            </NavigationMenuLink>
          </Link>
        </NavigationMenuItem>
        <NavigationMenuItem>
          <NavigationMenuTrigger>Getting started</NavigationMenuTrigger>
          <NavigationMenuContent>
            <ul className="grid gap-3 p-4 md:w-[400px] lg:w-[500px] lg:grid-cols-[.75fr_1fr]">
              <li className="row-span-3">
                <NavigationMenuLink asChild>
                  <a
                    className="flex h-full w-full select-none flex-col justify-end rounded-md bg-gradient-to-b from-muted/50 to-muted p-6 no-underline outline-none focus:shadow-md"
                    href="/"
                  >
                    <div className="mb-2 mt-4 text-lg font-medium">
                      Convergent
                    </div>
                    <p className="text-sm leading-tight text-muted-foreground">
                      An AI tool where you can find jobs no matter your circumstances
                    </p>
                  </a>
                </NavigationMenuLink>
              </li>
              <ListItem href="#About" title="Introduction">
                Learn more what convergent is about.
              </ListItem>
              <ListItem href="#Tutorial" title="Features">
                How do you use convergent?
              </ListItem>
              <ListItem href="#Goals" title="Goal">
                Convergent goal is to reduce inequalities while increasing jobs around the world!
              </ListItem>
            </ul>
          </NavigationMenuContent>
        </NavigationMenuItem>
        <NavigationMenuItem>
          <NavigationMenuTrigger>Components</NavigationMenuTrigger>
          <NavigationMenuContent>
            <ul className="grid w-[400px] gap-3 p-4 md:w-[500px] md:grid-cols-2 lg:w-[600px] ">
              {components.map((component) => (
                <ListItem
                  key={component.title}
                  title={component.title}
                  href={component.href}
                >
                      {component.description}
                </ListItem>
              ))}
            </ul>
          </NavigationMenuContent>
        </NavigationMenuItem>
        <NavigationMenuItem>
          <Link href="https://github.com/Yurei04/convergent" legacyBehavior passHref>
            <NavigationMenuLink className={navigationMenuTriggerStyle()}>
              Github
            </NavigationMenuLink>
          </Link>
        </NavigationMenuItem>
        <NavigationMenuItem className="z-[9999]">
          <ModeToggle />
        </NavigationMenuItem>
        <NavigationMenuItem className="z-[9999]">
          <FontToggle />
        </NavigationMenuItem>
      </NavigationMenuList>
    </NavigationMenu>
  )
}

const ListItem = React.forwardRef(({ className, title, children, ...props }, ref) => {
    return (
      <li>
        <NavigationMenuLink asChild>
          <a
            ref={ref}
            className={cn(
              "block select-none space-y-1 rounded-md p-3 leading-none no-underline outline-none transition-colors hover:bg-accent hover:text-accent-foreground focus:bg-accent focus:text-accent-foreground",
              className
            )}
            {...props}
          >
            <div className="text-sm font-medium leading-none">{title}</div>
            <p className="line-clamp-2 text-sm leading-snug text-muted-foreground">
              {children}
            </p>
          </a>
        </NavigationMenuLink>
      </li>
    );
  });
  
  ListItem.displayName = "ListItem";