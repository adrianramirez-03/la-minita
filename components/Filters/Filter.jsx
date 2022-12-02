import React from 'react';
import { useState, useCallback, useEffect } from 'react';
import styles from '../../styles/filter.module.css';
import Product from '../Product';

export const Filter = ({ category, products }) => {
  const useMediaQuery = (width) => {
    const [targetReached, setTargetReached] = useState(false);

    const updateTarget = useCallback((e) => {
      if (e.matches) {
        setTargetReached(true);
      } else {
        setTargetReached(false);
      }
    }, []);

    useEffect(() => {
      const media = window.matchMedia(`(max-width: ${width}px)`);
      media.addEventListener('change', updateTarget);

      // Check on mount (callback is not called until a change occurs)
      if (media.matches) {
        setTargetReached(true);
      }

      return () => media.removeEventListener('change', updateTarget);
    }, []);

    return targetReached;
  };
  const isBreakpoint = useMediaQuery(800);

  return (
    <>
      {isBreakpoint ? (
        <div className={styles.hiddenFilterContainer}>
          <button className={styles.filterButton}> Show Filters</button>
          <div className={styles.smallContainer}>
            <div className={styles.leftSmall}></div>
            <div className={styles.rightSmall}></div>
          </div>
        </div>
      ) : (
        <div className={styles.container}>
          <div className={styles.left}></div>
          <div className={styles.right}>
            <div className="products-container">
              {products?.map((product) => (
                <Product
                  category={category}
                  key={product._id}
                  product={product}
                />
              ))}
            </div>
          </div>
        </div>
      )}
    </>
  );
};
