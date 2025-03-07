"use client";

import * as React from "react";
import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
  DropdownMenuPortal
} from "@/components/ui/dropdown-menu";


export function FontToggle() {
    React.useEffect(() => {
        const savedFont = localStorage.getItem("selectedFont");
        if (savedFont) {
          document.documentElement.style.setProperty("--font-sans", savedFont);
        }
      }, []);
    
      const setFont = (font) => {
        document.documentElement.style.setProperty("--font-sans", font);
        localStorage.setItem("selectedFont", font);
      };
      return (
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Button variant="outline" size="icon" aria-label="Toggle font">
              <h2>A</h2>
            </Button>
          </DropdownMenuTrigger>
          <DropdownMenuPortal>
          <DropdownMenuContent align="end" >
            <DropdownMenuItem onClick={() => setFont("system-ui")}>Default</DropdownMenuItem>
            <DropdownMenuItem onClick={() => setFont("'OpenDyslexic', sans-serif")}>OpenDyslexic</DropdownMenuItem>
            <DropdownMenuItem onClick={() => setFont("'Lexend', sans-serif")}>High Readability (Lexend)</DropdownMenuItem>
          </DropdownMenuContent>
          </DropdownMenuPortal>
        </DropdownMenu>
      );
    }