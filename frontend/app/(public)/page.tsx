'use client';

import { Heart, Users, BarChart3, Lock, Calendar, TrendingUp } from 'lucide-react';
import Link from 'next/link';
import { Button, buttonVariants } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';

const LandingPage = () => {
  return (
    <div className="min-h-screen bg-gradient-to-b from-background via-background to-secondary/10">
      <nav className="sticky top-0 z-50 bg-background/80 backdrop-blur-md border-b border-border">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4 flex justify-between items-center">
          <div className="flex items-center gap-2">
            <Heart className="w-6 h-6 text-primary fill-current" />
            <span className="text-xl font-bold text-foreground">HealthHub</span>
          </div>
          <div className="flex gap-4">
            <Button variant="ghost" asChild>
              <Link href="/dashboard">Patient Portal</Link>
            </Button>
            <Button variant="ghost" asChild>
              <Link href="/providers">Provider Portal</Link>
            </Button>
          </div>
        </div>
      </nav>

      <section className="relative py-20 px-4 sm:px-6 lg:px-8 overflow-hidden">
        <div className="max-w-7xl mx-auto text-center">
          <h1 className="text-5xl sm:text-6xl md:text-7xl font-bold tracking-tight text-foreground mb-6 text-balance">
            Healthcare Made <span className="text-primary">Simple</span>
          </h1>
          <p className="text-xl text-muted-foreground mb-8 text-balance max-w-2xl mx-auto">
            Unified wellness platform connecting patients with healthcare providers for preventive care, wellness tracking, and comprehensive health management.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Button size="lg" className="rounded-full" asChild>
              <Link href="/dashboard">Enter Patient Portal</Link>
            </Button>
            <Button size="lg" variant="outline" className="rounded-full" asChild>
              <Link href="/providers">Provider Dashboard</Link>
            </Button>
          </div>
        </div>
      </section>

      <section className="py-20 px-4 sm:px-6 lg:px-8 bg-secondary/20">
        <div className="max-w-7xl mx-auto">
          <div className="mb-12">
            <h2 className="text-4xl font-bold text-foreground mb-4">For Patients</h2>
            <p className="text-lg text-muted-foreground max-w-2xl">Take control of your health journey with tools designed to empower your wellness</p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            <Card className="hover:shadow-lg transition-shadow">
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Heart className="w-5 h-5 text-primary" />
                  Wellness Tracking
                </CardTitle>
              </CardHeader>
              <CardContent>
                <CardDescription className="text-base">Monitor daily health metrics including activity, sleep, nutrition, and meditation progress</CardDescription>
              </CardContent>
            </Card>

            <Card className="hover:shadow-lg transition-shadow">
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Calendar className="w-5 h-5 text-primary" />
                  Easy Appointments
                </CardTitle>
              </CardHeader>
              <CardContent>
                <CardDescription className="text-base">Schedule, reschedule, and manage appointments with your healthcare providers seamlessly</CardDescription>
              </CardContent>
            </Card>

            <Card className="hover:shadow-lg transition-shadow">
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <BarChart3 className="w-5 h-5 text-primary" />
                  Health Insights
                </CardTitle>
              </CardHeader>
              <CardContent>
                <CardDescription className="text-base">View detailed analytics and trends of your vital signs and health compliance over time</CardDescription>
              </CardContent>
            </Card>

            <Card className="hover:shadow-lg transition-shadow">
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Lock className="w-5 h-5 text-primary" />
                  Secure Records
                </CardTitle>
              </CardHeader>
              <CardContent>
                <CardDescription className="text-base">Access all your medical records, lab results, and prescriptions in one secure location</CardDescription>
              </CardContent>
            </Card>

            <Card className="hover:shadow-lg transition-shadow">
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <TrendingUp className="w-5 h-5 text-primary" />
                  Preventive Care
                </CardTitle>
              </CardHeader>
              <CardContent>
                <CardDescription className="text-base">Receive personalized health recommendations and preventive care programs tailored to you</CardDescription>
              </CardContent>
            </Card>

            <Card className="hover:shadow-lg transition-shadow">
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Users className="w-5 h-5 text-primary" />
                  Provider Connection
                </CardTitle>
              </CardHeader>
              <CardContent>
                <CardDescription className="text-base">Communicate directly with healthcare providers and receive personalized medical guidance</CardDescription>
              </CardContent>
            </Card>
          </div>

          <div className="mt-12 text-center">
            <Button size="lg" className="rounded-full" asChild>
              <Link href="/dashboard">Start Your Wellness Journey</Link>
            </Button>
          </div>
        </div>
      </section>

      <section className="py-20 px-4 sm:px-6 lg:px-8">
        <div className="max-w-7xl mx-auto">
          <div className="mb-12">
            <h2 className="text-4xl font-bold text-foreground mb-4">For Healthcare Providers</h2>
            <p className="text-lg text-muted-foreground max-w-2xl">Streamline your practice and deliver better patient care with integrated management tools</p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            <Card className="hover:shadow-lg transition-shadow">
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Users className="w-5 h-5 text-primary" />
                  Patient Management
                </CardTitle>
              </CardHeader>
              <CardContent>
                <CardDescription className="text-base">Manage your patient population efficiently with real-time access to medical histories and appointments</CardDescription>
              </CardContent>
            </Card>

            <Card className="hover:shadow-lg transition-shadow">
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <BarChart3 className="w-5 h-5 text-primary" />
                  Analytics & Insights
                </CardTitle>
              </CardHeader>
              <CardContent>
                <CardDescription className="text-base">Track patient compliance, health metrics, and preventive care completion rates with comprehensive dashboards</CardDescription>
              </CardContent>
            </Card>

            <Card className="hover:shadow-lg transition-shadow">
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Calendar className="w-5 h-5 text-primary" />
                  Appointment Queue
                </CardTitle>
              </CardHeader>
              <CardContent>
                <CardDescription className="text-base">Organized appointment scheduling and patient queue management for efficient clinic operations</CardDescription>
              </CardContent>
            </Card>

            <Card className="hover:shadow-lg transition-shadow">
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Heart className="w-5 h-5 text-primary" />
                  Health Records
                </CardTitle>
              </CardHeader>
              <CardContent>
                <CardDescription className="text-base">Complete access to patient health records, lab results, and medical history for informed care decisions</CardDescription>
              </CardContent>
            </Card>

            <Card className="hover:shadow-lg transition-shadow">
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <TrendingUp className="w-5 h-5 text-primary" />
                  Performance Metrics
                </CardTitle>
              </CardHeader>
              <CardContent>
                <CardDescription className="text-base">Monitor your clinic's performance with appointment completion rates and patient satisfaction metrics</CardDescription>
              </CardContent>
            </Card>

            <Card className="hover:shadow-lg transition-shadow">
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Lock className="w-5 h-5 text-primary" />
                  HIPAA Compliant
                </CardTitle>
              </CardHeader>
              <CardContent>
                <CardDescription className="text-base">Enterprise-grade security and compliance features to protect sensitive patient health information</CardDescription>
              </CardContent>
            </Card>
          </div>

          <div className="mt-12 text-center">
            <Button size="lg" className="rounded-full" asChild>
              <Link href="/providers">Access Provider Dashboard</Link>
            </Button>
          </div>
        </div>
      </section>

      <section className="py-20 px-4 sm:px-6 lg:px-8">
        <div className="max-w-4xl mx-auto bg-primary/10 border border-primary/20 rounded-2xl p-12 text-center">
          <h2 className="text-3xl font-bold text-foreground mb-4">Ready to Transform Your Healthcare?</h2>
          <p className="text-lg text-muted-foreground mb-8">Join thousands of patients and healthcare providers using HealthHub to improve wellness and streamline healthcare delivery.</p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Button size="lg" className="rounded-full" asChild>
              <Link href="/dashboard">Get Started as Patient</Link>
            </Button>
            <Button size="lg" variant="outline" className="rounded-full" asChild>
              <Link href="/providers">Get Started as Provider</Link>
            </Button>
          </div>
        </div>
      </section>

      <footer className="border-t border-border py-4 px-4 sm:px-6 lg:px-8">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex flex-col sm:flex-row justify-between items-center">
          <div className="text-center sm:text-left">
            <p className="text-sm">
              &copy; {new Date().getFullYear()} HealthHub. All rights reserved.
            </p>
          </div>
          <div className="flex flex-col mt-4 sm:mt-0 sm:flex-row">
            <Link
              href="/privacy-policy"
              className={buttonVariants({ variant: "ghost" })}
            >
              Privacy Policy
            </Link>
            <Link href="/blog" className={buttonVariants({ variant: "ghost" })}>
              Blog
            </Link>
            <a
              href="https://github.com/Yousha2004/HCL_Hackathon"
              className={buttonVariants({ variant: "ghost" })}
            >
              Contribute
            </a>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default LandingPage;
