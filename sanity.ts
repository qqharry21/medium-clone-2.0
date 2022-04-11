/** @format */

import { createClient, createCurrentUserHook } from 'next-sanity';
import createImageUrlBuilder from '@sanity/image-url';
import { SanityImageSource } from '@sanity/image-url/lib/types/types';

export const config = {
  dataset: process.env.NEXT_PUBLIC_SANITY_DATASET || 'production',
  projectId: process.env.NEXT_PUBLIC_SANITY_PROJECT_ID || 'production',
  useCdn: process.env.NODE_ENV === 'production',
  apiVersion: '2022-04-09',
};

export const sanityClient = createClient(config);

/**
 * Set up a helper function to generate image URLs with only the asset reference data in your documents.
 * Read more: https://www.sanity.io/docs/image-url
 */

export const urlFor = (source: SanityImageSource) => createImageUrlBuilder(config).image(source);

export const useCurrentUser = createCurrentUserHook(config);
