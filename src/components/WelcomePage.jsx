import React from 'react';
import styles from './WelcomePage.module.css';

function WelcomePage({ onStart }) {
  return (
    <div className={styles.welcomePage}>
      <h1>Hello 👋</h1>
      <h1>Welcome to the Todo List App!</h1>
      <p>Manage your tasks efficiently.</p>
      <button onClick={onStart} className={styles.startButton}>Get Started</button>
    </div>
  );
}

export default WelcomePage;
