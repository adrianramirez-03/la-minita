import Head from 'next/head';
import Image from 'next/image';
import Link from 'next/link';
import React from 'react';
import styles from '../styles/layout.module.css';
import Cart from '../images/Cart.png';

export default function Layout({ children, title }) {
  return (
    <>
      <Head>
        <title>{title ? title + ' - La Minita' : 'La Minita'}</title>
        <meta name="description" content="Western Wear Ecommerce Website" />
        <link rel="icon" href="/faveicon.ico"></link>
      </Head>

      <div className={styles.container}>
        <header className={styles.header}>
          <div className={styles.navs1}>
            <div className={styles.float1}>
              <a href="/">LOGO</a>
            </div>
            <div className={styles.float2}>
              <div className={styles.searchContainer}>
                <input
                  className={styles.search}
                  type="text"
                  placeholder="Search"
                />
              </div>
              <div>
                <a className={styles.cart} href="/cart">
                  <Image
                    src={Cart}
                    alt="Cart"
                    width={28}
                    height={25}
                    className={styles.cart}
                  />
                </a>
              </div>
            </div>
          </div>
          <nav className={styles.nav}>
            <div className={styles.navs2}>
              <div className={styles.list}>
                <ul className={styles.ul}>
                  <li className={styles.li}>
                    <a href="/men">MEN</a>
                  </li>
                  <li className={styles.li}>
                    <a href="/women">WOMEN</a>
                  </li>
                  <li className={styles.li}>
                    <a href="/kids">KIDS</a>
                  </li>
                  <li className={styles.li}>
                    <a href="/specials">SALE</a>
                  </li>
                  <li className={styles.li}>
                    <a href="#home">FILLER</a>
                  </li>
                </ul>
              </div>
            </div>
          </nav>
        </header>
        <main className={styles.contentContainer}>{children}</main>
        <footer className={styles.footer}>
          Copyright © 2022 La Minita Western Wear
        </footer>
      </div>
    </>
  );
}
