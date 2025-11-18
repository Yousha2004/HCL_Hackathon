'use client';

import { useState } from 'react';
import { Mail, Lock, User, Calendar, Phone, MapPin, ArrowLeft, ArrowRight } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Card, CardContent, CardHeader } from '@/components/ui/card';

interface PatientSignupFormProps {
  onBack: () => void;
}

export default function PatientSignupForm({ onBack }: PatientSignupFormProps) {
  const [formData, setFormData] = useState({
    fullName: '',
    email: '',
    password: '',
    dateOfBirth: '',
    phoneNumber: '',
    address: '',
  });
  const [isLoading, setIsLoading] = useState(false);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);
    try {
      // Import here to avoid SSR issues
      const { authClient } = await import('@/lib/auth');
      await authClient.signUp.email({
        email: formData.email,
        password: formData.password,
        name: formData.fullName,
        role: 'patient',
        consent: true,
        phoneNumber: formData.phoneNumber,
        address: formData.address,
        dateOfBirth: formData.dateOfBirth,
      });
      // Optionally redirect or show success
    } catch (err) {
      // Optionally handle error
    }
    setIsLoading(false);
  };

  return (
    <Card className="border-border/50 shadow-xl overflow-hidden">
      <CardHeader className="pt-8 pb-6">
        <button
          onClick={onBack}
          className="flex items-center gap-2 text-primary hover:text-primary/80 transition mb-4 text-sm font-medium"
        >
          <ArrowLeft className="w-4 h-4" />
          Back
        </button>
        <h1 className="text-2xl font-bold text-foreground">Create Account</h1>
        <p className="text-muted-foreground text-sm mt-1">Complete your profile to get started</p>
      </CardHeader>

      <CardContent className="px-6 pb-8">
        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label className="text-sm font-medium text-foreground mb-2 block">Full Name</label>
            <div className="relative">
              <User className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-muted-foreground" />
              <Input
                type="text"
                name="fullName"
                placeholder="John Doe"
                value={formData.fullName}
                onChange={handleChange}
                className="pl-10 py-2 rounded-lg border-border/50"
                required
              />
            </div>
          </div>

          <div>
            <label className="text-sm font-medium text-foreground mb-2 block">Email Address</label>
            <div className="relative">
              <Mail className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-muted-foreground" />
              <Input
                type="email"
                name="email"
                placeholder="your@email.com"
                value={formData.email}
                onChange={handleChange}
                className="pl-10 py-2 rounded-lg border-border/50"
                required
              />
            </div>
          </div>

          <div>
            <label className="text-sm font-medium text-foreground mb-2 block">Password</label>
            <div className="relative">
              <Lock className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-muted-foreground" />
              <Input
                type="password"
                name="password"
                placeholder="••••••••"
                value={formData.password}
                onChange={handleChange}
                className="pl-10 py-2 rounded-lg border-border/50"
                required
              />
            </div>
          </div>

          <div>
            <label className="text-sm font-medium text-foreground mb-2 block">Date of Birth</label>
            <div className="relative">
              <Calendar className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-muted-foreground" />
              <Input
                type="date"
                name="dateOfBirth"
                value={formData.dateOfBirth}
                onChange={handleChange}
                className="pl-10 py-2 rounded-lg border-border/50"
                required
              />
            </div>
          </div>

          <div>
            <label className="text-sm font-medium text-foreground mb-2 block">Phone Number</label>
            <div className="relative">
              <Phone className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-muted-foreground" />
              <Input
                type="tel"
                name="phoneNumber"
                placeholder="+1 (555) 000-0000"
                value={formData.phoneNumber}
                onChange={handleChange}
                className="pl-10 py-2 rounded-lg border-border/50"
              />
            </div>
          </div>

          <div>
            <label className="text-sm font-medium text-foreground mb-2 block">Address</label>
            <div className="relative">
              <MapPin className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-muted-foreground" />
              <Input
                type="text"
                name="address"
                placeholder="123 Main St, City, State"
                value={formData.address}
                onChange={handleChange}
                className="pl-10 py-2 rounded-lg border-border/50"
              />
            </div>
          </div>

          <Button
            type="submit"
            disabled={isLoading}
            className="w-full py-2.5 rounded-lg font-medium flex items-center justify-center gap-2 group mt-6"
          >
            {isLoading ? 'Creating Account...' : 'Create Account'}
            <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
          </Button>
        </form>
      </CardContent>
    </Card>
  );
}
