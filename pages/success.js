import Link from 'next/link';
import React from 'react';
import { Layout } from '../components';
import styles from '../styles/success.module.css';
import { CheckmarkIcon } from 'react-hot-toast';
// import { toast } from 'react-hot-toast';

const Success = () => {
  if (typeof window !== 'undefined' && window.localStorage) {
    const checkoutSuccessful = localStorage.getItem('checkoutSuccessful');

    if (checkoutSuccessful) {
      localStorage.clear();
      // localStorage.removeItem('cartItems');
      // localStorage.removeItem('totalQuantity');
      // localStorage.removeItem('totalPrice');
      // localStorage.removeItem('checkoutSuccessful');
    }
  }

  return (
    <Layout>
      <div className={styles.successWrapper}>
        <div className={styles.container}>
          <CheckmarkIcon className={styles.toast} />
          <h2>Thank you for your purchase</h2>
          <p className="email-msg">
            You should receive an order confirmation email shortly.
          </p>
          <p className={styles.description}>
            If you have any questions, please email
            <a className="email" href="mailto:laminitawear@gmail.com">
              laminitawear@gmail.com
            </a>
          </p>
          <Link href="/">
            <button className={styles.button}>Continue Shopping</button>
          </Link>
        </div>
      </div>
    </Layout>
  );
};

export default Success;
