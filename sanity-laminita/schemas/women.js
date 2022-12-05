export default {
  name: 'women',
  title: 'Women Products',
  type: 'document',
  groups: [
    {
      name: 'hats',
      title: 'Hats',
    },
    {
      name: 'belts',
      title: 'Belts',
    },
    {
      name: 'boots',
      title: 'Boots',
    },
    {
      name: 'shirts',
      title: 'Shirts',
    },
  ],
  fields: [
    {
      name: 'image',
      title: 'Image',
      type: 'array',
      of: [{ type: 'image' }],
      options: {
        hotspot: true,
      },
    },
    {
      name: 'name',
      title: 'Name',
      type: 'string',
    },
    {
      name: 'slug',
      title: 'Slug',
      type: 'slug',
      options: {
        source: 'name',
        maxLength: 90,
      },
    },
    {
      name: 'price',
      title: 'Price',
      type: 'number',
    },
    {
      name: 'details',
      title: 'Details',
      type: 'string',
    },
    {
      name: 'quantity',
      title: 'Quantitiy',
      type: 'number',
    },
  ],
};
