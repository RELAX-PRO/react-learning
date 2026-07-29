import React from 'react';

// This is the magic function for Static Site Generation (SSG) in Next.js App Router!
// It tells Next.js exactly which URLs to pre-build during `npm run build`.
export async function generateStaticParams() {
  // In a real app, you would fetch all available blog IDs from your database:
  // const posts = await fetch('...').then(res => res.json())
  
  // For this clinic example, we are telling Next.js to pre-build exactly two pages:
  // /articles/eye-health
  // /articles/contact-lenses
  return [
    { slug: 'eye-health' },
    { slug: 'contact-lenses' },
  ];
}

interface PageProps {
  params: {
    slug: string;
  };
}

export default function MedicalArticlePage({ params }: PageProps) {
  return (
    <div className="p-10 bg-slate-900 min-h-screen text-white font-mono">
      <h1 className="text-3xl text-cyan-400 font-bold mb-4">
        Article: {params.slug.replace('-', ' ').toUpperCase()}
      </h1>
      
      <div className="prose prose-invert bg-slate-800 p-6 rounded-xl border border-slate-700 max-w-2xl">
        <p className="text-slate-300 leading-relaxed mb-4">
          This article is a perfect example of Static Site Generation (SSG). 
          It does not change often. Therefore, there is no need for the server to 
          rebuild the HTML every time a patient requests it.
        </p>
        
        <p className="text-slate-300 leading-relaxed">
          Because we used <code className="text-pink-400">generateStaticParams</code>, 
          Next.js built the HTML for this page exactly ONCE during the build process. 
          When a user visits, they are served the pre-built HTML from a CDN instantly!
        </p>
      </div>
    </div>
  );
}
