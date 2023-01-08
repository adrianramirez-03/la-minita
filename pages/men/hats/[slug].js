import { useRouter } from 'next/router';
import Layout from '../../../components/Layout';

const Post = () => {
  const router = useRouter();
  const { slug } = router.query;

  return (
    <>
      <Layout title={`${slug}`} />
      <div>Post: {slug}</div>
    </>
  );
};

export default Post;
