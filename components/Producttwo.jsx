import React from 'react';
import Link from 'next/link';
import { urlFor } from '../lib/client';

const Product = ({
  mainCategory,
  product: {
    image,
    name,
    itemCategory,
    sizes,
    width,
    length,
    slug,
    price,
    savings,
    savingsAmount,
  },
  productWidth,
  productHeight,
}) => {
  let discount = price * savingsAmount;
  discount = discount.toFixed(2);
  let updatedPrice = price - discount;
  updatedPrice = updatedPrice.toFixed(2);

  return (
    <div className="productContainer">
      <Link href={`/${mainCategory}/${itemCategory}/${slug.current}`}>
        <div className="product-card">
          <div className="image-container">
            <img
              src={urlFor(image && image[0])}
              width={productWidth}
              height={productHeight}
              className="product-image"
            />
          </div>
          <p className="product-name">{name}</p>
          <div>
            {savings ? (
              <div>
                <div className="price-container">
                  <p className="cross-out">${price}</p>
                  <p className="updated-price">${updatedPrice}</p>
                </div>
                <p>{savings}</p>
                <p>{`$${discount} Off`}</p>
              </div>
            ) : (
              <p className="original-price">${price}</p>
            )}
          </div>
        </div>
      </Link>
    </div>
  );
};

export default Product;
