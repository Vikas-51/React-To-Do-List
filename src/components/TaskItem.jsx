import React from 'react';
import styles from './TaskItem.module.css';

export default function TaskItem({ task, onToggleComplete, onRemoveTask }) {
  let dueDateStr = '';
  if (task.dueDate) {
    const due = new Date(task.dueDate);
    const today = new Date();

    
    const dueMidnight = new Date(due.getFullYear(), due.getMonth(), due.getDate());
    const todayMidnight = new Date(today.getFullYear(), today.getMonth(), today.getDate());

    const options = { month: 'short', day: 'numeric' };
    const formattedDate = due.toLocaleDateString(undefined, options);

    
    if (dueMidnight.getTime() === todayMidnight.getTime()) {
      dueDateStr = formattedDate; 
    } else if(dueMidnight.getTime() > todayMidnight.getTime()) {
      dueDateStr = `Due ${formattedDate}`; 
    } else {
    
      dueDateStr = null;
    }
  }

  return (
    <li className={`${styles.taskItem} ${task.completed ? styles.completed : ''}`} tabIndex={-1}>
      <input
        className={styles.checkbox}
        type="checkbox"
        id={`todo-${task.id}`}
        checked={task.completed}
        onChange={() => onToggleComplete(task.id)}
        aria-label={`Mark task "${task.text}" as completed`}
      />
      <div className={styles.textContainer}>
        <label
          className={`${styles.label} ${task.completed ? styles.completedLabel : ''}`}
          htmlFor={`todo-${task.id}`}
        >
          {task.text}
        </label>
        {dueDateStr && (
          <time className={styles.dueDate} dateTime={task.dueDate}>
            {dueDateStr}
          </time>
        )}
      </div>
      <button
        type="button"
        className={styles.removeBtn}
        onClick={() => onRemoveTask(task.id)}
        aria-label={`Remove task "${task.text}"`}
        title="Remove task"
      >
        <svg fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" viewBox="0 0 24 24" aria-hidden="true" focusable="false">
          <line x1="18" y1="6" x2="6" y2="18"/>
          <line x1="6" y1="6" x2="18" y2="18"/>
        </svg>
      </button>
    </li>
  );
}
