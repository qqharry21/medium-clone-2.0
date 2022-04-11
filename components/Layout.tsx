/** @format */

import { NextSeo } from 'next-seo';
import React from 'react';

interface Props {
  title: string;
  description?: string;
  children: React.ReactNode;
  className?: string;
}

const Layout = ({ children, title, description, className }: Props) => {
  return (
    <>
      <NextSeo title={title} description={description} openGraph={{ title, description }} />
      <main className={className}>{children}</main>
    </>
  );
};

export default Layout;
