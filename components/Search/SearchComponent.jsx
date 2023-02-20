import React from 'react';
import { useState, useCallback, useEffect } from 'react';
import styles from '../../styles/filter.module.css';
import Product from '../Product';
import { LeftFilter } from '../Filters/LeftFilter';
import { useRouter } from 'next/router';
import axios from 'axios';
import { client } from '../../lib/client';

const SearchComponent = ({ mainCategory, header }) => {
  const [isShown, setIsShown] = useState(false);
  const [currentPage, setCurrentPage] = useState(1);
  const [products, setProducts] = useState([]);
  // const [state, setState] = useState({
  //   categories: [],
  //   products: [],
  //   error: '',
  // });
  const [totalDisplayed, setTotalDisplayed] = useState();

  const useMediaQuery = (width) => {
    const [targetReached, setTargetReached] = useState(false);

    const updateTarget = useCallback((e) => {
      if (e.matches) {
        setTargetReached(true);
      } else {
        setTargetReached(false);
      }
    }, []);

    useEffect(() => {
      const media = window.matchMedia(`(max-width: ${width}px)`);
      media.addEventListener('change', updateTarget);

      // Check on mount (callback is not called until a change occurs)
      if (media.matches) {
        setTargetReached(true);
      }

      return () => media.removeEventListener('change', updateTarget);
    }, []);

    return targetReached;
  };
  const isBreakpoint = useMediaQuery(750);

  const widthMap = new Map();
  const heightMap = new Map();
  products.forEach((product) => {
    if (product.itemCategory == 'pants') {
      widthMap[product.itemCategory] = 275;
      heightMap[product.itemCategory] = 300;
    } else if (product.itemCategory == 'shirts') {
      widthMap[product.itemCategory] = 275;
      heightMap[product.itemCategory] = 300;
    } else if (product.itemCategory == 'boots') {
      widthMap[product.itemCategory] = 275;
      heightMap[product.itemCategory] = 300;
    } else if (product.itemCategory == 'belts') {
      widthMap[product.itemCategory] = 300;
      heightMap[product.itemCategory] = 200;
    } else {
      widthMap[product.itemCategory] = 300;
      heightMap[product.itemCategory] = 230;
    }
  });

  function handleFilter(selectedOptions) {
    // Here, you can use the selectedOptions object to filter the products based on the selections made by the user.
    // console.log(selectedOptions);
  }

  const displayFilter = () => {
    setIsShown(!isShown);
  };

  //used to keep track of the 'load more' button

  const router = useRouter();
  const {
    // size = 'all',
    brand = 'all',
    query = 'all',
    // style = 'all',
    // skin = 'all',
    // color = 'default',
  } = router.query;

  useEffect(() => {
    const fetchData = async () => {
      try {
        if (query) {
          let gQuery = `*[_type in ["menPant", "menBelt", "menShirt", "menBoot", "menHat"] && name match "${query}*"]`;
          const products = await client.fetch(gQuery);
          setProducts(products);
          setTotalDisplayed(products.length < 9 ? products.length : 9);
        } else {
          let gQuery = `*[_type in ["menPant", "menBelt", "menShirt", "menBoot", "menHat"]]`;
          const products = await client.fetch(gQuery);
          setProducts(products);
        }
      } catch (err) {
        console.error(err);
      }
    };
    fetchData();
  }, [query]);

  // const [totalDisplayed, setTotalDisplayed] = useState(
  //   products.length < 9 ? products.length : 9
  // );
  function handleNextPage() {
    setCurrentPage(currentPage + 1);
    setTotalDisplayed(Math.min(totalDisplayed + 9, products.length));
  }

  // const filterSearch = ({ category }) => {
  //   const path = router.pathname;
  //   const { query } = router;
  //   if (searchQuery) query.searchQuery = searchQuery;
  //   if (category) query.category = category;

  //   router.push({ pathname: path, query: query });
  // };
  // console.log(products);

  return (
    <>
      {isBreakpoint ? (
        <div className={styles.hiddenFilterContainer}>
          {!isShown ? (
            <button
              onClick={displayFilter}
              className={styles.filterButtonHidden}
            >
              Show Filter
            </button>
          ) : (
            <button
              onClick={displayFilter}
              className={styles.filterButtonShown}
            >
              Hide Filter
            </button>
          )}

          {isShown && <LeftFilter onFilter={handleFilter} />}
          <div className={styles.smallContainer}>
            {products?.map((product) => (
              <Product
                mainCategory={mainCategory}
                key={product._id}
                product={product}
                productWidth={widthMap[product.itemCategory]}
                productHeight={heightMap[product.itemCategory]}
              />
            ))}
          </div>
        </div>
      ) : (
        <div className={styles.container}>
          <div className={styles.left}>
            {query.toUpperCase()}
            <LeftFilter onFilter={handleFilter} />
          </div>
          <div className={styles.right}>
            <div className="products-container">
              {products.slice(0, currentPage * 9).map((product) => (
                <Product
                  mainCategory={mainCategory}
                  key={product._id}
                  product={product}
                  productWidth={widthMap[product.itemCategory]}
                  productHeight={heightMap[product.itemCategory]}
                />
              ))}
            </div>
            {products.length > 0 && (
              <div class="button-container">
                <div class="product-number">
                  Showing {totalDisplayed} of {products.length} products
                </div>
                <div>
                  {currentPage * 9 < products.length && (
                    <button id="filter-button-15" onClick={handleNextPage}>
                      Load more products
                    </button>
                  )}
                </div>
              </div>
            )}
          </div>
        </div>
      )}
    </>
  );
};

export default SearchComponent;
