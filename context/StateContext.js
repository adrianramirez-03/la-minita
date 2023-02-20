import React, { createContext, useState, useContext, useEffect } from 'react';
import { toast } from 'react-hot-toast';
import Cookies from 'js-cookie';

const Context = createContext();

export const StateContext = ({ children }) => {
  const [showCart, setshowCart] = useState(false);
  const [cartItems, setCartItems] = useState([]);
  const [totalPrice, setTotalPrice] = useState(0);
  const [totalQuantities, setTotalQuantities] = useState(0);
  const [qty, setQty] = useState(1);

  let foundProduct;
  let cartItemsFromCookie;

  //assigning cart Items and total quantity to be whatever is stored locally, or be assigned an empty array and 0 respectively
  useEffect(() => {
    if (typeof window !== 'undefined' && window.localStorage) {
      const storedCartItems =
        JSON.parse(localStorage.getItem('cartItems')) || [];
      setCartItems(storedCartItems);
      const storedTotalQuantity =
        JSON.parse(localStorage.getItem('totalQuantity')) || 0;
      setTotalQuantities(storedTotalQuantity);
      const storedTotalPrice =
        JSON.parse(localStorage.getItem('totalPrice')) || 0;
      setTotalPrice(storedTotalPrice);
    }
  }, []);

  //useEffect to keep updating the cart and total items in cart
  useEffect(() => {
    localStorage.setItem('cartItems', JSON.stringify(cartItems));
    localStorage.setItem('totalQuantity', JSON.stringify(totalQuantities));
    localStorage.setItem('totalPrice', JSON.stringify(totalPrice));
  }, [cartItems, totalQuantities, totalPrice]);

  //using cookies to save cart data
  // useEffect(() => {
  //   try {
  //     cartItemsFromCookie = JSON.parse(Cookies.get('cartItems'));
  //     setCartItems(cartItemsFromCookie);
  //   } catch (error) {
  //     setCartItems([]);
  //   }

  //   const totalPriceFromCookies = Cookies.get('totalPrice') || 0;
  //   setTotalPrice(Number(totalPriceFromCookies));
  //   const totalQuantityFromCookies = Cookies.get('totalQuantity') || 0;
  //   setTotalQuantities(Number(totalQuantityFromCookies));
  // }, []);

  // useEffect(() => {
  //   Cookies.set('cartItems', JSON.stringify(cartItems));
  //   Cookies.set('totalQuantity', totalQuantities);
  //   Cookies.set('totalPrice', totalPrice);
  // }, [cartItems, totalQuantities, totalPrice]);

  // //original way
  const onAdd = (
    product,
    quantity,
    size,
    quantityOfSelection,
    mainCategory
  ) => {
    // console.log(cartItems);
    if (!size) {
      return toast.error(`Please select a size`);
    }

    const checkProductInCart = cartItems.find(
      (item) =>
        item.slug.current === product.slug.current && item.selectedSize === size
    );

    let updatedPrice = product.price;
    if (product.savings) {
      let discount = (product.price * product.savingsAmount).toFixed(2);
      updatedPrice = (product.price - discount).toFixed(2);
    }

    if (!checkProductInCart) {
      setTotalPrice(
        (prevTotalPrice) => prevTotalPrice + updatedPrice * quantity
      );
    }

    if (checkProductInCart) {
      if (checkProductInCart.selectedSize == size) {
        if (checkProductInCart.quantity + quantity > quantityOfSelection) {
          return toast.error(`You've added all the stock in this size`);
        }
      }
      setTotalPrice(
        (prevTotalPrice) => prevTotalPrice + updatedPrice * quantity
      );

      setTotalQuantities(
        (prevTotalQuantities) => prevTotalQuantities + quantity
      );

      const updatedCartItems = cartItems.map((cartProduct) => {
        if (
          cartProduct.slug.current === product.slug.current &&
          cartProduct.selectedSize === size
        ) {
          if (cartProduct.savings) {
            return {
              ...cartProduct,
              discountedPrice: updatedPrice,
              price: updatedPrice,
              quantity: cartProduct.quantity + quantity,
              mainCategory: mainCategory,
            };
          } else {
            return {
              ...cartProduct,
              quantity: cartProduct.quantity + quantity,
              mainCategory: mainCategory,
            };
          }
        } else {
          return cartProduct;
        }
      });

      setCartItems(updatedCartItems);
    } else {
      product.quantity = quantity;
      product.selectedSize = size;
      product.mainCategory = mainCategory;

      const productClone = { ...product };
      if (product.savings) {
        productClone.discountedPrice = updatedPrice;
        productClone.price = updatedPrice;
      }

      setCartItems([...cartItems, { ...productClone }]);
      setTotalQuantities(
        (prevTotalQuantities) => prevTotalQuantities + quantity
      );
    }
    toast.success(`${qty} ${product.name} added to the cart.`);
  };

  const onRemove = (product) => {
    foundProduct = cartItems.find(
      (item) =>
        item.slug.current === product.slug.current &&
        item.selectedSize === product.selectedSize
    );

    // if (foundProduct.quantity > 1) {
    //   foundProduct.quantity -= 1;
    // } else {
    //   setCartItems(
    //     cartItems.filter(
    //       (item) =>
    //         item.slug.current !== product.slug.current ||
    //         item.selectedSize !== product.selectedSize
    //     )
    //   );
    // }

    setCartItems(
      cartItems.filter(
        (item) =>
          item.slug.current !== product.slug.current ||
          item.selectedSize !== product.selectedSize
      )
    );
    setTotalPrice(
      (prevTotalPrice) =>
        prevTotalPrice - foundProduct.price * foundProduct.quantity
    );
    setTotalQuantities(
      (prevTotalQuantities) => prevTotalQuantities - foundProduct.quantity
    );
  };

  //USING COOKIES TO SAVE CART
  // const onAdd = (product, quantity, selectedSize) => {
  //   if (!selectedSize) {
  //     return toast.error('Please select a size');
  //   }
  //   let cartItemsFromCookie;
  //   try {
  //     cartItemsFromCookie = JSON.parse(Cookies.get('cart'));
  //   } catch (err) {
  //     cartItemsFromCookie = [];
  //   }

  //   const checkProductInCart = cartItemsFromCookie.find(
  //     (item) => item._id === product._id
  //   );
  //   if (checkProductInCart) {
  //     const updatedCartItems = cartItemsFromCookie.map((cartProduct) => {
  //       if (cartProduct._id === product._id)
  //         return {
  //           ...cartProduct,
  //           quantity: cartProduct.quantity + quantity,
  //           selectedSize: selectedSize,
  //         };
  //       else return cartProduct;
  //     });
  //     setCartItems(updatedCartItems);
  //     Cookies.set('cart', JSON.stringify(updatedCartItems));
  //   } else {
  //     product.quantity = quantity;
  //     product.selectedSize = selectedSize;

  //     setCartItems([...cartItemsFromCookie, { ...product }]);
  //     Cookies.set(
  //       'cart',
  //       JSON.stringify([...cartItemsFromCookie, { ...product }])
  //     );
  //   }
  //   toast.success(`${quantity} ${product.name} added to the cart.`);
  //   console.log(cartItems);
  // };

  const incQty = (quantityOfSelection) => {
    if (qty == quantityOfSelection) {
      return toast.error('Cannot add more than available stock');
    }
    setQty((prevQty) => prevQty + 1);
  };

  const decQty = () => {
    setQty((prevQty) => {
      if (prevQty - 1 < 1) return 1;

      return prevQty - 1;
    });
  };

  const toggleCartItemQuanitity = (product, value) => {
    foundProduct = cartItems.find(
      (item) =>
        item.slug.current === product.slug.current &&
        item.selectedSize === product.selectedSize
    );

    // const newCartItems = cartItems.filter(
    //   (item) =>
    //     item.slug.current !== product.slug.current ||
    //     item.selectedSize !== product.selectedSize
    // );

    const selectedSizeObject = product.sizes.find(
      (s) => s.size === product.selectedSize
    );

    const quantityOfSelection = selectedSizeObject.quantity;

    if (value === 'inc') {
      if (foundProduct.quantity + 1 > quantityOfSelection) {
        return toast.error(`Cannot add more than available stock`);
      }
      foundProduct.quantity += 1;
      setTotalPrice(
        (prevTotalPrice) => prevTotalPrice + Number(foundProduct.price)
      );
      setTotalQuantities((prevTotalQuantities) => prevTotalQuantities + 1);
    } else if (value === 'dec') {
      if (foundProduct.quantity > 1) {
        foundProduct.quantity -= 1;
        setTotalPrice(
          (prevTotalPrice) => prevTotalPrice - Number(foundProduct.price)
        );
        setTotalQuantities((prevTotalQuantities) => prevTotalQuantities - 1);
      }
    }

    const updatedCartItems = cartItems.map((item) =>
      item.slug.current === foundProduct.slug.current &&
      item.selectedSize === foundProduct.selectedSize
        ? foundProduct
        : item
    );

    // sort the new array based on the original order of the items
    const sortedCartItems = updatedCartItems.sort(
      (a, b) => cartItems.indexOf(a) - cartItems.indexOf(b)
    );

    setCartItems(sortedCartItems);
  };

  return (
    <Context.Provider
      value={{
        showCart,
        setshowCart,
        cartItems,
        totalPrice,
        totalQuantities,
        qty,
        setQty,
        incQty,
        decQty,
        onAdd,
        onRemove,
        toggleCartItemQuanitity,
      }}
    >
      {children}
    </Context.Provider>
  );
};

export const useStateContext = () => useContext(Context);
