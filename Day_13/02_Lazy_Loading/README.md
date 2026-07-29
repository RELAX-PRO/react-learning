# Lesson 2: Component Lazy Loading

## Beyond the Route
In the previous lesson, we split our code at the route level. But what if a single page has a very heavy component that the user might never even click on?

In our Optometry Clinic, the `OpticsPOSView` page has a button to launch a Barcode Scanner (`OpticsBarcodeScannerModal.tsx`). This modal simulates loading heavy camera libraries and image processing tools.

If we import it normally:
```tsx
import { OpticsBarcodeScannerModal } from './OpticsBarcodeScannerModal';
```
The heavy camera libraries are downloaded immediately when the user visits the POS page, even if they never click the scanner button!

## Standard React `lazy`
In `OpticsPOSView.tsx`, we fix this using pure React:

```tsx
const LazyBarcodeScannerModal = lazy(() => import('./OpticsBarcodeScannerModal'));
```

**Notice the flow:**
1. The page loads instantly because the heavy modal is excluded from the initial bundle.
2. The user clicks "Launch Camera Scanner" (`isScannerOpen` becomes true).
3. React attempts to render `<LazyBarcodeScannerModal />`.
4. The `<Suspense>` boundary catches it, shows the loading text, and fetches the file from the server.
5. Once the file arrives, the modal appears!

> [!NOTE]
> We completely removed `next/dynamic` from this implementation because we are mastering pure React. React's built-in `lazy` combined with `Suspense` is the industry standard way to achieve lazy loading in Vite/CRA applications.
