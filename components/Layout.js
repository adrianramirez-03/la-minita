import Head from 'next/head';
import Image from 'next/image';
import Link from 'next/link';
import React, { useState } from 'react';
import styles from '../styles/layout.module.css';
import Cart from '../public/Cart.png';
import { client } from '../lib/client';

import { useStateContext } from '../context/StateContext';
import { useRouter } from 'next/router';

export default function Layout({ children, title }) {
  const { showCart, setShowCart, totalQuantities } = useStateContext();
  const [query, setQuery] = useState('');

  const router = useRouter();

  const handleChange = (e) => {
    e.preventDefault();
    setQuery(e.target.value);
  };

  function handleFilterSearch(e) {
    e.preventDefault();
    router.push(`/search?query=${query}`);
    console.log(query);
  }

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
                <form onSubmit={handleFilterSearch}>
                  <input
                    className={styles.search}
                    id="query"
                    placeholder="Search"
                    onChange={handleChange}
                  />
                </form>
              </div>

              <div className={styles.cartContainer}>
                <div className={styles.cart}>
                  <a href="/cart">
                    <div className={styles.cartImage}>
                      <Image
                        src={Cart}
                        alt="Cart"
                        width={28}
                        height={25}
                        className={styles.cartImage}
                      />
                      <span>{totalQuantities}</span>
                    </div>
                  </a>
                </div>
              </div>
            </div>
          </div>

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
        </header>
        <main className={styles.contentContainer}>{children}</main>
        <footer className={styles.footer}>
          Copyright © 2022 La Minita Western Wear
        </footer>
      </div>
    </>
  );
}
