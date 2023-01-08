import Layout from '../../../components/Layout';
import { ProductPage } from '../../../components/Products/ProductPage';
import { client, urlFor } from '../../../lib/client';

const Post = ({ product, menBelts }) => {
  return (
    <>
      <Layout title={'Boots'}>
        <ProductPage mainCategory="men" product={product} menBelts={menBelts} />
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
