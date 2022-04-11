/**
 * @format
 * @type {import('next').NextConfig}
 */

const nextConfig = {
  reactStrictMode: true,
  images: {
    domains: ['cdn.sanity.io'],
  },
  env: {
    SANITY_API_TOKEN:
      'skjZGeitX0ZPjmZwgwFjKOx7ENDfqF8ukqCV92RJfMSEGildWcDrnQVlP2v2Wlv41jWnChpsHThgBidNLXViXdwc6YX2qjuNEjbOWjZZAGvxXo3zTY14M8kENeQqRlK9zUELFCpDMDHBzPfyRySCKjX4py8SznvP9nEWRU52Zmz0s2LXwCwA',
  },
};

module.exports = nextConfig;
