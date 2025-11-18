import { useEffect, useState } from 'react'
import { BrowserRouter, Link } from 'react-router-dom'
import Spline from '@splinetool/react-spline'

function StatCard({ label, value }) {
  return (
    <div className="bg-white/5 backdrop-blur-md border border-white/10 rounded-xl p-4">
      <p className="text-sm text-blue-200/80">{label}</p>
      <p className="text-3xl font-semibold text-white mt-1">{value}</p>
    </div>
  )
}

function AppointmentItem({ a }) {
  return (
    <div className="flex items-center justify-between p-4 bg-white/5 border border-white/10 rounded-xl">
      <div>
        <p className="text-white font-medium">Patient: {a.patient_id?.slice(0,6)}</p>
        <p className="text-blue-200/80 text-sm">Visit {a.visit_count} • {a.visit_kind} • {a.type}</p>
      </div>
      <button className="px-3 py-2 bg-blue-500/90 hover:bg-blue-500 text-white rounded-lg text-sm">Start Consultation</button>
    </div>
  )
}

function Hero() {
  return (
    <div className="relative h-[420px] w-full overflow-hidden rounded-3xl border border-blue-500/20">
      <Spline scene="https://prod.spline.design/2fSS9b44gtYBt4RI/scene.splinecode" style={{ width: '100%', height: '100%' }} />
      <div className="pointer-events-none absolute inset-0 bg-gradient-to-r from-slate-950 via-slate-950/30 to-transparent" />
      <div className="absolute inset-0 p-8 flex flex-col justify-center">
        <p className="text-blue-200/80">Introducing</p>
        <h1 className="text-4xl md:text-5xl font-bold text-white tracking-tight">DocDor — Unified Healthcare Platform</h1>
        <p className="text-blue-200/80 mt-3 max-w-2xl">Appointments, video consults, e‑prescriptions, labs and pharmacy in one experience for Doctors, Receptionists and Patients.</p>
        <div className="mt-6 flex gap-3">
          <a href="#doctor" className="px-4 py-2 bg-blue-500 hover:bg-blue-600 text-white rounded-lg">Doctor App</a>
          <a href="#reception" className="px-4 py-2 bg-white/10 hover:bg-white/20 text-white rounded-lg border border-white/10">Reception</a>
          <a href="#patient" className="px-4 py-2 bg-white/10 hover:bg-white/20 text-white rounded-lg border border-white/10">Patient</a>
        </div>
      </div>
    </div>
  )
}

function DoctorHomePreview() {
  const [metrics, setMetrics] = useState(null)
  const backend = import.meta.env.VITE_BACKEND_URL || 'http://localhost:8000'
  useEffect(() => {
    fetch(`${backend}/metrics/doctor/mock-doctor`).then(r=>r.json()).then(setMetrics).catch(()=>{})
  }, [])
  return (
    <section id="doctor" className="mt-10">
      <h2 className="text-white text-2xl font-semibold mb-4">Doctor — Home</h2>
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
        <StatCard label="Total Appointments" value={metrics?.totals?.appointments ?? '--'} />
        <StatCard label="Completed" value={metrics?.totals?.completed ?? '--'} />
      </div>
      <div className="mt-6 space-y-3">
        <p className="text-blue-200/80 text-sm">Upcoming</p>
        {(metrics?.upcoming ?? [1,2,3].map(i=>({patient_id:'sample', visit_count:i, visit_kind:'consultation', type:'clinic'}))).map((a,idx)=>(
          <AppointmentItem key={idx} a={a} />
        ))}
      </div>
    </section>
  )
}

function WireframeGrid() {
  return (
    <section className="mt-12 grid md:grid-cols-3 gap-6">
      <div className="bg-white/5 border border-white/10 rounded-2xl p-6" id="reception">
        <h3 className="text-white font-semibold mb-2">Reception — Book Appointment</h3>
        <ul className="text-blue-200/80 text-sm list-disc pl-5 space-y-1">
          <li>Search existing by phone/name</li>
          <li>Capture new patient: personal info, vitals, history</li>
          <li>Select Clinic or Online, pick time</li>
        </ul>
      </div>
      <div className="bg-white/5 border border-white/10 rounded-2xl p-6" id="patient">
        <h3 className="text-white font-semibold mb-2">Patient — Home</h3>
        <ul className="text-blue-200/80 text-sm list-disc pl-5 space-y-1">
          <li>Story-like health feed</li>
          <li>Global search: Medicine, Doctor, Lab</li>
          <li>Quick tiles: Clinic, Online, Surgery, Medical, Lab</li>
        </ul>
      </div>
      <div className="bg-white/5 border border-white/10 rounded-2xl p-6">
        <h3 className="text-white font-semibold mb-2">Prescription Workflow</h3>
        <ul className="text-blue-200/80 text-sm list-disc pl-5 space-y-1">
          <li>Symptoms with suggestions</li>
          <li>Medications: drug, dosage, frequency, duration, notes</li>
          <li>Lab Investigations</li>
          <li>Advice & Follow‑up date</li>
        </ul>
      </div>
    </section>
  )
}

function App() {
  return (
    <div className="min-h-screen bg-slate-950 text-blue-100 relative">
      <div className="max-w-6xl mx-auto p-6 md:p-10">
        <Hero />
        <DoctorHomePreview />
        <WireframeGrid />
        <div className="mt-10 flex gap-3">
          <a href="/test" className="px-4 py-2 bg-white/10 hover:bg-white/20 text-white rounded-lg border border-white/10">Backend Test</a>
          <a href="https://docs.google.com" target="_blank" className="px-4 py-2 bg-blue-500 hover:bg-blue-600 text-white rounded-lg">View API Spec</a>
        </div>
      </div>
    </div>
  )
}

export default App
