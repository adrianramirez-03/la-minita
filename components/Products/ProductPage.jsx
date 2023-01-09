import React, { useState } from 'react';
import { urlFor } from '../../lib/client';
import styles from '../../styles/productpage.module.css';
import Link from 'next/link';

export const ProductPage = ({
  product: {
    name,
    image,
    price,
    details,
    sizes,
    color,
    itemCategory,
    quantity,
  },
  menBelts,
  mainCategory,
}) => {
  const [selectedSize, setSelectedSize] = useState(null); //keep track of size selected
  const [amount, setAmount] = useState(1); //keep track of quantity a customer wants to buy
  const [index, setIndex] = useState(0); //keep track of image index

  const handleSizeClicked = (size) => {
    setSelectedSize(size);
  };

  const handleQuantityAdd = () => {
    setAmount((amount = amount + 1));
  };

  const handleQuantitySub = () => {
    setAmount(Math.max(amount - 1, 1));
  };

  return (
    <>
      <div className={styles.pageContainer}>
        <div className={styles.links}>
          <Link href={`/${mainCategory}`}>
            <a className={styles.customLink}>Men</a>
          </Link>{' '}
          /{' '}
          <Link href={`/${mainCategory}/${itemCategory}`}>
            <a className={styles.customLink}>All Men's Boots</a>
          </Link>
        </div>

        <div className={styles.container}>
          <div className={styles.imageSlider}>
            <div className={styles.allImagesContainer}>
              {image?.map((item, i) => (
                <img
                  key={i}
                  src={urlFor(item)}
                  className={styles.smallImage}
                  onClick={() => setIndex(i)}
                  style={{
                    opacity: index === i ? '75%' : '100%',
                  }}
                />
              ))}
            </div>
          </div>

          <div className={styles.leftContainer}>
            <div className={styles.imageContainer}>
              <img
                src={urlFor(image && image[index])}
                className={styles.productImage}
              />
            </div>
          </div>

          <div className={styles.rightContainer}>
            <div className={styles.informationContainer}>
              <p className={styles.store}>La Minita Wear</p>
              <h3 className={styles.name}>{name}</h3>
              <p className={styles.price}>${price}</p>

              <div className={styles.quantityContainer}>
                <div className={styles.quantityHeader}>Quantity:</div>
                <div className={styles.quantitySelector}>
                  <span onClick={handleQuantitySub}>-</span>
                  <span>{amount}</span>
                  <span onClick={handleQuantityAdd}>+</span>
                </div>
              </div>

              <p className={styles.color}>
                <span className={styles.span}>Color</span>: {color}
              </p>
              <p className={styles.size}>
                <span className={styles.span}>Size</span>:
              </p>
              <div style={{ display: 'flex', marginTop: 10, flexWrap: 'wrap' }}>
                {sizes.map((size) => (
                  <div
                    key={size}
                    onClick={() => handleSizeClicked(size)}
                    className={styles.selection}
                    style={{
                      backgroundColor:
                        size === selectedSize ? 'lightgrey' : 'white',
                    }}
                  >
                    {size}
                  </div>
                ))}
              </div>
              <div>
                <button className={styles.button}>Add to Cart</button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};
