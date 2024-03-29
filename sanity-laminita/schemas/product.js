export default {
  name: 'product',
  title: 'Product',
  type: 'document',
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
      name: 'savings',
      title: 'Savings Text',
      type: 'string',
    },
    {
      name: 'savingsAmount',
      title: 'Savings Amount',
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
    {
      name: 'color',
      title: 'Color',
      type: 'colorPicker',
    },
    {
      title: 'Post Date',
      name: 'postDate',
      type: 'datetime',
      options: {
        timeStep: 1,
        dateFormat: 'YYYY-MM-DD',
      },
    },
  ],
  orderings: [
    {
      title: 'Post Date',
      name: 'postDateDesc',
      by: [{ field: 'postDate', direction: 'desc' }],
    },
  ],
};
