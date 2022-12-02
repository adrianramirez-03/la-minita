import React from 'react';
import styles from '../styles/filter.module.css';

const MensHeader = () => {
  return (
    <>
      <div className={styles.categoryFilterContainer}>
        <div className={styles.categoryFilter}>Filter</div>
      </div>
    </>
  );
};

export default MensHeader;
