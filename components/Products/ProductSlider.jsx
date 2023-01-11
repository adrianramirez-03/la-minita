import React, { useState, useEffect } from 'react';
import styles from '../../styles/productpage.module.css';
import { SliderComponent } from './SliderComponent';

export const ProductSlider = ({ otherMenProducts, width, height }) => {
  const [offset, setOffset] = useState(0);
  const numVisible = 4;

  const visibleProducts = otherMenProducts.slice(offset, offset + numVisible);
  const hasMore = otherMenProducts.length > offset + numVisible;

  const goLeft = () => {
    setOffset(Math.max(offset - numVisible, 0));
  };
  const goRight = () => {
    setOffset(offset + numVisible);
  };

  useEffect(() => {
    // Reset the offset to 0 when the component is updated
    setOffset(0);
  }, [otherMenProducts]);

  return (
    <>
      {otherMenProducts && (
        <div>
          <div className={styles.sliderHeader}>Customers also loved</div>
          <div className={styles.sliderContainer}>
            <div className={styles.leftButtonContainer}>
              {offset > 0 && (
                <button className={styles.sliderButton} onClick={goLeft}>
                  {'<'}
                </button>
              )}
            </div>
            {visibleProducts.map((product, i) => (
              <SliderComponent
                mainCategory="men"
                key={i}
                product={product}
                width={width}
                height={height}
              />
            ))}
            <div className={styles.rightButtonContainer}>
              {hasMore && (
                <button className={styles.sliderButton} onClick={goRight}>
                  {'>'}
                </button>
              )}
            </div>
          </div>
        </div>
      )}
    </>
  );
};
