import React from 'react';
import { Layout } from '../../../components';
import { Filter } from '../../../components/Filters/Filter';
import { client } from '../../../lib/client';

import { Categories } from '../../../components/Filters/Categories';

const mens = ({ menProducts }) => {
  return (
    <>
      <Layout title="Men Belts">
        <Categories />
        <Filter
          mainCategory="men"
          category="Men's belts"
          products={menProducts}
        ></Filter>
      </Layout>
    </>
  );
};

export const getServerSideProps = async () => {
  const menQuery = '*[_type == "menBelt"]';
  const menProducts = await client.fetch(menQuery);

  return {
    props: { menProducts },
  };
};

export default mens;
