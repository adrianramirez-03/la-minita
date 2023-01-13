import React, { useState } from 'react';
import { urlFor } from '../../lib/client';
import styles from '../../styles/productpage.module.css';
import Link from 'next/link';
import { useStateContext } from '../../context/StateContent';

export const ProductPage = ({ product, width, height, mainCategory }) => {
  const [selectedSize, setSelectedSize] = useState(null); //keep track of size selected
  const [amount, setAmount] = useState(1); //keep track of quantity a customer wants to buy
  const [index, setIndex] = useState(0); //keep track of image index

  //calculating discounts if they exits
  let discount = product.price * product.savingsAmount;
  discount = discount.toFixed(2);
  let updatedPrice = product.price - discount;
  updatedPrice = updatedPrice.toFixed(2);
  let savingsWhole = product.savingsAmount * 100;

  const handleSizeClicked = (size) => {
    setSelectedSize(size);
  };

  const handleQuantityAdd = () => {
    incQty(product.quantity);
  };

  const handleQuantitySub = () => {
    decQty();
  };

  //height and width map to pass specific sizes for each category
  const widthMap = new Map();
  const heightMap = new Map();

  widthMap['hats'] = 85;
  heightMap['hats'] = 65;

  widthMap['pants'] = 75;
  heightMap['pants'] = 75;

  widthMap['shirts'] = 70;
  heightMap['shirts'] = 75;

  widthMap['boots'] = 75;
  heightMap['boots'] = 75;

  widthMap['belts'] = 75;
  heightMap['belts'] = 65;
  //

  const { decQty, incQty, qty, onAdd } = useStateContext();

  return (
    <>
      <div className={styles.pageContainer}>
        <div className={styles.links}>
          <Link href={`/${mainCategory}`}>
            <a className={styles.customLink}>Men</a>
          </Link>{' '}
          /{' '}
          <Link href={`/${mainCategory}/${product.itemCategory}`}>
            <a className={styles.customLink}>All Men's Boots</a>
          </Link>
        </div>

        <div className={styles.container}>
          <div className={styles.imageSlider}>
            <div className={styles.allImagesContainer}>
              {product.image?.map((item, i) => (
                <img
                  key={i}
                  src={urlFor(item)}
                  className={styles.smallImage}
                  onClick={() => setIndex(i)}
                  style={{
                    opacity: index === i ? '75%' : '100%',
                    height: heightMap[product.itemCategory],
                    width: widthMap[product.itemCategory],
                  }}
                />
              ))}
            </div>
          </div>

          <div className={styles.leftContainer}>
            <div className={styles.imageContainer}>
              <img
                src={urlFor(product.image && product.image[index])}
                className={styles.productImage}
                width={width}
                height={height}
              />
            </div>
          </div>

          <div className={styles.rightContainer}>
            <div className={styles.informationContainer}>
              <p className={styles.store}>La Minita Wear</p>
              <h3 className={styles.name}>{product.name}</h3>

              {product.savings ? (
                <>
                  <p className={styles.discountPrice}>
                    ${updatedPrice} ({savingsWhole}% Off)
                  </p>
                  <p className={styles.originalPriceCrossed}>
                    ${product.price}
                  </p>
                </>
              ) : (
                <p className={styles.price}>${product.price}</p>
              )}

              <div className={styles.quantityContainer}>
                <div className={styles.quantityHeader}>Quantity:</div>
                <div className={styles.quantitySelector}>
                  <span onClick={handleQuantitySub}>-</span>
                  <span>{qty}</span>
                  <span onClick={handleQuantityAdd}>+</span>
                </div>
              </div>
              <p className={styles.inStock}>In stock: {product.quantity}</p>

              <p className={styles.color}>
                <span className={styles.span}>Color</span>: {product.color}
              </p>
              <p className={styles.size}>
                <span className={styles.span}>Size</span>:
              </p>
              <div style={{ display: 'flex', marginTop: 10, flexWrap: 'wrap' }}>
                {product.sizes.map((size) => (
                  <div
                    key={size}
                    onClick={() => handleSizeClicked(size)}
                    className={styles.selection}
                    style={{
                      backgroundColor:
                        size === selectedSize ? 'lightgrey' : 'white',
                      width: product.itemCategory == 'pants' ? 60 : 40,
                    }}
                  >
                    {size}
                  </div>
                ))}
              </div>
              <div>
                <button
                  onClick={() => onAdd(product, qty, selectedSize)}
                  className={styles.button}
                >
                  Add to Cart
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};
