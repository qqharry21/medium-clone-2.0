/** @format */

import '../styles/globals.css';
import type { AppProps } from 'next/app';
import { Header, Meta } from '../components';

function MyApp({ Component, pageProps }: AppProps) {
  return (
    <>
      <Meta />
      <Header />
      <Component {...pageProps} />
    </>
  );
}

export default MyApp;
