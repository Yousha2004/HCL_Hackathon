import { Button } from "@/components/ui/button";
import Link from "next/link";

export default function PrivacyPolicyPage() {
  return (
    <div className="flex items-center justify-center p-4">
      <div
        className={
          "flex flex-col items-center md:items-start justify-center min-h-screen max-w-screen-md w-full mt-16"
        }
      >
        <h1
          className={`text-4xl sm:text-5xl md:text-6xl font-extrabold tracking-tight text-center text-primary md:text-left mb-8`}
        >
          Privacy Policy
        </h1>
        <p className="text-lg text-muted-foreground mb-6">
          Will be updated soon
        </p>

        <Button size="sm" className="rounded-lg">
          <Link href="/login">Try HealMe</Link>
        </Button>
      </div>
    </div>
  );
}
