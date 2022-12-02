import React from 'react';
import { Layout } from '../components';
import { Filter } from '../components/Filters/Filter';
import { client } from '../lib/client';
import MensHeader from '../components/MensHeader';

const mens = ({ products, menProducts }) => {
  return (
    <>
      <Layout title="Men">
        <MensHeader></MensHeader>
        <Filter category="men" products={products}></Filter>
      </Layout>
    </>
  );
};

export const getServerSideProps = async () => {
  const query = '*[_type == "product"]';
  const products = await client.fetch(query);

  const menQuery = '*[_type == "men"]';
  const menProducts = await client.fetch(menQuery);

  return {
    props: { products, menProducts },
  };
};

export default mens;
