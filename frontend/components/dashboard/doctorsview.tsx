"use client";

import { useEffect, useState } from "react";
import { env } from "@/config/env";
import { Activity, User, FileText, Check, Search } from "lucide-react";

interface PatientSummary {
  _id: string;
  user?: { _id?: string; name?: string; email?: string } | null;
  allergies?: string[];
  currentMedications?: string[];
}

interface PatientDetails {
  profile: any;
  goals: any[];
  recentLogs: any[];
  reminders: any[];
}

export default function DoctorView() {
  const [patients, setPatients] = useState<PatientSummary[]>([]);
  const [originalPatients, setOriginalPatients] = useState<PatientSummary[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [selected, setSelected] = useState<string | null>(null);
  const [details, setDetails] = useState<PatientDetails | null>(null);
  const [detailsLoading, setDetailsLoading] = useState(false);

  useEffect(() => {
    const ac = new AbortController();
    const fetchPatients = async () => {
      try {
        setLoading(true);
        const res = await fetch(`${env.API_BASE_URL}/api/doctor/dashboard`, {
          method: "GET",
          credentials: "include",
          signal: ac.signal,
          headers: { "Content-Type": "application/json" },
        });
        if (!res.ok) {
          const txt = await res.text().catch(() => "");
          setError(`Failed to load patients: ${res.status} ${txt}`);
          return;
        }
        const json = await res.json();
        setPatients(json || []);
        setOriginalPatients(json || []);
        setError(null);
      } catch (err: unknown) {
        if (err instanceof DOMException && err.name === "AbortError") return;
        const msg = err instanceof Error ? err.message : String(err);
        setError(`Error loading patients: ${msg}`);
      } finally {
        setLoading(false);
      }
    };

    fetchPatients();
    return () => ac.abort();
  }, []);

  const loadDetails = async (patientId: string) => {
    setSelected(patientId);
    setDetails(null);
    setDetailsLoading(true);
    try {
      const res = await fetch(`${env.API_BASE_URL}/api/doctor/patients/${patientId}`, {
        method: "GET",
        credentials: "include",
        headers: { "Content-Type": "application/json" },
      });
      if (!res.ok) {
        const txt = await res.text().catch(() => "");
        setError(`Failed to load patient details: ${res.status} ${txt}`);
        return;
      }
      const json = await res.json();
      setDetails(json);
    } catch (err: unknown) {
      const msg = err instanceof Error ? err.message : String(err);
      setError(`Error loading patient details: ${msg}`);
    } finally {
      setDetailsLoading(false);
    }
  };

  if (loading) {
    return (
      <div className="flex h-screen items-center justify-center bg-background text-muted-foreground">Loading patients…</div>
    );
  }

  return (
    <div className="flex min-h-screen bg-background text-foreground font-sans">
      <main className="flex-1 p-8">
        <div className="mb-8 flex items-center justify-between">
          <div>
            <h1 className="text-3xl font-bold tracking-tight">Provider Dashboard</h1>
            <p className="text-muted-foreground mt-1">Patients assigned to you.</p>
          </div>
          <div className="max-w-sm w-full">
            <div className="relative">
              <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
              <input className="h-10 w-full rounded-lg border border-input bg-secondary/50 pl-10 pr-4 text-sm text-foreground placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-ring" placeholder="Filter patients..." onChange={(e) => {
                const q = e.target.value.toLowerCase();
                if (!q) return setPatients(originalPatients.slice());
                setPatients(originalPatients.filter(p => (p.user?.name || "").toLowerCase().includes(q) || (p.user?.email || "").toLowerCase().includes(q)));
              }} />
            </div>
          </div>
        </div>

        {error && <div className="mb-4 rounded-md bg-red-50 border border-red-200 p-2 text-sm text-red-700">{error}</div>}

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {patients.map((p) => {
            const name = p.user?.name || "Unnamed";
            const email = p.user?.email || "";
            return (
              <div key={p._id} className="rounded-xl border border-border bg-card p-4 shadow-sm">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-sm font-medium text-muted-foreground">{name}</p>
                    <p className="mt-1 text-sm text-card-foreground">{email}</p>
                  </div>
                  <div className="flex items-center gap-2">
                    <div className="h-10 w-10 rounded-full bg-primary/10 text-primary flex items-center justify-center">
                      <User className="h-5 w-5" />
                    </div>
                  </div>
                </div>

                <div className="mt-4 text-sm text-muted-foreground">
                  <p>Allergies: {p.allergies?.length ? p.allergies.join(", ") : "—"}</p>
                  <p className="mt-1">Medications: {p.currentMedications?.length ? p.currentMedications.join(", ") : "—"}</p>
                </div>

                <div className="mt-4 flex items-center justify-between">
                  <button onClick={() => loadDetails(p.user?._id ?? p._id)} className="rounded-md bg-primary px-3 py-2 text-sm text-primary-foreground">Quick View</button>
                  <button onClick={() => loadDetails(p.user?._id ?? p._id)} className="text-sm text-muted-foreground underline">Open</button>
                </div>
              </div>
            );
          })}
        </div>

        {/* Details panel */}
        {selected && (
          <div className="mt-8 rounded-xl border border-border bg-card p-6 shadow-sm">
            <div className="flex items-center justify-between">
              <h3 className="text-lg font-semibold">Patient Details</h3>
              <div>
                <button onClick={() => { setSelected(null); setDetails(null); setError(null); }} className="text-sm text-muted-foreground">Close</button>
              </div>
            </div>

            {detailsLoading && <p className="mt-4 text-sm text-muted-foreground">Loading details…</p>}

            {details && (
              <div className="mt-4 grid grid-cols-1 md:grid-cols-3 gap-4">
                <div className="md:col-span-1">
                  <p className="text-sm text-muted-foreground">Name</p>
                  <p className="font-medium mt-1">{details.profile?.user?.name || details.profile?.name || 'Unnamed'}</p>
                  <p className="text-sm text-muted-foreground mt-3">Email</p>
                  <p className="font-medium mt-1">{details.profile?.user?.email || ''}</p>
                </div>
                <div className="md:col-span-2">
                  <h4 className="text-sm font-medium">Active Goals</h4>
                  <ul className="mt-2 space-y-2">
                    {details.goals.length ? details.goals.map((g: any) => (
                      <li key={g._id} className="rounded-md border border-border p-2 text-sm">{g.goalType} — {g.targetValue}</li>
                    )) : <li className="text-sm text-muted-foreground">No active goals</li>}
                  </ul>

                  <h4 className="text-sm font-medium mt-4">Recent Logs (7d)</h4>
                  <div className="mt-2 space-y-2 text-sm text-muted-foreground">
                    {details.recentLogs.length ? details.recentLogs.map((r: any) => (
                      <div key={r._id} className="rounded-md border border-border p-2">{new Date(r.date).toLocaleDateString()} — Steps: {r.steps || 0}</div>
                    )) : <div>No recent logs</div>}
                  </div>
                </div>
              </div>
            )}

          </div>
        )}
      </main>
    </div>
  );
}
