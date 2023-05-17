import { generateRandomSlug } from '../slug-utils';

export default {
  name: 'menHat',
  title: 'Men Hats',
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
      name: 'itemCategory',
      title: 'Item Category',
      type: 'string',
    },
    {
      name: 'sizes',
      title: 'Sizes',
      type: 'array',
      of: [{ type: 'number' }],
    },
    {
      name: 'slug',
      title: 'Slug',
      type: 'slug',
      options: {
        source: generateRandomSlug,
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
      name: 'description',
      title: 'Description Bullet Points',
      type: 'array',
      of: [{ type: 'string' }],
    },
    {
      name: 'quantity',
      title: 'Quantitiy',
      type: 'number',
    },
    {
      name: 'color',
      title: 'Color',
      type: 'string',
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
