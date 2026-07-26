# Styling Approaches

This day compares the main styling strategies used in React projects, providing examples to help choose the right one for your problem.

## Learning Order

1. **01_Standard_CSS**: Traditional global stylesheets.
2. **02_CSS_Modules**: Locally scoped CSS classes.
3. **03_SASS_Integration**: CSS preprocessor with advanced features like variables and nesting.
4. **04_Tailwind_CSS**: Utility-first CSS framework for rapid UI building.
5. **05_Styled_Components**: CSS-in-JS library for styling components dynamically.
6. **06_UI_Component_Libraries**: Pre-built components (e.g., shadcn/ui) for speed and accessibility.
7. **07_CSS_Variables**: Native CSS custom properties for dynamic theming.
8. **08_Hybrid_Example**: Combining Tailwind CSS with CSS Variables for advanced theming.

## Pros & Cons Summary

- **Standard CSS**: Simple but prone to global conflicts.
- **CSS Modules**: Solves scoping issues but slightly more verbose.
- **SASS**: Powerful features but requires compilation and can lead to complex nesting.
- **Tailwind CSS**: Extremely fast and consistent, but clutters JSX markup.
- **Styled Components**: Excellent scoping and dynamic props, but adds runtime overhead.
- **UI Libraries**: Rapid development with accessible defaults, but harder to customize deeply.
- **CSS Variables**: Native dynamic theming without re-renders, but lacks scoped enforcement globally.
- **Hybrid Styling**: Highly performant and customizable, but requires careful setup.

## How to think about it

- Start with the simplest option that solves the problem cleanly.
- Use Tailwind or CSS Modules when you want practical control.
- Use a UI library when speed and consistency matter more than writing everything by hand.
- Treat shadcn/ui as a strong modern default inside the UI component library track.

## What to focus on

- Scope and collision control
- Maintainability and scale
- Design consistency across screens
- How each approach affects component structure
- How component libraries and shadcn/ui change development speed

## Practice checklist

- Style one component with plain CSS
- Convert one stylesheet to CSS Modules
- Define one reusable CSS variable
- Compare Tailwind and component-library workflows
- Decide whether shadcn/ui fits one sample project better than a traditional library
