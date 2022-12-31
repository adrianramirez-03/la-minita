import React from 'react';
import { Product, FooterBanner, HeroBanner, Layout } from '../components';
import { Categories } from '../components/Homepage/Categories';
import { client } from '../lib/client';

const Home = ({ products, bannerData, menProducts }) => {
  return (
    <>
      <Layout title="Home">
        <HeroBanner
          heroBanner={bannerData.length && bannerData[1]}
        ></HeroBanner>
        <Categories></Categories>
        {/* <div className="products-container">
          {products?.map((product) => (
            <Product key={product._id} product={product} />
          ))}
        </div> */}
      </Layout>
    </>
  );
};

//grabbing data from sanity client using getserversideprops
export const getServerSideProps = async () => {
  const query = '*[_type == "product"]';
  const products = await client.fetch(query);

  const menQuery = '*[_type == "men"]';
  const menProducts = await client.fetch(menQuery);

  const bannerQuery = '*[_type == "banner"]';
  const bannerData = await client.fetch(bannerQuery);

  return {
    props: { products, bannerData, menProducts },
  };
};

export default Home;

// <>
//       <HeroBanner heroBanner={bannerData.length && bannerData[1]} />
//       <div className="products-heading">
//         <h2>Best Selling Products</h2>
//         <p>Cowboy wear for many styles</p>
//       </div>
{
  /* <div className="products-container">
  {products?.map((product) => (
    <Product key={product._id} product={product} />
  ))}
</div>; */
}
//       <div className="products-container">
//         {menProducts?.map((menProducts) => (
//           <Product key={menProducts._id} product={menProducts} />
//         ))}
//       </div>
//       <FooterBanner footerBanner={bannerData && bannerData[0]} />
//     </>
