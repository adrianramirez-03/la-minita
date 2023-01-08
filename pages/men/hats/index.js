import React from 'react';
import { Layout } from '../../../components';
import { Filter } from '../../../components/Filters/Filter';
import { client } from '../../../lib/client';
import MensHeader from '../../../components/MensHeader';
import { Categories } from '../../../components/Filters/Categories';

const mens = ({ menProducts }) => {
  return (
    <>
      <Layout title="Men's Hats">
        <Categories />
        <Filter
          mainCategory="men"
          category="men's hats"
          products={menProducts}
        ></Filter>
      </Layout>
    </>
  );
};

export const getServerSideProps = async () => {
  const menQuery = '*[_type == "menHat"]';
  const menProducts = await client.fetch(menQuery);

  return {
    props: { menProducts },
  };
};

export default mens;
