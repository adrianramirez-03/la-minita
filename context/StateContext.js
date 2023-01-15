import React, { createContext, useState, useContext, useEffect } from 'react';
import { toast } from 'react-hot-toast';

const Context = createContext();

export const StateContext = ({ children }) => {
  const [showCart, setshowCart] = useState(false);
  const [cartItems, setCartItems] = useState();
  const [totalPrice, setTotalPrice] = useState(0);
  const [totalQuantities, setTotalQuantities] = useState(0);
  const [qty, setQty] = useState(1);

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
  }, [cartItems, totalQuantities]);

  // //original way
  const onAdd = (
    product,
    quantity,
    size,
    updatedPrice,
    quantityOfSelection
  ) => {
    if (!size) {
      return toast.error(`Please select a size`);
    }

    const checkProductInCart = cartItems.find(
      (item) => item.selectedSize === size
    );

    setTotalPrice(
      (prevTotalPrice) =>
        prevTotalPrice + (updatedPrice || product.price) * quantity
    );
    console.log(totalPrice);

    if (checkProductInCart) {
      if (checkProductInCart.quantity + quantity > quantityOfSelection) {
        return toast.error(`You've added all the stock in this size`);
      }
      setTotalQuantities(
        (prevTotalQuantities) => prevTotalQuantities + quantity
      );

      setTotalPrice(
        (prevTotalPrice) =>
          prevTotalPrice + (updatedPrice || product.price) * quantity
      );

      const updatedCartItems = cartItems.map((cartProduct) => {
        if (cartProduct.selectedSize === size) {
          if (cartProduct.savings) {
            return {
              ...cartProduct,
              discountedPrice: updatedPrice,
              quantity: cartProduct.quantity + quantity,
            };
          } else {
            return {
              ...cartProduct,
              quantity: cartProduct.quantity + quantity,
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

      if (product.savings) {
        product.discountedPrice = updatedPrice;
      }

      setCartItems([...cartItems, { ...product }]);
      setTotalQuantities(
        (prevTotalQuantities) => prevTotalQuantities + quantity
      );
    }
    toast.success(`${qty} ${product.name} added to the cart.`);
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
      }}
    >
      {children}
    </Context.Provider>
  );
};

export const useStateContext = () => useContext(Context);
