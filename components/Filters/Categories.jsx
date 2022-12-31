import React from 'react';
import styles from '../../styles/filter.module.css';

export const Categories = () => {
  return (
    <>
      <div className={styles.navs2}>
        <div className={styles.list}>
          <ul className={styles.ul}>
            <li className={styles.li}>
              <a href="/men/hats">HATS</a>
            </li>
            <li className={styles.li}>
              <a href="/men/shirts">SHIRTS</a>
            </li>
            <li className={styles.li}>
              <a href="/men/belts">BELTS</a>
            </li>
            <li className={styles.li}>
              <a href="/men/pants">PANTS</a>
            </li>
            <li className={styles.li}>
              <a href="/men/boots">BOOTS</a>
            </li>
          </ul>
        </div>
      </div>
    </>
  );
};
