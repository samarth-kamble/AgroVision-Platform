import { cn } from "@/lib/utils";
import React from "react";

interface HeaderProps {
  label: string;
}

const Header = ({ label }: HeaderProps) => {
  return (
    <div className="w-full flex flex-col gap-y-4 items-center justify-center">
      <h1 className="text-3xl font-semibold">🔐 Auth</h1>
      <p className={cn("text-muted-foreground text-sm")}>{label}</p>
    </div>
  );
};

export default Header;
