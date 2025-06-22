import React, { useState, useEffect } from 'react';
import styles from './TodoHeader.module.css';

export default function TodoHeader() {
  const [currentDate, setCurrentDate] = useState(new Date());

  useEffect(() => {
    const timer = setInterval(() => setCurrentDate(new Date()), 60000); // Update date every minute in case app stays open across days
    return () => clearInterval(timer);
  }, []);

  const options = { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric' };
  const dateString = currentDate.toLocaleDateString(undefined, options);

  return (
    <header className={styles.header} role="banner">
      <h1 className={styles.title}>To-Do List</h1>
      <p className={styles.date} aria-label={`Today is ${dateString}`}>{dateString}</p>
    </header>
  );
}

