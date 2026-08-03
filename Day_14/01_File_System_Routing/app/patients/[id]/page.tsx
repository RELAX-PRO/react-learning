import React from 'react';

/**
 * ==========================================
 * NEXT.JS APP ROUTER & FILE-SYSTEM ROUTING
 * ==========================================
 * Next.js uses a file-system based router where folders define routes.
 * - The `app` directory is the root of your application.
 * - Folders represent route segments (e.g., `app/patients` maps to `/patients`).
 * - Dynamic route segments are created by wrapping a folder name in square brackets (e.g., `[id]`).
 * - The `page.tsx` file makes a route segment publicly accessible. If a folder doesn't have a `page.tsx`, it's not a valid route.
 */

// Next.js uses file-system routing.
// This file at /app/patients/[id]/page.tsx will automatically match the URL /patients/123

interface PageProps {
  params: {
    id: string;
  };
}

/**
 * By default, components in the Next.js `app` directory are React Server Components (RSC).
 * Because they run on the server, they can be `async` and await data directly.
 * `params` is a special prop provided by Next.js to dynamic routes, containing the route parameters.
 */
// In Next.js App Router, pages can be Async Server Components!
export default async function PatientProfilePage({ params }: PageProps) { // `params` captures the dynamic `[id]` from the URL.
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
