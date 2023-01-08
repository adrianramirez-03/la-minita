import React from 'react';
import { Layout } from '../../../components';
import { Filter } from '../../../components/Filters/Filter';
import { client } from '../../../lib/client';
import MensHeader from '../../../components/MensHeader';
import { Categories } from '../../../components/Filters/Categories';

const mens = ({ menProducts }) => {
  return (
    <>
      <Layout title="Men's Pants">
        <Categories />
        <Filter
          mainCategory="men"
          category="mens pants"
          products={menProducts}
        ></Filter>
      </Layout>
    </>
  );
};

export const getServerSideProps = async () => {
  const menQuery = '*[_type == "menPant"]';
  const menProducts = await client.fetch(menQuery);

  return {
    props: { menProducts },
  };
};

export default mens;
