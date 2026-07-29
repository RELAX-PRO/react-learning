# Lesson 6: Generics (<T>)

## The Ultimate Superpower
Generics are often considered the most intimidating part of TypeScript, but they are incredibly simple: **Generics are just variables for types.**

Instead of locking a function or component into accepting only a `string` or only a `Patient`, you allow the developer to pass the type as a parameter (`<T>`) at the exact moment they use the function.

## Why not just use `any`?
If you use `any`, you completely disable TypeScript. The compiler goes blind, auto-completion dies, and runtime errors slip through. 
With Generics (`<T>`), you retain **100% type safety**.

## Real World Examples in this Folder

1. **`GenericDataList.tsx`**:
   We built a list component that can render *anything*. 
   Notice how it is defined: `export const GenericDataList = <T,>({ items, ... }) => { ... }`
   When we use it in `DashboardView.tsx`, we explicitly pass the type we want:
   `<GenericDataList<Patient> items={patientsList} />`
   Instantly, the `renderItem` callback knows that it is dealing with a `Patient` object!

2. **`apiClient.ts`**:
   Fetching data from an API usually returns an unknown JSON object. We built an `ApiResponse<T>` interface and a generic fetch function.
   `fetchFromClinicApi<LensStockItem>("/lenses/1")` guarantees that the returned data exactly matches the `LensStockItem` interface.
