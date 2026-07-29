# Lesson 7: Image Optimization

## The Heaviest Asset
Images are often the heaviest assets on any webpage. A single unoptimized banner image can be larger than your entire React JavaScript bundle!
While frameworks like Next.js provide an `<Image>` component to handle this automatically, in pure React (Vite), we must handle it manually using modern HTML5 features.

## Pure React Optimization Techniques
Open `OptimizedFrameImage.tsx` to see all of these features combined into one enterprise-grade component:

### 1. Modern Formats (`<picture>`)
Instead of serving a heavy `.jpg`, we use the `<picture>` tag to serve Next-Gen formats.
- **AVIF**: The best compression currently available.
- **WebP**: A great fallback if the browser doesn't support AVIF.
- **JPG**: The absolute last resort for ancient browsers.

### 2. CLS Prevention (`width` and `height`)
Cumulative Layout Shift (CLS) happens when an image suddenly loads and pushes all the text down. By explicitly defining `width` and `height` attributes, the browser reserves the exact empty space for the image *before* it even downloads, keeping the page layout perfectly stable.

### 3. Native Lazy Loading (`loading="lazy"`)
We no longer need heavy JavaScript libraries to lazy-load images! By simply adding `loading="lazy"`, the browser will refuse to download the image if it is buried at the bottom of the page, saving massive amounts of bandwidth.

### 4. Async Decoding (`decoding="async"`)
When an image arrives, the processor has to decode it. This can freeze the main thread. Setting `decoding="async"` tells the browser to decode the image in the background, ensuring the UI (like scrolling or clicking buttons) remains responsive.
