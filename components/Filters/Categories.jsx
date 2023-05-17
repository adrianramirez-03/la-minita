import React from 'react';
import styles from '../../styles/filter.module.css';
import Link from 'next/link';

export const Categories = () => {
  return (
    <>
      <div className={styles.navs2}>
        <div className={styles.list}>
          <ul className={styles.ul}>
            <li className={styles.li}>
              <Link href="/men/hats">HATS</Link>
            </li>
            <li className={styles.li}>
              <Link href="/men/shirts">SHIRTS</Link>
            </li>
            <li className={styles.li}>
              <Link href="/men/belts">BELTS</Link>
            </li>
            <li className={styles.li}>
              <Link href="/men/pants">PANTS</Link>
            </li>
            <li className={styles.li}>
              <Link href="/men/boots">BOOTS</Link>
            </li>
          </ul>
        </div>
      </div>
    </>
  );
};
