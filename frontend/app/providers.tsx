"use client";

import { Next13ProgressBar } from "next13-progressbar";
import { ReactNode } from "react";

export function Provider({ children }: { children: ReactNode }) {
  return (
    <>
      {children}
      <Next13ProgressBar color="hsl(var(--primary))" />
    </>
  );
}
