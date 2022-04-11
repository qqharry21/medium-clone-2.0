/** @format */

import type { GetServerSideProps, NextPage } from 'next';
import Layout from '../components/Layout';

import Image from 'next/image';
import { sanityClient, urlFor } from '../sanity';
import { Post } from '../type';
import Link from 'next/link';

interface Props {
  posts: Post[];
}

const Home = ({ posts }: Props) => {
  return (
    <Layout title='Home' className='max-w-5xl mx-auto'>
      <div className='flex justify-between items-center bg-yellow-400 border-y border-black py-10 lg:py-0'>
        <div className='px-10 space-y-5'>
          <h1 className='text-6xl max-w-xl'>
            <span className='underline decoration-black decoration-4 underline-offset-1'>
              Medium
            </span>{' '}
            is a place to write, read and connect
          </h1>
          <h2 className=''>
            It&apos;s easy and free to post your thinking on any topic and connect with millions of
            readers.
          </h2>
        </div>
        <div className='p-10'>
          <div className='relative hidden md:inline-flex h-32 lg:h-56 w-40 lg:w-72 '>
            <Image src='/medium.png' alt='medium' layout='fill' objectFit='cover' />
          </div>
        </div>
      </div>

      {/* Posts */}
      <div className='grid gap-3 md:gap-6 lg:grid-cols-3 sm:grid-cols-2 p-2 md:p-6'>
        {/* Post */}
        {posts.map(post => (
          <Link href={`/post/${post.slug.current}`} key={post._id}>
            <div className='flex flex-col border-[1px] border-gray-400 rounded-lg duration-200 transition-all hover:shadow-md hover:scale-105'>
              <div className=''>
                <div className='relative w-full h-60 overflow-hidden'>
                  <Image
                    src={urlFor(post.mainImage).url()}
                    alt='image'
                    layout='fill'
                    objectFit='cover'
                  />
                </div>
              </div>
              <div className='flex justify-between items-center p-5'>
                <div className='flex flex-col'>
                  <h3 className='text-xl font-extrabold tracking-wider'>{post.title}</h3>
                  <h4 className='text-base font-extralight'>{post.description}</h4>
                </div>
                <div className='relative rounded-full w-12 h-12'>
                  <Image
                    src={urlFor(post.author.image).url()}
                    alt='author'
                    layout='fill'
                    objectFit='cover'
                    className='rounded-full'
                  />
                </div>
              </div>
            </div>
          </Link>
        ))}
      </div>
    </Layout>
  );
};

export default Home;

export const getServerSideProps: GetServerSideProps = async () => {
  const query = `*[_type == "post"] {
  _id,
  title,
  description,
  slug,
  author->{
    name,
    image,
    bio
  },
  mainImage {
    asset
  },
  categories,
  publishedAt,
  body
}`;

  const posts = await sanityClient.fetch(query);
  return {
    props: { posts },
  };
};
