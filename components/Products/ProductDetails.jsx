import React, { useState } from 'react';
import styles from '../../styles/productpage.module.css';

export const ProductDetails = ({ details }) => {
  const [isVisible, setIsVisible] = useState(true);

  const handleClicked = () => {
    setIsVisible(!isVisible);
  };
  return (
    <>
      {details && (
        <div>
          <div className={styles.detailsHeader} onClick={handleClicked}>
            Product Details
          </div>

          {isVisible && (
            <ul className={styles.noPadding}>
              {details.map((point, i) => (
                <li className={styles.listItem} key={i}>
                  {point}
                </li>
              ))}
            </ul>
          )}
          <div className={styles.line}></div>
        </div>
      )}
    </>
  );
};
