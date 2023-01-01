import React, { useState } from 'react';

export const SortFilter = ({ products, setSortedProducts }) => {
  const [selectedOption, setSelectedOption] = useState('');

  function handleChange(event) {
    setSelectedOption(event.target.value);
  }

  function handleSort() {
    let sorted;

    if (selectedOption === 'price-low-to-high') {
      sorted = products.sort((a, b) => a.price - b.price);
    } else if (selectedOption === 'price-high-to-low') {
      sorted = products.sort((a, b) => b.price - a.price);
    } else if (selectedOption === 'post-date-newest-to-oldest') {
      sorted = products.sort((a, b) => {
        const dateA = new Date(a.postDate);
        const dateB = new Date(b.postDate);
        return dateB - dateA;
      });
    } else if (selectedOption === 'post-date-oldest-to-newest') {
      sorted = products.sort((a, b) => {
        const dateA = new Date(a.postDate);
        const dateB = new Date(b.postDate);
        return dateA - dateB;
      });
    }

    setSortedProducts(sorted);
  }

  return (
    <div className="filter">
      <button onClick={handleSort}>Filter by</button>
      <select value={selectedOption} onChange={handleChange}>
        <option value="">Select an option</option>
        <option value="price-low-to-high">Price (low to high)</option>
        <option value="price-high-to-low">Price (high to low)</option>
        <option value="post-date-newest-to-oldest">
          Post date (newest to oldest)
        </option>
        <option value="post-date-oldest-to-newest">
          Post date (oldest to newest)
        </option>
      </select>
    </div>
  );
};
