import React, { useRef, useState, useEffect } from 'react';
import Link from 'next/link';
import toast from 'react-hot-toast';
import styles from '../styles/cart.module.css';
import { useStateContext } from '../context/StateContext';
import { urlFor } from '../lib/client';
import getStripe from '../lib/getStripe';

const Cartpage = () => {
  const [cart, setCart] = useState([]);
  const [totalQuantity, setTotalQuantity] = useState(0);
  const [totalPrice, setTotalPrice] = useState(0);

  const { onRemove, toggleCartItemQuanitity } = useStateContext();

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

  const handleCheckout = async () => {
    const stripe = await getStripe();

    fetch('/api/stripe', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(cart),
    })
      .then(function (response) {
        return response.json();
      })
      .then(function (session) {
        // toast.loading('Redirecting...');
        stripe.redirectToCheckout({ sessionId: session.id });
      });
    localStorage.setItem('checkoutSuccessful', true);

    //PREVIOUS METHOD
    // const response = await fetch('/api/stripe', {
    //   method: 'POST',
    //   headers: {
    //     'Content-Type': 'application/json',
    //   },
    //   body: JSON.stringify(cart),
    // });

    // if (response.statusCode === 500) return;

    // const data = await response.json();

    // toast.loading('Redirecting...');
    // stripe.redirectToCheckout({ sessionId: data.id });
  };

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
                  <Link
                    href={`/${item.mainCategory}/${item.itemCategory}/${item.slug.current}`}
                  >
                    <img
                      src={urlFor(item?.image[0])}
                      className={styles.cartProductImage}
                      width={200}
                      height={200}
                    />
                  </Link>

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
                    <div className={styles.quantityContainer}>
                      <div className={styles.quantitySelector}>
                        <span
                          onClick={() => toggleCartItemQuanitity(item, 'dec')}
                        >
                          -
                        </span>
                        <span>{item.quantity}</span>
                        <span
                          onClick={() => toggleCartItemQuanitity(item, 'inc')}
                        >
                          +
                        </span>
                      </div>
                    </div>
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
              <h4 className={styles.header}>Order Summary:</h4>
            </div>

            <div className={styles.headerLine}></div>

            <p className={styles.subTotal}>Subtotal: {totalPrice.toFixed(2)}</p>

            <p className={styles.preTax}>
              Pre-Tax Order Total: {totalPrice.toFixed(2)}
            </p>
            <button onClick={handleCheckout} className={styles.button}>
              Pay with Stripe
            </button>
          </div>
        )}
      </div>
    </>
  );
};

export default Cartpage;
