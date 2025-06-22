import React, { useState } from 'react';
import styles from './AddTaskForm.module.css';

export default function AddTaskForm({ onAddTask, error }) {
  const [input, setInput] = useState('');
  const [dueDate, setDueDate] = useState('');
  const [isAnimating, setIsAnimating] = useState(false);

  const handleAddTask = (e) => {
    e.preventDefault();

    if (!input.trim()) return;

    setIsAnimating(true);

    // Total animation duration is 1.5s in CSS (flip out 0.5s, hold 0.5s, flip back 0.5s)
    setTimeout(() => {
      onAddTask(input, dueDate);
      setInput('');
      setDueDate('');
      setIsAnimating(false);
    }, 1500);
  };

  return (
    <form className={styles.form} onSubmit={handleAddTask} aria-label="Add new task form" noValidate>
      <input
        type="text"
        aria-label="New task"
        placeholder="Add new task..."
        value={input}
        onChange={(e) => setInput(e.target.value)}
        aria-invalid={error ? 'true' : 'false'}
        aria-describedby={error ? 'error-message' : undefined}
        maxLength={100}
        className={styles.input}
        required
      />
      <input
        type="date"
        aria-label="Due date (optional)"
        value={dueDate}
        onChange={(e) => setDueDate(e.target.value)}
        className={styles.dateInput}
        min={new Date().toISOString().split('T')[0]}
      />
      <button
        type="submit"
        className={`${styles.button} ${isAnimating ? styles.animate3d : ''}`}
        aria-label="Add task"
        disabled={isAnimating}
      >
        <span className={styles.front}>{!isAnimating && 'Add'}</span>
        <span className={styles.back}>
          {/* Filled thumbs-up icon */}
          <i
            className="bi bi-hand-thumbs-up-fill"
            style={{ fontSize: '1.5rem', color: '#facc15', transform: 'translateZ(2px)' }}
            aria-hidden="true"
          ></i>
        </span>
      </button>
    </form>
  );
}
