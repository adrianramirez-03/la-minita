import Layout from '../../../components/Layout';
import { ProductDetails } from '../../../components/Products/ProductDetails';
import { ProductPage } from '../../../components/Products/ProductPage';
import { ProductSlider } from '../../../components/Products/ProductSlider';
import { client } from '../../../lib/client';
import styles from '../../../styles/productpage.module.css';

const Post = ({ product, menProducts }) => {
  //removing the selected product from the rest to display every other belt except the one we are already on
  let otherMenProducts = menProducts.filter(function (el) {
    return el.slug.current != product.slug.current;
  });

  return (
    <>
      <Layout title={'Boots'}>
        <ProductPage
          otherMenProducts={otherMenProducts}
          mainCategory="men"
          product={product}
          width={500}
          height={500}
        />
        <div className={styles.sliderDetailsContainer}>
          <div className={styles.productSliderComponent}>
            <ProductSlider
              otherMenProducts={otherMenProducts}
              height={150}
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
  const productQuery = `*[_type == "menPant" && slug.current == '${slug}'][0]`;
  const product = await client.fetch(productQuery);

  const otherProductsQuery = '*[_type == "menPant"]';
  const menProducts = await client.fetch(otherProductsQuery);

  return {
    props: { product, menProducts },
  };
};

export default Post;
