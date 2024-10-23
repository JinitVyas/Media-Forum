import React from 'react';
import { Link } from 'react-router-dom';

const NotFound = () => {
  return (
    <div style={styles.container}>
      <h1 style={styles.title}>404 - Page Not Found</h1>
      <p style={styles.text}>Oops! The page you're looking for doesn't exist.</p>
      <Link to="/" style={styles.link}>
        Go back to Home
      </Link>
    </div>
  );
};

const styles = {
  container: {
    textAlign: 'center',
    padding: '50px',
  },
  title: {
    fontSize: '48px',
    marginBottom: '20px',
  },
  text: {
    fontSize: '20px',
    marginBottom: '30px',
  },
  link: {
    fontSize: '18px',
    textDecoration: 'none',
    color: '#007bff',
  },
};

export default NotFound;
