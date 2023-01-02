import React, { useState } from 'react';

export const SortFilter = ({ products, setSortedProducts }) => {
  const [selectedOption, setSelectedOption] = useState('');

  function handleChange(event) {
    setSelectedOption(event.target.value);
  }

  function handleSort() {
    let sorted;

    if (selectedOption === 'price-low-to-high') {
      sorted = products.sort((a, b) => {
        if (a.savings && !b.savings) {
          return -1;
        } else if (!a.savings && b.savings) {
          return 1;
        }
        return a.price - b.price;
      });
    } else if (selectedOption === 'price-high-to-low') {
      sorted = products.sort((a, b) => {
        if (a.savings && !b.savings) {
          return -1;
        } else if (!a.savings && b.savings) {
          return 1;
        }
        return b.price - a.price;
      });
    } else if (selectedOption === 'post-date-newest-to-oldest') {
      sorted = products.sort((a, b) => {
        if (a.savings && !b.savings) {
          return -1;
        } else if (!a.savings && b.savings) {
          return 1;
        }
        const dateA = new Date(a.postDate);
        const dateB = new Date(b.postDate);
        return dateB - dateA;
      });
    } else if (selectedOption === 'post-date-oldest-to-newest') {
      sorted = products.sort((a, b) => {
        if (a.savings && !b.savings) {
          return -1;
        } else if (!a.savings && b.savings) {
          return 1;
        }
        const dateA = new Date(a.postDate);
        const dateB = new Date(b.postDate);
        return dateA - dateB;
      });
    }

    setSortedProducts(sorted);
    console.log(sorted);
  }

  return (
    <div className="filter">
      <div className="filter-by">
        <button onClick={handleSort}>Filter by:</button>
        <select value={selectedOption} onChange={handleChange}>
          <option value="">-- Select an option --</option>
          <option value="price-low-to-high">Price: Low to High</option>
          <option value="price-high-to-low">Price: High to Low</option>
          <option value="post-date-newest-to-oldest">
            Post Date: Newest to Oldest
          </option>
          <option value="post-date-oldest-to-newest">
            Post Date: Oldest to Newest
          </option>
        </select>
      </div>
    </div>
  );
};
