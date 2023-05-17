import React from 'react';
import { Layout } from '../components';
// import { LeftFilter } from '../components/Filters/LeftFilter';
import SearchComponent from '../components/Search/SearchComponent';
// import { client } from '../lib/client';

const search = () => {
  return (
    <Layout title="Search Results">
      <SearchComponent mainCategory="men" header="La Minita Western Wear" />
    </Layout>
  );
};

// export const getServerSideProps = async () => {
//   const menQuery = '*[_type == "menPant"]';
//   const menProducts = await client.fetch(menQuery);

//   return {
//     props: { menProducts },
//   };
// };

export default search;
