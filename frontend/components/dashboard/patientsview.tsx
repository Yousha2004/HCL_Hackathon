"use client";

import { useEffect, useState } from "react";
// import { authClient } from "@/lib/auth-client"; // Uncomment for real backend
import { env } from "@/config/env";
import { 
  LayoutDashboard, 
  FileText, 
  Calendar, 
  MessageSquare, 
  Target, 
  Settings, 
  LogOut, 
  Search, 
  Bell, 
  Lightbulb, 
  Check, 
  Footprints, 
  Activity, 
  Moon 
} from "lucide-react";

// --- Types ---
interface DashboardData {
  goals: { _id: string; goalType: string; targetValue: number }[];
  todayLog: { steps: number; waterIntake: number; sleepHours?: number; activeTimeMinutes?: number } | null;
  reminders: { _id: string; title: string; dueDate: string }[];
}

export default function PatientView() {
  const [data, setData] = useState<DashboardData | null>(null);
  const [loading, setLoading] = useState(true);
  const [profileName, setProfileName] = useState<string | null>(null);
  const [profileError, setProfileError] = useState<string | null>(null);

  useEffect(() => {
    const ac = new AbortController();

    const fetchDashboard = async () => {
      try {
        setLoading(true);
        const res = await fetch(`${env.API_BASE_URL}/api/patient/dashboard`, {
          method: "GET",
          credentials: "include",
          signal: ac.signal,
          headers: {
            "Content-Type": "application/json",
          },
        });

        if (!res.ok) {
          const txt = await res.text().catch(() => "");
          console.error("Failed to fetch dashboard:", res.status, txt);
          setLoading(false);
          return;
        }

        const json = await res.json();
        setData({
          goals: json.goals || [],
          todayLog: json.todayLog || null,
          reminders: json.reminders || [],
        });
      } catch (err: unknown) {
        if (err instanceof DOMException && err.name === "AbortError") return;
        console.error("Error loading dashboard:", err);
      } finally {
        setLoading(false);
      }
    };

    const fetchProfile = async () => {
      try {
        const res = await fetch(`${env.API_BASE_URL}/api/patient/profile`, {
          method: "GET",
          credentials: "include",
          signal: ac.signal,
          headers: { "Content-Type": "application/json" },
        });
        if (!res.ok) {
          const txt = await res.text().catch(() => "");
          setProfileError(`Failed to load profile: ${res.status} ${txt}`);
          return;
        }

        const json = await res.json();
        // backend returns populated profile with `user.name` or `name`
        const name = json?.user?.name || json?.name || null;
        setProfileName(name);
        setProfileError(null);
      } catch (err: unknown) {
        if (err instanceof DOMException && err.name === "AbortError") return;
        const msg = err instanceof Error ? err.message : String(err);
        console.error("Error loading profile:", err);
        setProfileError(`Error loading profile: ${msg}`);
      }
    };

    // start both in parallel
    fetchDashboard();
    fetchProfile();
    return () => ac.abort();
  }, []);

  // Helper for progress bars
  const getProgress = (current: number, target: number) => {
    return Math.min(Math.round((current / target) * 100), 100);
  };

  const displayName = profileName ?? "Patient";
  const initials = profileName
    ? profileName
        .split(" ")
        .map((n) => n[0] || "")
        .slice(0, 2)
        .join("")
        .toUpperCase()
    : "P";

  if (loading) {
    return (
      <div className="flex h-screen items-center justify-center bg-background text-muted-foreground">
        Loading dashboard...
      </div>
    );
  }

  return (
    <div className="flex min-h-screen bg-background text-foreground font-sans">
      
      {/* Sidebar */}
      <aside className="hidden lg:flex w-64 flex-col justify-between border-r border-border bg-card p-4">
        <div>
          {/* Logo */}
          <div className="flex items-center gap-3 p-3 mb-8">
            <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-primary/20 text-primary">
              <Activity className="h-5 w-5" />
            </div>
            <h2 className="text-lg font-bold tracking-tight">HealthTrack</h2>
          </div>

          {/* Navigation */}
          <nav className="flex flex-col gap-2">
            <NavItem icon={<LayoutDashboard size={20} />} label="Dashboard" active />
            <NavItem icon={<FileText size={20} />} label="My Health Records" />
            <NavItem icon={<Calendar size={20} />} label="Appointments" />
            <NavItem icon={<MessageSquare size={20} />} label="Messages" />
            <NavItem icon={<Target size={20} />} label="Goals" />
          </nav>
        </div>

        {/* Bottom Actions */}
        <div className="flex flex-col gap-1">
          <NavItem icon={<Settings size={20} />} label="Settings" />
          <NavItem icon={<LogOut size={20} />} label="Log Out" />
        </div>
      </aside>

      {/* Main Content */}
      <main className="flex-1 flex flex-col">
        {/* Header */}
        <header className="sticky top-0 z-10 flex h-16 items-center justify-between border-b border-border bg-background/80 px-8 backdrop-blur-md">
          {/* Search */}
          <div className="relative hidden w-full max-w-sm md:block">
            <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
            <input
              type="text"
              placeholder="Search..."
              className="h-10 w-full rounded-lg border border-input bg-secondary/50 pl-10 pr-4 text-sm text-foreground placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-ring"
            />
          </div>

          {/* User Profile */}
          <div className="flex items-center gap-6">
            <button className="flex h-10 w-10 items-center justify-center rounded-lg bg-secondary text-foreground hover:bg-secondary/80 transition">
              <Bell className="h-5 w-5" />
            </button>
            <div className="flex items-center gap-3">
              <div className="h-10 w-10 rounded-full bg-primary/20 text-primary flex items-center justify-center font-bold">
                {initials}
              </div>
              <div className="hidden text-right md:block">
                <p className="text-sm font-medium leading-none">{displayName}</p>
                <p className="text-xs text-muted-foreground mt-1">Patient</p>
              </div>
            </div>
          </div>
        </header>

        {/* Content Scroll Area */}
        <div className="flex-1 overflow-y-auto p-8">
          
          {/* Welcome Message */}
          <div className="mb-8">
            {
              // Show name or fallback
            }
            <h1 className="text-3xl font-bold tracking-tight text-foreground">Welcome back{profileName ? `, ${profileName}` : ', Patient'}!</h1>
            <p className="text-muted-foreground mt-1">Here’s a summary of your health and wellness today.</p>
            {profileError && (
              <div className="mt-3 rounded-md bg-red-50 border border-red-200 p-2 text-sm text-red-700">
                {profileError}
              </div>
            )}
          </div>

          {/* Top Grid: Goals, Reminders, Tip */}
          <div className="grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-3 mb-6">
            
            {/* Wellness Goals */}
            <div className="rounded-xl border border-border bg-card p-6 shadow-sm">
              <h3 className="mb-4 text-lg font-semibold text-card-foreground">Wellness Goals</h3>
              <div className="flex flex-col gap-4">
                {data?.goals.map((goal) => {
                  const current = goal.goalType === 'steps' ? data.todayLog?.steps || 0 :
                                  goal.goalType === 'waterIntake' ? data.todayLog?.waterIntake || 0 : 0;
                  const percent = getProgress(current, goal.targetValue);
                  
                  return (
                    <div key={goal._id}>
                      <div className="mb-1 flex justify-between text-sm">
                        <span className="font-medium capitalize">{goal.goalType.replace(/([A-Z])/g, ' $1').trim()}</span>
                        <span className="text-muted-foreground">{percent}%</span>
                      </div>
                      <div className="h-2 w-full overflow-hidden rounded-full bg-secondary">
                        <div className="h-full bg-primary transition-all duration-500" style={{ width: `${percent}%` }} />
                      </div>
                    </div>
                  );
                })}
              </div>
            </div>

            {/* Preventive Care */}
            <div className="rounded-xl border border-border bg-card p-6 shadow-sm">
              <h3 className="mb-4 text-lg font-semibold text-card-foreground">Preventive Care</h3>
              <ul className="space-y-4">
                {data?.reminders.map((reminder) => (
                  <li key={reminder._id} className="flex items-start gap-3">
                    <div className="flex h-6 w-6 shrink-0 items-center justify-center rounded-full bg-primary/10 text-primary">
                      <Check className="h-3.5 w-3.5" />
                    </div>
                    <div>
                      <p className="text-sm font-medium leading-none">{reminder.title}</p>
                      <p className="text-xs text-muted-foreground mt-1">Due: {reminder.dueDate}</p>
                    </div>
                  </li>
                ))}
              </ul>
            </div>

            {/* Health Tip */}
            <div className="rounded-xl border border-border bg-primary/10 p-6 shadow-sm md:col-span-2 lg:col-span-1">
              <div className="mb-4 flex h-10 w-10 items-center justify-center rounded-lg bg-primary text-primary-foreground">
                <Lightbulb className="h-6 w-6" />
              </div>
              <h3 className="mb-2 text-lg font-bold text-foreground">Health Tip of the Day</h3>
              <p className="text-sm text-muted-foreground leading-relaxed">
                Stay hydrated! Drinking enough water can improve energy levels and brain function.
              </p>
            </div>
          </div>

          {/* Bottom Grid: Stats */}
          <div className="grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-3">
            
            {/* Steps Card */}
            <StatCard 
              label="Steps" 
              value={data?.todayLog?.steps.toLocaleString() || "0"} 
              icon={<Footprints className="h-6 w-6" />}
              subtext="Goal: 10,000"
              progress={getProgress(data?.todayLog?.steps || 0, 10000)}
            />

            {/* Active Time Card */}
            <StatCard 
              label="Active Time" 
              value={`${data?.todayLog?.activeTimeMinutes || 0} min`} 
              icon={<Activity className="h-6 w-6" />}
              subtext="Goal: 50 min"
              progress={getProgress(data?.todayLog?.activeTimeMinutes || 0, 50)}
            />

            {/* Sleep Card */}
            <div className="flex flex-col justify-between rounded-xl border border-border bg-card p-6 shadow-sm transition-all hover:shadow-md">
              <div className="flex justify-between">
                <div>
                  <p className="text-sm font-medium text-muted-foreground">Sleep</p>
                  <p className="mt-1 text-2xl font-bold text-card-foreground">
                    {Math.floor(data?.todayLog?.sleepHours || 0)}h {Math.round(((data?.todayLog?.sleepHours || 0) % 1) * 60)}m
                  </p>
                </div>
                <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-primary/10 text-primary">
                  <Moon className="h-6 w-6" />
                </div>
              </div>
              <div className="mt-4 border-t border-border pt-4">
                <p className="text-xs text-muted-foreground">Last night: 11:30 pm - 06:45 am</p>
              </div>
            </div>

          </div>
        </div>
      </main>
    </div>
  );
}

// --- Subcomponents for cleaner code ---

function NavItem({ icon, label, active = false }: { icon: React.ReactNode; label: string; active?: boolean }) {
  return (
    <a
      href="#"
      className={`flex items-center gap-3 rounded-lg px-3 py-2 text-sm font-medium transition-colors ${
        active
          ? "bg-primary/15 text-primary"
          : "text-muted-foreground hover:bg-secondary hover:text-foreground"
      }`}
    >
      {icon}
      {label}
    </a>
  );
}

function StatCard({ label, value, icon, subtext, progress }: { label: string; value: string; icon: React.ReactNode; subtext: string; progress: number }) {
  return (
    <div className="flex flex-col justify-between rounded-xl border border-border bg-card p-6 shadow-sm transition-all hover:shadow-md">
      <div className="flex justify-between">
        <div>
          <p className="text-sm font-medium text-muted-foreground">{label}</p>
          <p className="mt-1 text-2xl font-bold text-card-foreground">{value}</p>
        </div>
        <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-primary/10 text-primary">
          {icon}
        </div>
      </div>
      <div className="mt-4">
        <div className="mb-1 flex justify-between text-xs">
          <span className="text-muted-foreground">{subtext}</span>
          <span className="font-bold text-primary">{progress}%</span>
        </div>
        <div className="h-2 w-full overflow-hidden rounded-full bg-secondary">
          <div className="h-full bg-primary transition-all duration-500" style={{ width: `${progress}%` }} />
        </div>
      </div>
    </div>
  );
}