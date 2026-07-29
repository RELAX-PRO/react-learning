# Module 4: Server Side Rendering (SSR) 🔄

In the old days of Pure React (Create React App/Vite), you shipped an empty HTML file `<div id="root"></div>` to the browser, and the browser had to do all the heavy lifting to draw the UI. 

**Server Side Rendering (SSR)** changes this.
When a user requests a URL, the Next.js server acts as the chef:
1. It looks at the database.
2. It cooks the data into the React Component.
3. It generates the final HTML.
4. It sends the finished HTML meal to the user.

## Why use SSR?
- **SEO**: Google bots can instantly read the HTML content (like Patient articles or Doctor profiles). They can't read an empty `<div id="root"></div>`.
- **Always Fresh**: The HTML is generated *at the exact moment* of the request. This means it is perfect for highly dynamic data like a "Live Clinic Dashboard" where the number of waiting patients changes every minute.

## How to trigger SSR in Next.js App Router?
By default, Next.js tries to be smart and cache things. To force it to perform SSR on *every single request*, we add this line to our page:
```typescript
export const dynamic = 'force-dynamic';
```
Check out `page.tsx` to see a Live Dashboard that is rendered on the server every time you refresh!
