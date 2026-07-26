# Day 10: Form and Validation

> **💡 How to Imagine This:**
> Imagine a bureaucratic office where you need to submit paperwork. The form inputs are the application papers, validation is the clerk ensuring you didn't leave any blanks, input masking is the strict little boxes for your phone number, and submission is finally handing it over to be filed.

This day focuses on building, managing, and validating forms in React.

## Learning Order & Structure

1. **01_Controlled_components**: Managing form state natively via React (`useState`).
2. **02_Uncontrolled_components**: Utilizing DOM reference (`useRef`) to manage form inputs for performance.
3. **03_Form_validation**: Ensuring data integrity before submission (native or via libraries).
4. **04_Input_masking**: Formatting input fields seamlessly as users type.
5. **05_Submission_handling**: Managing form submission events (`onSubmit`) and communicating with backend endpoints.
6. **06_Select_elements**: Handling dropdown menus in React state.
7. **07_Checkbox_handling**: Managing single or multiple boolean values through checkbox inputs.

## Summary: Pros & Cons of Form Approaches

- **Controlled Components**: Provide absolute synchronization with React state and allow real-time feedback. Best for dynamic, dependent inputs. The main drawback is boilerplate code and potential re-renders on every keystroke.
- **Uncontrolled Components**: Keep React state minimal, resulting in better performance for large forms. Best for simple forms where data is only needed on submission. The drawback is the difficulty in implementing real-time validation or conditional UI changes.

## Practice checklist

- Build one controlled input
- Build one uncontrolled input
- Add one validation rule
- Handle one submit flow cleanly