// =========================================================================
// File: ArrayPatterns2026.jsx (Modern Array Immutability in action)
// =========================================================================
import React, { useState } from 'react';

const ArrayPatterns2026 = () => {
  const [tasks, setTasks] = useState([
    { id: 1, title: "Learn React", completed: true, priority: "High" },
    { id: 2, title: "Master Immutability", completed: false, priority: "High" },
    { id: 3, title: "Build Portfolio", completed: false, priority: "Medium" }
  ]);

  // PATTERN 2.1: ADDING a new item (Prepend to the top of the list)
  const handleAddTask = (newTitle) => {
    const newTask = { id: Date.now(), title: newTitle, completed: false, priority: "Low" };
    setTasks(prevTasks => [newTask, ...prevTasks]);
  };

  // PATTERN 2.2: DELETING an item by ID (Using .filter)
  const handleDeleteTask = (targetId) => {
    setTasks(prevTasks => prevTasks.filter(task => task.id !== targetId));
  };

  // PATTERN 2.3: UPDATING a specific item by ID (Using .map + object spread)
  const handleToggleComplete = (targetId) => {
    setTasks(prevTasks => 
      prevTasks.map(task => {
        if (task.id === targetId) {
          // Found the target! Return a clone of this specific object with inverted 'completed' status
          return { ...task, completed: !task.completed };
        }
        // Not the target? Return the item untouched!
        return task;
      })
    );
  };

  // PATTERN 2.4 (2026 SUPERPOWER): Modifying item by exact index using .with()!
  // Let's say we want to forcibly change the title of whatever task is at Index 0:
  const handleOverrideFirstTask = () => {
    setTasks(prevTasks => {
      if (prevTasks.length === 0) return prevTasks;
      
      const firstTaskClone = { ...prevTasks[0], title: "🔥 HIGHEST PRIORITY TASK!" };
      
      // .with(index, newValue) returns a brand new array instantly!
      return prevTasks.with(0, firstTaskClone);
    });
  };

  // PATTERN 2.5 (2026 SUPERPOWER): Sorting immutably using .toSorted()!
  const handleSortByTitle = () => {
    setTasks(prevTasks => {
      // .toSorted() creates a new cloned array sorted alphabetically without touching the previous RAM space!
      return prevTasks.toSorted((a, b) => a.title.localeCompare(b.title));
    });
  };

  return (
    <div className="task-manager p-6">
      <h2>Task Manager (2026 Standards)</h2>
      
      <div className="controls my-4 flex gap-2">
        <button onClick={() => handleAddTask("New Urgent Task")} className="btn font-bold">+ Add Task</button>
        <button onClick={handleOverrideFirstTask} className="btn">Override Index 0</button>
        <button onClick={handleSortByTitle} className="btn">Sort Alphabetically 🔤</button>
      </div>

      <ul className="list-none p-0">
        {tasks.map(task => (
          <li key={task.id} className="flex justify-between items-center border p-3 my-2 rounded">
            <span style={{ textDecoration: task.completed ? "line-through" : "none" }}>
              {task.title} ({task.priority})
            </span>
            <div className="actions flex gap-2">
              <button onClick={() => handleToggleComplete(task.id)}>
                {task.completed ? "↩️ Undo" : "✅ Done"}
              </button>
              <button onClick={() => handleDeleteTask(task.id)} className="text-red-500">🗑️</button>
            </div>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default ArrayPatterns2026;