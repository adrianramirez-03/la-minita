import React from 'react';
import { useState, useCallback, useEffect } from 'react';
import styles from '../../styles/filter.module.css';
import Producttwo from '../Producttwo';
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
  const isBreakpoint = useMediaQuery(500);

  return (
    <>
      {isBreakpoint ? (
        <div className={styles.hiddenFilterContainer}>
          <button className={styles.filterButton}>Show Filters</button>
          <div className={styles.smallContainer}>
            {products?.map((product) => (
              <Producttwo
                category={category}
                key={product._id}
                product={product}
              />
            ))}
          </div>
        </div>
      ) : (
        <div className={styles.container}>
          <div className={styles.left}></div>
          <div className={styles.right}>
            <div className="products-container">
              {products?.map((product) => (
                <Producttwo
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
