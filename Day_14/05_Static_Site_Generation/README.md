# Module 5: Static Site Generation (SSG) ⚡🧱

If SSR (Server Side Rendering) is a chef cooking a fresh meal every time a customer orders, **SSG (Static Site Generation)** is a bakery that bakes all the bread at 5:00 AM, puts it on the shelf, and instantly hands it to customers all day long!

## How SSG Works
During the Build phase (`npm run build`), Next.js executes your React components, generates the final HTML files, and saves them to the hard drive.
When a user requests the page, the server does zero work. It just hands them the pre-made HTML file. It is the absolute fastest way to serve a webpage!

## When to use SSG?
Use SSG for pages that **do not change often**:
- The Clinic's "About Us" page.
- Medical Blog Articles (e.g., "How to wear contact lenses").
- The Contact / Location page.

## Dynamic SSG (`generateStaticParams`)
What if you have dynamic routes like `/articles/[slug]`? How does the bakery know which articles to bake at 5:00 AM?
You use a special function called `generateStaticParams()`. 

Check out `page.tsx`! By returning an array of slugs (`eye-health`, `contact-lenses`), we tell Next.js to pre-build the HTML for those exact pages during the build process!
