import nc from 'next-connect';

const handler = nc();

handler.get(async (req, res) => {
  const categories = [
    'pant',
    'belt',
    'shirt',
    'boot',
    'hat',
    'pants',
    'belts',
    'shirts',
    'boots',
    'hats',
  ];
  res.send(categories);
});

export default handler;
