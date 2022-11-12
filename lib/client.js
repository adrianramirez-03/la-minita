import sanityClient from '@sanity/client';
import imageUrlBuilder from '@sanity/image-url';

//connecting to our Sanity backend using Sanity's manager online and grabbing all necessary information
export const client = sanityClient({
  projectId: 'pxqunmgm',
  dataset: 'production',
  apiVersion: '2022-10-16',
  useCdn: true,
  token: process.env.NEXT_PUBLIC_SANITY_TOKEN, //created .env file to store our token for security purposes
});

const builder = imageUrlBuilder(client);

export const urlFor = (source) => builder.image(source);
