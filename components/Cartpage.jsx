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

  return (
    <>
      <div className={styles.cartWrapper}>
        <div className={styles.cartContainer}>
          {/* <button
            type="button"
            className={styles.cartHeading}
            onClick={() => {}}
          >
            Hello
          </button> */}
          <div>
            <p>Your Cart:</p>
            <p>{totalQuantity} items</p>
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
                  <p>{item.name}</p>

                  {item.discountedPrice ? (
                    <p className={styles.discountedPrice}>
                      {item.discountedPrice}
                    </p>
                  ) : (
                    <p>{item.price}</p>
                  )}
                  <p>Quantity: {item.quantity}</p>
                  <p>Size: {item.selectedSize}</p>
                </div>
              ))}

            {cart.length >= 1 && <p>Total: {totalPrice}</p>}
          </div>
        </div>
      </div>
    </>
  );
};

export default Cartpage;
