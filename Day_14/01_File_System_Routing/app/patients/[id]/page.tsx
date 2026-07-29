import React from 'react';

// Next.js uses file-system routing.
// This file at /app/patients/[id]/page.tsx will automatically match the URL /patients/123

interface PageProps {
  params: {
    id: string;
  };
}

// In Next.js App Router, pages can be Async Server Components!
export default async function PatientProfilePage({ params }: PageProps) {
  // We can fetch data directly in the component without useEffect!
  // const patient = await fetch(`https://api.clinic.com/patients/${params.id}`).then(res => res.json());

  return (
    <div className="p-10 bg-slate-900 text-white min-h-screen font-mono">
      <h1 className="text-3xl text-cyan-400 mb-6">Patient Profile</h1>
      
      <div className="bg-slate-800 p-6 rounded-xl border border-slate-700">
        <h2 className="text-xl mb-4">Patient ID: <span className="text-emerald-400">{params.id}</span></h2>
        <p className="text-slate-400">
          Because this file is named <code className="text-pink-400 bg-slate-900 px-2 py-1 rounded">page.tsx</code> and is located inside the <code className="text-pink-400 bg-slate-900 px-2 py-1 rounded">[id]</code> folder, 
          Next.js automatically created a dynamic route for us!
        </p>
      </div>
    </div>
  );
}
