/** @format */

import Link from 'next/link';
import React from 'react';
import { BsMedium } from 'react-icons/bs';

const Header = () => {
  return (
    <header className='flex justify-between max-w-5xl p-5 mx-auto items-center'>
      <div className='flex items-center space-x-5'>
        <Link href='/'>
          <a className='flex justify-center items-center'>
            <BsMedium size={50} />
            <h1 className='text-4xl ml-2 font-extrabold'>Medium</h1>
          </a>
        </Link>
        <div className='hidden md:inline-flex space-x-6 justify-center items-center'>
          <h3 className=''>About</h3>
          <h3 className=''>Contact</h3>
          <h3 className='text-white bg-green-600 px-4 py-1 rounded-full'>Follow</h3>
        </div>
      </div>
      <div className='hidden sm:flex items-center space-x-5 text-green-600'>
        <h3 className=''>Sign In</h3>
        <h3 className='border px-4 py-1 rounded-full border-green-600'>Get Started</h3>
      </div>
    </header>
  );
};

export default Header;
