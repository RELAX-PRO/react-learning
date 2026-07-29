# Lesson 2: Interface Declaration

## What is an Interface?
If primitive types (`string`, `number`, `boolean`) are the building blocks, **Interfaces** are the blueprints. 
An Interface is a strict contract that dictates the exact shape an Object must have.

## How to use Interfaces

In `Interfaces.ts` and `api.ts`, you will see interfaces being used to define our domain models (like `Patient`, `LensStockItem`, and `Doctor`).

### Key Features to Notice:
1. **Mandatory Properties**: By default, if an interface defines `fullName: string`, any object claiming to be that interface **must** have a `fullName` property.
2. **Optional Properties (`?`)**: Sometimes data might be missing (like `secondaryPhone`). Appending a `?` tells TypeScript that this property is optional.
3. **`readonly` Modifier**: If an ID should never change after an object is created, we mark it as `readonly`. TypeScript will throw an error if any code attempts to overwrite it.
4. **Extension (`extends`)**: Don't repeat yourself! If a `Doctor` and a `Patient` share properties (like ID and name), you can create a `BasePerson` interface, and have both `Doctor` and `Patient` extend it.

## Why use Interfaces?
Without interfaces, a React component receiving an object might not know what properties exist inside it. By binding your objects and API responses to Interfaces, VS Code will provide perfect auto-completion (`patient.` will instantly suggest `fullName`, `phone`, etc.), drastically speeding up your development and eliminating typos.
