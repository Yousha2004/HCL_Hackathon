"use client";

import { motion, Transition } from "framer-motion";
import { Button } from "@/components/ui/button";
import Link from "next/link";
import { Home, RefreshCcw } from "lucide-react";
import { useRouter } from "next13-progressbar";

const NotFoundPage = () => {
    const router = useRouter();

    const bounceTransition: Transition = {
        y: {
            duration: 0.4,
            ease: "easeOut",
            repeat: Number.POSITIVE_INFINITY,
            repeatType: "loop",
        },
    };

    return (
        <div className="min-h-screen flex flex-col items-center justify-center p-4">
            <motion.div
                className="text-center"
                initial={{ opacity: 0, y: -20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5 }}
            >
                <motion.h1
                    className="text-6xl md:text-8xl font-bold text-primary mb-4"
                    animate={{ y: ["0%", "-20%", "0%"] }}
                    transition={bounceTransition}
                >
                    404
                </motion.h1>
                <h2 className="text-2xl md:text-3xl font-semibold  mb-4">
                    Oops! Page Not Found
                </h2>
                <p className="text-lg text-muted-foreground mb-8 max-w-md mx-auto">
                    Don't worry, even the calmest minds lose their way sometimes. Let's
                    get you back on track.
                </p>

                <div className="flex flex-col sm:flex-row justify-center items-center space-y-4 sm:space-y-0 sm:space-x-4">
                    <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
                        <Button
                            asChild
                            className="bg-primary hover:bg-primary/90 text-white"
                        >
                            <Link href="/">
                                <Home className="mr-2 h-4 w-4" /> Go Home
                            </Link>
                        </Button>
                    </motion.div>
                    <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
                        <Button
                            onClick={() => router.refresh()}
                            variant="outline"
                            className="border-primary text-primary hover:bg-primary/10"
                        >
                            <RefreshCcw className="mr-2 h-4 w-4" /> Try Again
                        </Button>
                    </motion.div>
                </div>
            </motion.div>

            <motion.div
                className="mt-12 text-center"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 0.5, duration: 0.5 }}
            >
                <h3 className="text-xl font-semibold  mb-4">Need a moment of calm?</h3>
                <div className="flex justify-center items-center space-x-4">
                    {[1, 2, 3].map((i) => (
                        <motion.div
                            key={i}
                            className="w-4 h-4 bg-primary rounded-full"
                            animate={{
                                scale: [1, 1.5, 1],
                                opacity: [0.5, 1, 0.5],
                            }}
                            transition={{
                                duration: 2,
                                repeat: Infinity,
                                delay: i * 0.2,
                            }}
                        />
                    ))}
                </div>
                <p className="text-muted-foreground mt-4">
                    Take a deep breath and relax...
                </p>
            </motion.div>
        </div>
    );
};

export default NotFoundPage;
