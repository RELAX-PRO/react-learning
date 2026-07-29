# Module 1: File System Routing 📁🌐

Welcome to the world of Next.js! 
In pure React, if you want multiple pages (Home, About, Patient Profile), you have to install a library like `react-router-dom` and manually write a giant configuration file linking URLs to Components.

Next.js completely eliminates this. It uses **File System Routing**.

## The App Router (`/app`)
In Next.js, the structure of your folders *is* the structure of your website.

Look at the `app` folder in this directory:
1. `app/page.tsx` ➡️ This becomes your home page (`/`).
2. `app/patients/page.tsx` ➡️ This becomes `/patients`.
3. `app/patients/[id]/page.tsx` ➡️ This becomes a **Dynamic Route** (e.g., `/patients/123`).

## Dynamic Routes (The `[id]` folder)
When you name a folder with brackets like `[id]`, you are telling Next.js: "This is a variable!".
Next.js will capture whatever the user types in the URL and pass it to your component via the `params` prop.

Check out `app/patients/[id]/page.tsx` to see how we receive the Patient ID directly from the URL, without any setup!
