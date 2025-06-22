import React from 'react';
import styles from './FilterSortControls.module.css';

export default function FilterSortControls({ filter, sortBy, onFilterChange, onSortChange }) {
  return (
    <section className={styles.controls} aria-label="Task filters and sorting">
      <label htmlFor="filter-select" className={styles.srOnly}>
        Filter tasks
      </label>
      <select
        id="filter-select"
        value={filter}
        onChange={e => onFilterChange(e.target.value)}
        aria-label="Filter tasks by status"
        className={styles.select}
      >
        <option value="all">All tasks</option>
        <option value="active">Active tasks</option>
        <option value="completed">Completed tasks</option>
      </select>
      <label htmlFor="sort-select" className={styles.srOnly}>
        Sort tasks
      </label>
      <select
        id="sort-select"
        value={sortBy}
        onChange={e => onSortChange(e.target.value)}
        aria-label="Sort tasks"
        className={styles.select}
      >
        <option value="created">Newest first</option>
        <option value="completed">By completion status</option>
      </select>
    </section>
  );
}
