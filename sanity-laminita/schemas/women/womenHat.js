import { generateRandomSlug } from '../slug-utils';

export default {
  name: 'womenHat',
  title: 'Women Hats',
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
      name: 'description',
      title: 'Description Bullet Points',
      type: 'array',
      of: [{ type: 'string' }],
    },
    {
      name: 'quantity',
      title: 'Quantity',
      type: 'number',
    },
    {
      name: 'color',
      title: 'Color',
      type: 'string',
    },
    {
      name: 'dateCreated',
      title: 'Date Created',
      type: 'datetime',
    },
  ],
};
