/** @format */

import { DefaultSeo } from 'next-seo';
import Head from 'next/head';
import { url } from '../utils/url';

const Meta = ({ title, keywords, description }) => {
  return (
    <>
      <Head>
        <meta name='keywords' content={keywords} />
        {/* Medium icons created by Pixel perfect - Flaticon */}
        <link rel='icon' href='/medium.png' />
      </Head>
      <DefaultSeo
        defaultTitle={title}
        titleTemplate='%s | Medium'
        openGraph={{
          type: 'website',
          locale: 'zh_TW',
          url: url,
          description: description,
          site_name: title,
          images: [],
        }}
        canonical={url}
      />
    </>
  );
};

Meta.defaultProps = {
  title: 'Hao | Medium',
  keywords: 'web development, programming, web design, react js, tailwindcss, next js, clone',
  description: "Medium's web development blog",
};

export default Meta;
