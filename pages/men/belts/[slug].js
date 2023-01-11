import Layout from '../../../components/Layout';
import { ProductDetails } from '../../../components/Products/ProductDetails';
import { ProductPage } from '../../../components/Products/ProductPage';
import { ProductSlider } from '../../../components/Products/ProductSlider';
import { client } from '../../../lib/client';
import styles from '../../../styles/productpage.module.css';

const Post = ({ product, menBelts }) => {
  //removing the selected product from the rest to display every other belt except the one we are already on
  let otherMenBelts = menBelts.filter(function (el) {
    return el.slug.current != product.slug.current;
  });

  return (
    <>
      <Layout title={'Boots'}>
        <ProductPage
          otherMenProducts={otherMenBelts}
          mainCategory="men"
          product={product}
          width={500}
          height={350}
        />
        <div className={styles.sliderDetailsContainer}>
          <div className={styles.productSliderComponent}>
            <ProductSlider
              otherMenProducts={otherMenBelts}
              height={100}
              width={150}
            />
          </div>
          <div className={styles.productDetailsComponent}>
            <ProductDetails details={product.description} />
          </div>
        </div>
      </Layout>
    </>
  );
};

export const getStaticPaths = async () => {
  return {
    paths: [],
    fallback: 'blocking',
  };
};

export const getStaticProps = async ({ params: { slug } }) => {
  const query = `*[_type == "menBelt" && slug.current == '${slug}'][0]`;
  const product = await client.fetch(query);

  const beltQuery = '*[_type == "menBelt"]';
  const menBelts = await client.fetch(beltQuery);

  return {
    props: { product, menBelts },
  };
};

export default Post;
