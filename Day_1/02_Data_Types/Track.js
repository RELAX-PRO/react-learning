/**
 * Block Comment: State Tracking Object
 * This file serves to hold the roadmap progress using a 'const' reference to an object.
 * Objects are key-value stores. Using 'const' here ensures that 'roadmapProgress' will 
 * always point to this specific object in memory, protecting the integrity of the reference.
 * The arrays inside it contain other objects, forming a nested data structure.
 */

// Internal State Tracker
const roadmapProgress = { // Creating an object literal assigned to a constant binding.
  currentModule: "JavaScript Foundations",
  topics: [
    { name: "Variables (var, let, const)", status: "COMPLETED" },
    { name: "Data Types (Primitive vs Reference)", status: "COMPLETED" },
    { name: "Operators (Arithmetic, Assignment, Comparison, Logical)", status: "COMPLETED" },
    { name: "Control Structures (if/else, switch, loops)", status: "COMPLETED" },
    { name: "Functions (Declarations, Expressions, Arrow functions)", status: "COMPLETED" },
    { name: "Template Literals (Backticks)", status: "COMPLETED" }
  ],
  milestoneNote: "This serves as a building block for modern React UI development."
};
