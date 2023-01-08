import { useRouter } from 'next/router';
import Layout from '../../../components/Layout';
import { ProductPage } from '../../../components/Products/ProductPage';

const Post = () => {
  const router = useRouter();
  const { slug } = router.query;

  return (
    <>
      <Layout title={`${slug}`}>
        <ProductPage />
      </Layout>
    </>
  );
};

export default Post;
