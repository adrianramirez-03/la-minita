import React from 'react';
import Link from 'next/link';
import { urlFor } from '../lib/client';

const Product = ({
  category,
  product: { image, name, slug, price, savings, savingsAmount },
}) => {
  let discount = price * savingsAmount;
  discount = discount.toFixed(2);
  let updatedPrice = price - discount;
  updatedPrice = updatedPrice.toFixed(2);

  return (
    <div>
      <Link href={`/${category}/products/${slug.current}`}>
        <div className="product-card">
          <img
            src={urlFor(image && image[0])}
            width={300}
            height={360}
            className="product-image"
          />
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
