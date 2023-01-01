import React, { useState } from 'react';

export const EcommerceFilter = ({ onFilter }) => {
  const [selectedSizes, setSelectedSizes] = useState([]);
  const [selectedBrands, setSelectedBrands] = useState([]);
  const [selectedStyles, setSelectedStyles] = useState([]);
  const [selectedSkins, setSelectedSkins] = useState([]);
  const [selectedColors, setSelectedColors] = useState([]);
  const [showSizes, setShowSizes] = useState(false);
  const [showBrands, setShowBrands] = useState(false);
  const [showStyles, setShowStyles] = useState(false);
  const [showSkins, setShowSkins] = useState(false);
  const [showColors, setShowColors] = useState(false);

  const [showAllSizes, setShowAllSizes] = useState(false);
  const [showAllBrands, setShowAllBrands] = useState(false);
  const [showAllStyles, setShowAllStyles] = useState(false);
  const [showAllSkins, setShowAllSkins] = useState(false);
  const [showAllColors, setShowAllColors] = useState(false);

  const sizes = ['XS', 'S', 'M', 'L', 'XL', 'XXL', '3XL', '4XL', '5XL', '6XL'];
  const brands = [
    'Brand 1',
    'Brand 2',
    'Brand 3',
    'Brand 4',
    'Brand 5',
    'Brand 6',
    'Brand 7',
  ];
  const styles = [
    'Athletic',
    'Casual',
    'Formal',
    'Work',
    'Farming',
    'Outdoors',
    'Professional',
  ];
  const skins = ['Dry', 'Normal', 'Oily', 'Croc', 'Bear', 'Dog', 'Cat'];
  const colors = [
    'Red',
    'Green',
    'Blue',
    'Orange',
    'Purple',
    'Yellow',
    'Black',
  ];

  function handleSizeToggle(size) {
    if (selectedSizes.includes(size)) {
      setSelectedSizes(selectedSizes.filter((s) => s !== size));
    } else {
      setSelectedSizes([...selectedSizes, size]);
    }
  }

  function handleBrandToggle(brand) {
    if (selectedBrands.includes(brand)) {
      setSelectedBrands(selectedBrands.filter((b) => b !== brand));
    } else {
      setSelectedBrands([...selectedBrands, brand]);
    }
  }

  function handleStyleToggle(style) {
    if (selectedStyles.includes(style)) {
      setSelectedStyles(selectedStyles.filter((s) => s !== style));
    } else {
      setSelectedStyles([...selectedStyles, style]);
    }
  }

  function handleSkinToggle(skin) {
    if (selectedSkins.includes(skin)) {
      setSelectedSkins(selectedSkins.filter((s) => s !== skin));
    } else {
      setSelectedSkins([...selectedSkins, skin]);
    }
  }

  function handleColorToggle(color) {
    if (selectedColors.includes(color)) {
      setSelectedColors(selectedColors.filter((c) => c !== color));
    } else {
      setSelectedColors([...selectedColors, color]);
    }
  }

  function toggleShowSizes() {
    setShowSizes(!showSizes);
  }

  function toggleShowBrands() {
    setShowBrands(!showBrands);
  }

  function toggleShowStyles() {
    setShowStyles(!showStyles);
  }

  function toggleShowSkins() {
    setShowSkins(!showSkins);
  }

  function toggleShowColors() {
    setShowColors(!showColors);
  }

  //
  function toggleShowAllSizes() {
    setShowAllSizes(!showAllSizes);
  }

  function toggleShowAllBrands() {
    setShowAllBrands(!showAllBrands);
  }

  function toggleShowAllStyles() {
    setShowAllStyles(!showAllStyles);
  }

  function toggleShowAllSkins() {
    setShowAllSkins(!showAllSkins);
  }

  function toggleShowAllColors() {
    setShowAllColors(!showAllColors);
  }

  function handleFilter() {
    onFilter({
      sizes: selectedSizes,
      brands: selectedBrands,
      styles: selectedStyles,
      skins: selectedSkins,
      colors: selectedColors,
    });
  }

  function collapseSizes() {
    if (showAllSizes) {
      setShowAllSizes(!showAllSizes);
      setShowSizes(!showSizes);
    } else {
      toggleShowSizes();
    }
  }
  function collapseBrands() {
    if (showAllBrands) {
      setShowAllBrands(!showAllBrands);
      setShowBrands(!showBrands);
    } else {
      toggleShowBrands();
    }
  }
  function collapseStyles() {
    if (showAllStyles) {
      setShowAllStyles(!showAllStyles);
      setShowStyles(!showStyles);
    } else {
      toggleShowStyles();
    }
  }
  function collapseSkins() {
    if (showAllSkins) {
      setShowAllSkins(!showAllSkins);
      setShowSkins(!showSkins);
    } else {
      toggleShowSkins();
    }
  }
  function collapseColors() {
    if (showAllColors) {
      setShowAllColors(!showAllColors);
      setShowColors(!showColors);
    } else {
      toggleShowColors();
    }
  }

  return (
    <div class="ecommerce-filter">
      {/* <h2>Filter</h2> */}
      <div class={`ecommerce-filter-category ${showSizes ? 'open' : ''}`}>
        <h3 onClick={collapseSizes}>Size</h3>
        <div class="ecommerce-filter-options">
          {showSizes &&
            sizes.slice(0, 6).map((size) => (
              <div key={size}>
                <input
                  type="checkbox"
                  id={`size-${size}`}
                  checked={selectedSizes.includes(size)}
                  onChange={() => handleSizeToggle(size)}
                />
                <label htmlFor={`size-${size}`}>{size}</label>
              </div>
            ))}
          {showSizes && !showAllSizes && sizes.length > 6 && (
            <div class="viewAll" onClick={toggleShowAllSizes}>
              View all Sizes
            </div>
          )}
        </div>
        {showAllSizes &&
          sizes.slice(6).map((size) => (
            <div key={size}>
              <input
                type="checkbox"
                id={`size-${size}`}
                checked={selectedSizes.includes(size)}
                onChange={() => handleSizeToggle(size)}
              />
              <label htmlFor={`size-${size}`}>{size}</label>
            </div>
          ))}
        {showAllSizes && (
          <div class="viewAll" onClick={toggleShowAllSizes}>
            Hide Sizes
          </div>
        )}
      </div>

      <div class={`ecommerce-filter-category ${showBrands ? 'open' : ''}`}>
        <h3 onClick={collapseBrands}>Brand</h3>
        <div class="ecommerce-filter-options">
          {showBrands &&
            brands.slice(0, 6).map((brand) => (
              <div key={brand}>
                <input
                  type="checkbox"
                  id={`brand-${brand}`}
                  checked={selectedBrands.includes(brand)}
                  onChange={() => handleBrandToggle(brand)}
                />
                <label htmlFor={`brand-${brand}`}>{brand}</label>
              </div>
            ))}

          {showBrands && !showAllBrands && brands.length > 6 && (
            <div class="viewAll" onClick={toggleShowAllBrands}>
              View all Brands
            </div>
          )}
        </div>
        {showAllBrands &&
          brands.slice(6).map((brand) => (
            <div key={brand}>
              <input
                type="checkbox"
                id={`brand-${brand}`}
                checked={selectedBrands.includes(brand)}
                onChange={() => handleBrandToggle(brand)}
              />
              <label htmlFor={`brand-${brand}`}>{brand}</label>
            </div>
          ))}
        {showAllBrands && (
          <div class="viewAll" onClick={toggleShowAllBrands}>
            Hide Brands
          </div>
        )}
      </div>
      <div class={`ecommerce-filter-category ${showStyles ? 'open' : ''}`}>
        <h3 onClick={collapseStyles}>Style</h3>
        <div class="ecommerce-filter-options">
          {showStyles &&
            styles.slice(0, 6).map((style) => (
              <div key={style}>
                <input
                  type="checkbox"
                  id={`style-${style}`}
                  checked={selectedStyles.includes(style)}
                  onChange={() => handleBrandToggle(style)}
                />
                <label htmlFor={`style-${style}`}>{style}</label>
              </div>
            ))}
          {showStyles && !showAllStyles && styles.length > 6 && (
            <div class="viewAll" onClick={toggleShowAllStyles}>
              View all Styles
            </div>
          )}
        </div>
        {showAllStyles &&
          styles.slice(6).map((style) => (
            <div key={style}>
              <input
                type="checkbox"
                id={`style-${style}`}
                checked={selectedStyles.includes(style)}
                onChange={() => handleStyleToggle(style)}
              />
              <label htmlFor={`style-${style}`}>{style}</label>
            </div>
          ))}
        {showAllStyles && (
          <div class="viewAll" onClick={toggleShowAllStyles}>
            Hide Styles
          </div>
        )}
      </div>
      <div class={`ecommerce-filter-category ${showSkins ? 'open' : ''}`}>
        <h3 onClick={collapseSkins}>Skin</h3>
        <div class="ecommerce-filter-options">
          {showSkins &&
            skins.slice(0, 6).map((skin) => (
              <div key={skin}>
                <input
                  type="checkbox"
                  id={`skin-${skin}`}
                  checked={selectedSkins.includes(skin)}
                  onChange={() => handleSkinToggle(skin)}
                />
                <label htmlFor={`skin-${skin}`}>{skin}</label>
              </div>
            ))}
          {showSkins && !showAllSkins && skins.length > 6 && (
            <div class="viewAll" onClick={toggleShowAllSkins}>
              View all Skins
            </div>
          )}
        </div>
        {showAllSkins &&
          skins.slice(6).map((skin) => (
            <div key={skin}>
              <input
                type="checkbox"
                id={`skin-${skin}`}
                checked={selectedSkins.includes(skin)}
                onChange={() => handleSkinToggle(skin)}
              />
              <label htmlFor={`skin-${skin}`}>{skin}</label>
            </div>
          ))}
        {showAllSkins && (
          <div class="viewAll" onClick={toggleShowAllSkins}>
            Hide Skins
          </div>
        )}
      </div>
      <div class={`ecommerce-filter-category ${showColors ? 'open' : ''}`}>
        <h3 onClick={collapseColors}>Color</h3>
        <div class="ecommerce-filter-options">
          {showColors &&
            colors.slice(0, 6).map((color) => (
              <div key={color}>
                <input
                  type="checkbox"
                  id={`color-${color}`}
                  checked={selectedColors.includes(color)}
                  onChange={() => handleColorToggle(color)}
                />
                <label htmlFor={`color-${color}`}>{color}</label>
              </div>
            ))}
          {showColors && !showAllColors && colors.length > 6 && (
            <div class="viewAll" onClick={toggleShowAllColors}>
              View all Colors
            </div>
          )}
        </div>
        {showAllColors &&
          colors.slice(6).map((color) => (
            <div key={color}>
              <input
                type="checkbox"
                id={`color-${color}`}
                checked={selectedColors.includes(color)}
                onChange={() => handleColorToggle(color)}
              />
              <label htmlFor={`color-${color}`}>{color}</label>
            </div>
          ))}
        {showAllColors && (
          <div class="viewAll" onClick={toggleShowAllColors}>
            Hide Colors
          </div>
        )}
      </div>
      <button onClick={handleFilter}>Apply Filter</button>
    </div>
  );
};
