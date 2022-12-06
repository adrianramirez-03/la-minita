import React from 'react';
import { Layout } from '../../../components';
import { Filter } from '../../../components/Filters/Filter';
import { client } from '../../../lib/client';
import MensHeader from '../../../components/MensHeader';

const mens = ({ menProducts }) => {
  return (
    <>
      <Layout title="Men Pants">
        <MensHeader></MensHeader>
        <Filter
          mainCategory="men"
          category="pants"
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
