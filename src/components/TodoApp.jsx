import React, { useState, useEffect } from 'react';
import TodoHeader from './TodoHeader';
import AddTaskForm from './AddTaskForm';
import FilterSortControls from './FilterSortControls';
import TaskList from './TaskList';
import WelcomePage from './WelcomePage';
import styles from './TodoApp.module.css';

const STORAGE_KEY = 'react-todo-list-tasks';

export default function TodoApp() {
  const [tasks, setTasks] = useState(() => {
    try {
      const saved = localStorage.getItem(STORAGE_KEY);
      return saved ? JSON.parse(saved) : [];
    } catch {
      return [];
    }
  });

  const [error, setError] = useState('');
  const [filter, setFilter] = useState('all'); // all, active, completed
  const [sortBy, setSortBy] = useState('created'); // created, completed

  useEffect(() => {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(tasks));
  }, [tasks]);
function handleAddTask(text, dueDate) {
  const taskText = text.trim();
  if (!taskText) {
    setError('Please enter a non-empty task.');
    return;
  }
  setError('');
  const newTask = {
    id: Date.now(),
    text: taskText,
    completed: false,
    createdAt: Date.now(),
    dueDate: dueDate || null,  // Store null if no dueDate selected
  };
  setTasks(prev => [newTask, ...prev]);
}


  function toggleCompleted(id) {
    setTasks(prev =>
      prev.map(task =>
        task.id === id ? { ...task, completed: !task.completed } : task
      )
    );
  }

  function removeTask(id) {
    setTasks(prev => prev.filter(task => task.id !== id));
  }

  function getFilteredTasks() {
    let filtered = tasks;
    if (filter === 'active') {
      filtered = tasks.filter(t => !t.completed);
    } else if (filter === 'completed') {
      filtered = tasks.filter(t => t.completed);
    }
    if (sortBy === 'created') {
      filtered = filtered.slice().sort((a, b) => b.createdAt - a.createdAt);
    } else if (sortBy === 'completed') {
      filtered = filtered.slice().sort((a, b) => Number(a.completed) - Number(b.completed));
    }
    return filtered;
  }
const [showWelcome, setShowWelcome] = useState(true); // New state to track welcome page visibility
  const handleStart = () => {
    setShowWelcome(false); // Hide welcome page and show app
  };
  return (
    <main className={styles.container} role="main" aria-label="To-Do List Application">
      {showWelcome ? (
        <WelcomePage onStart={handleStart} /> // Render WelcomePage
      ) : (
        <>
          <TodoHeader />
          <AddTaskForm onAddTask={handleAddTask} error={error} />
          <FilterSortControls
            filter={filter}
            sortBy={sortBy}
            onFilterChange={setFilter}
            onSortChange={setSortBy}
          />
          <TaskList
            tasks={getFilteredTasks()}
            onToggleComplete={toggleCompleted}
            onRemoveTask={removeTask}
          />
        </>
      )}
    </main>
  );
}