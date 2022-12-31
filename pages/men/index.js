import React from 'react';
import { Layout } from '../../components';
import { Filter } from '../../components/Filters/Filter';
import { client } from '../../lib/client';
import MensHeader from '../../components/MensHeader';
import { Categories } from '../../components/Filters/Categories';

const mens = ({ menProducts }) => {
  // function shuffle(array) {
  //   let currentIndex = array.length,
  //     randomIndex;

  //   // While there remain elements to shuffle.
  //   while (currentIndex != 0) {
  //     // Pick a remaining element.
  //     randomIndex = Math.floor(Math.random() * currentIndex);
  //     currentIndex--;

  //     // And swap it with the current element.
  //     [array[currentIndex], array[randomIndex]] = [
  //       array[randomIndex],
  //       array[currentIndex],
  //     ];
  //   }

  //   return array;
  // }

  // const shuffledMenProducts = shuffle(menProducts);

  return (
    <>
      <Layout title="Men">
        <Categories />
        <Filter
          mainCategory="men"
          category="All Men"
          products={menProducts}
        ></Filter>
      </Layout>
    </>
  );
};

export const getServerSideProps = async () => {
  const menQuery =
    '*[_type in ["menPant", "menBelt", "menShirt", "menBoot", "menHat"]]';
  const menProducts = await client.fetch(menQuery);

  return {
    props: { menProducts },
  };
};

export default mens;
