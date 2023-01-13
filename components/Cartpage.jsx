import React, { useRef } from 'react';
import Link from 'next/link';
import toast from 'react-hot-toast';
import styles from '../styles/cart.module.css';
import { useStateContext } from '../context/StateContent';
import { urlFor } from '../lib/client';

const Cartpage = () => {
  const cartRef = useRef();
  const { totalPrice, totalQuantities, cartItems, setShowCart } =
    useStateContext();

  return (
    <>
      <div className={styles.cartWrapper} ref={cartRef}>
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
            <p>{totalQuantities} items</p>
          </div>

          {cartItems.length < 1 && (
            <div>
              <h3>Your cart is empty</h3>
              <Link href="/">
                <button>Continue Shopping</button>
              </Link>
            </div>
          )}

          <div className={styles.productContainer}>
            {cartItems.length >= 1 &&
              cartItems.map((item) => (
                <div className={styles.product} key={item._id}>
                  <img
                    src={urlFor(item?.image[0])}
                    className={styles.cartProductImage}
                  />
                </div>
              ))}
          </div>
        </div>
      </div>
    </>
  );
};

export default Cartpage;
