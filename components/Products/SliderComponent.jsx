import React from 'react';
import styles from '../../styles/productpage.module.css';
import { urlFor } from '../../lib/client';
import Link from 'next/link';

export const SliderComponent = ({
  mainCategory,
  product: { image, name, price, itemCategory, slug },
  width,
  height,
}) => {
  return (
    <>
      <Link href={`/${mainCategory}/${itemCategory}/${slug.current}`}>
        <div className={styles.sliderComponentContainer}>
          <div className={styles.sliderImageContainer}>
            <img
              src={urlFor(image && image[0])}
              height={height}
              width={width}
              className="product-image"
            />
          </div>
          <div className={styles.sliderInfo}>
            <div className={styles.sliderName}>{name}</div>
            <div className={styles.sliderPrice}>${price}</div>
          </div>
        </div>
      </Link>
    </>
  );
};
