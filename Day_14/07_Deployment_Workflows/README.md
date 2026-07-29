# Module 7: Deployment Workflows 🚀🌍

You have built a blazing fast, Next.js Optometry Clinic with Server Components, SSR, and SSG. Now, how do you get it on the internet?

## Vercel: The Creators of Next.js
The absolute easiest way to deploy a Next.js application is using **Vercel** (the company that created Next.js). Vercel is specifically designed to understand the Next.js architecture perfectly.

## The Workflow
1. **Push to GitHub**: You commit your code and push it to a repository.
2. **Connect Vercel**: You log into Vercel and link your GitHub repository.
3. **Automatic Build**: Vercel detects it's a Next.js app and automatically runs `npm run build`.
4. **The Magic Routing**:
   - Vercel takes your Static Pages (SSG) and pushes them to a global CDN so they load instantly anywhere in the world.
   - Vercel takes your Dynamic Pages (SSR) and automatically deploys them as **Serverless Functions**!

## Environment Variables
In Next.js, NEVER commit your API keys (like your Database Password) to GitHub!
Instead, you add them in the Vercel Dashboard under **Environment Variables**. Next.js will inject them into your Node server at runtime!

*Congratulations! You have completed the Next.js Fundamentals module!* 🎉
