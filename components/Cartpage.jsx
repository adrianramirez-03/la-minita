import React from 'react';
import Link from 'next/link';
// import toast from 'react-hot-toast';
import styles from '../styles/cart.module.css';
import { useStateContext } from '../context/StateContext';
import { urlFor } from '../lib/client';
import getStripe from '../lib/getStripe';
// import Cookies from 'js-cookie';

const Cartpage = () => {
  // const [cart, setCart] = useState([]);
  // const [totalQuantity, setTotalQuantity] = useState(0);
  // const [totalPrice, setTotalPrice] = useState(0);

  const {
    cartItems,
    totalPrice,
    totalQuantities,
    onRemove,
    toggleCartItemQuanitity,
  } = useStateContext();

  //useEffects to fetch data from localStorage and Cookies
  // useEffect(() => {
  //   if (typeof window !== 'undefined' && window.localStorage) {
  //     const storedCartItems =
  //       JSON.parse(localStorage.getItem('cartItems')) || [];
  //     setCart(storedCartItems);
  //     const storedTotalQuantity =
  //       JSON.parse(localStorage.getItem('totalQuantity')) || 0;
  //     setTotalQuantity(storedTotalQuantity);
  //     const storedTotalPrice = JSON.parse(
  //       localStorage.getItem('totalPrice') || 0
  //     );
  //     setTotalPrice(storedTotalPrice);
  //   }
  // }, []);

  // useEffect(() => {
  //   const storedCartItems = Cookies.get('cartItems')
  //     ? JSON.parse(Cookies.get('cartItems'))
  //     : [];

  //   setCart(storedCartItems);
  //   const storedTotalQuantity = Cookies.get('totalQuantity') || 0;
  //   setTotalQuantity(storedTotalQuantity);
  //   const storedTotalPrice = Cookies.get('totalPrice') || 0;
  //   setTotalPrice(storedTotalPrice);
  // }, []);

  // useEffect(() => {
  //   let cartItemsFromCookie = Cookies.get('cartItems')
  //     ? JSON.parse(Cookies.get('cartItems'))
  //     : [];
  //   setCart(cartItemsFromCookie);
  //   const totalPriceFromCookies = Cookies.get('totalPrice') || 0;
  //   setTotalPrice(Number(totalPriceFromCookies));
  //   const totalQuantityFromCookies = Cookies.get('totalQuantity') || 0;
  //   setTotalQuantity(Number(totalQuantityFromCookies));
  // }, []);

  // console.log(cart);

  const handleCheckout = async () => {
    const stripe = await getStripe();

    fetch('/api/stripe', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(cartItems),
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
            <p className={styles.header}>Your Cart ({totalQuantities} items)</p>
            <div className={styles.headerLine}></div>
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
              cartItems.map((item, index) => (
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
                      <div className={styles.discountedPriceContainer}>
                        <p className={styles.salePriceText}>Sale Price: </p>
                        <p className={styles.discountedPrice}>
                          {item.discountedPrice}
                        </p>
                      </div>
                    ) : (
                      <div className={styles.discountedPriceContainer}>
                        <p className={styles.salePriceText}>Original Price: </p>
                        <p>{item.price}</p>
                      </div>
                    )}
                    <div className={styles.quantityContainer}>
                      <div className={styles.quantitySelector}>
                        <span
                          onClick={() => toggleCartItemQuanitity(item, 'dec')}
                          disabled={item.quantity === 1}
                          style={{
                            color: item.quantity === 1 ? 'gray' : 'black',
                            pointerEvents:
                              item.quantity === 1 ? 'none' : 'auto',
                          }}
                        >
                          -
                        </span>
                        <p>{item.quantity}</p>
                        <span
                          onClick={() => toggleCartItemQuanitity(item, 'inc')}
                        >
                          +
                        </span>
                      </div>
                    </div>
                    <div
                      className={styles.remove}
                      onClick={() => onRemove(item)}
                    >
                      Remove
                    </div>
                    <p>Size: {item.selectedSize}</p>
                    <p>Color: {item.color}</p>
                  </div>
                </div>
              ))}
          </div>
        </div>

        {cartItems.length > 0 && (
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
