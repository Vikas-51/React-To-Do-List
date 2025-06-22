import React from 'react';
import TaskItem from './TaskItem';
import styles from './TaskList.module.css';

export default function TaskList({ tasks, onToggleComplete, onRemoveTask }) {
  if (tasks.length === 0) {
    return (
      <p className={styles.noTasks} aria-live="polite" aria-atomic="true" tabIndex={-1}>
        No tasks to show.
      </p>
    );
  }

  return (
    <ul className={styles.list} aria-live="polite" aria-relevant="additions removals">
      {tasks.slice().map(task => ( 
        <TaskItem
          key={task.id}
          task={task}
          onToggleComplete={onToggleComplete}
          onRemoveTask={onRemoveTask}
        />
      ))}
    </ul>
  );
}
