import React, { useRef, useState, useEffect } from 'react';
import Link from 'next/link';
import toast from 'react-hot-toast';
import styles from '../styles/cart.module.css';
import { useStateContext } from '../context/StateContext';
import { urlFor } from '../lib/client';
import Cookies from 'js-cookie';

const Cartpage = () => {
  const [cart, setCart] = useState([]);
  const [totalQuantity, setTotalQuantity] = useState([]);
  const [totalPrice, setTotalPrice] = useState(0);

  useEffect(() => {
    if (typeof window !== 'undefined' && window.localStorage) {
      const storedCartItems =
        JSON.parse(localStorage.getItem('cartItems')) || [];
      setCart(storedCartItems);
      const storedTotalQuantity =
        JSON.parse(localStorage.getItem('totalQuantity')) || 0;
      setTotalQuantity(storedTotalQuantity);
      const storedTotalPrice = JSON.parse(
        localStorage.getItem('totalPrice') || 0
      );
      setTotalPrice(storedTotalPrice);
    }
  }, []);

  console.log(cart);
  let shippingPrice = 10.95;
  return (
    <>
      <div className={styles.cartWrapper}>
        <div className={styles.cartContainer}>
          <div>
            <p className={styles.header}>Your Cart ({totalQuantity} items)</p>
            <div className={styles.headerLine}></div>
          </div>

          {cart.length < 1 && (
            <div>
              <h3>Your cart is empty</h3>
              <Link href="/">
                <button>Continue Shopping</button>
              </Link>
            </div>
          )}

          <div className={styles.productContainer}>
            {cart.length >= 1 &&
              cart.map((item, index) => (
                <div className={styles.product} key={index}>
                  <img
                    src={urlFor(item?.image[0])}
                    className={styles.cartProductImage}
                    width={200}
                    height={200}
                  />
                  <div className={styles.productInfo}>
                    <Link
                      href={`/${item.mainCategory}/${item.itemCategory}/${item.slug.current}`}
                    >
                      <p className={styles.name}>{item.name}</p>
                    </Link>

                    {item.discountedPrice ? (
                      <p className={styles.discountedPrice}>
                        {item.discountedPrice}
                      </p>
                    ) : (
                      <p>{item.price}</p>
                    )}
                    <p>Quantity: {item.quantity}</p>
                    <p>Size: {item.selectedSize}</p>
                    <p>Color: {item.color}</p>
                  </div>
                </div>
              ))}
          </div>
        </div>

        {cart.length > 0 && (
          <div className={styles.cartInformation}>
            <div>
              <h4>Order Summary:</h4>
            </div>
            <p>Subtotal: {totalPrice.toFixed(2)}</p>
            <p>Shipping: ${shippingPrice}</p>
            <div className={styles.line}></div>
            <p className={styles.preTax}>
              Pre-Tax Order Total: {totalPrice + shippingPrice}
            </p>
            <button className={styles.button}>Proceed to checkout</button>
          </div>
        )}
      </div>
    </>
  );
};

export default Cartpage;
