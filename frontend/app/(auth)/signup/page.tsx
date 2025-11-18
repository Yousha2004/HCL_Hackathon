'use client';

import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Heart, ArrowRight, Users, Stethoscope } from 'lucide-react';
import Link from 'next/link';
import { Card, CardContent, CardHeader } from '@/components/ui/card';
import PatientSignupForm from '@/components/auth/patient-signup-form';
import ProviderSignupForm from '@/components/auth/provider-signup-form';

type UserRole = 'patient' | 'provider' | null;

export default function SignupPage() {
  const [userRole, setUserRole] = useState<UserRole>(null);

  return (
    <div className="min-h-screen flex items-center justify-center p-4 bg-gradient-to-br from-background to-secondary/5">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
        className="w-full max-w-md"
      >
        <AnimatePresence mode="wait">
          {userRole === null ? (
            <motion.div
              key="role-selection"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
              transition={{ duration: 0.4 }}
            >
              <Card className="border-border/50 shadow-xl overflow-hidden">
                <CardHeader className="pt-12 pb-8 text-center">
                  <motion.div
                    initial={{ scale: 0.9 }}
                    animate={{ scale: 1 }}
                    transition={{ delay: 0.2, duration: 0.4 }}
                    className="inline-flex justify-center"
                  >
                    <div className="flex items-center justify-center w-16 h-16 rounded-full bg-primary/10 mb-4">
                      <Heart className="w-8 h-8 text-primary fill-current" />
                    </div>
                  </motion.div>
                  <h1 className="text-3xl font-bold text-foreground">Join HealthHub</h1>
                  <p className="text-muted-foreground mt-2">Create your account to get started</p>
                </CardHeader>

                <CardContent className="px-6 pb-8">
                  <p className="text-sm font-medium text-foreground mb-4">I am a:</p>
                  <div className="space-y-3">
                    <motion.button
                      whileHover={{ scale: 1.02 }}
                      whileTap={{ scale: 0.98 }}
                      onClick={() => setUserRole('patient')}
                      className="w-full p-4 rounded-lg border-2 border-border/50 hover:border-primary hover:bg-primary/5 transition-all text-left group"
                    >
                      <div className="flex items-center gap-3">
                        <div className="p-2 rounded-lg bg-primary/10 group-hover:bg-primary/20 transition">
                          <Users className="w-5 h-5 text-primary" />
                        </div>
                        <div>
                          <h3 className="font-medium text-foreground">Patient</h3>
                          <p className="text-xs text-muted-foreground">Access wellness tools & health records</p>
                        </div>
                        <ArrowRight className="w-4 h-4 text-muted-foreground ml-auto group-hover:text-primary transition" />
                      </div>
                    </motion.button>

                    <motion.button
                      whileHover={{ scale: 1.02 }}
                      whileTap={{ scale: 0.98 }}
                      onClick={() => setUserRole('provider')}
                      className="w-full p-4 rounded-lg border-2 border-border/50 hover:border-primary hover:bg-primary/5 transition-all text-left group"
                    >
                      <div className="flex items-center gap-3">
                        <div className="p-2 rounded-lg bg-primary/10 group-hover:bg-primary/20 transition">
                          <Stethoscope className="w-5 h-5 text-primary" />
                        </div>
                        <div>
                          <h3 className="font-medium text-foreground">Healthcare Provider</h3>
                          <p className="text-xs text-muted-foreground">Manage patients & appointments</p>
                        </div>
                        <ArrowRight className="w-4 h-4 text-muted-foreground ml-auto group-hover:text-primary transition" />
                      </div>
                    </motion.button>
                  </div>

                  <p className="text-center text-sm text-muted-foreground mt-6">
                    Already have an account?{' '}
                    <Link href="/login" className="text-primary font-medium hover:underline">
                      Sign in
                    </Link>
                  </p>
                </CardContent>
              </Card>
            </motion.div>
          ) : userRole === 'patient' ? (
            <motion.div
              key="patient-signup"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
              transition={{ duration: 0.4 }}
            >
              <PatientSignupForm onBack={() => setUserRole(null)} />
            </motion.div>
          ) : (
            <motion.div
              key="provider-signup"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
              transition={{ duration: 0.4 }}
            >
              <ProviderSignupForm onBack={() => setUserRole(null)} />
            </motion.div>
          )}
        </AnimatePresence>

        {userRole !== null && (
          <p className="text-center text-xs text-muted-foreground mt-6">
            By signing up, you agree to our{' '}
            <Link href="/privacy-policy" className="text-primary hover:underline">
              Privacy Policy
            </Link>
          </p>
        )}
      </motion.div>
    </div>
  );
}
