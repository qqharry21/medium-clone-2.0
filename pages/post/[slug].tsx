/** @format */

import { GetStaticPaths, GetStaticProps } from 'next';
import Image from 'next/image';
import Link from 'next/link';
import React from 'react';
import PortableText from 'react-portable-text';
import Layout from '../../components/Layout';
import { sanityClient, urlFor } from '../../sanity';
import { Post } from '../../type';
import { useForm, SubmitHandler } from 'react-hook-form';
import toast, { Toaster } from 'react-hot-toast';

interface IFormInput {
  _id: string;
  name: string;
  email: string;
  comment: string;
}

interface Props {
  post: Post;
}

const PostPage = ({ post }: Props) => {
  const {
    register,
    handleSubmit,
    clearErrors,
    reset,
    formState: { errors },
  } = useForm<IFormInput>();

  const onSubmit: SubmitHandler<IFormInput> = async data => {
    await fetch('/api/createComment', {
      method: 'POST',
      body: JSON.stringify(data),
    })
      .then(res => {
        if (res.status === 200) {
          toast.success('Thank for your comment!!', {
            duration: 5000,
          });
          clearErrors();
          reset();
        } else throw Error('Something went wrong!!');
      })
      .catch(err => {
        toast.error(err.message, { duration: 3000 });
      });
  };

  return (
    <Layout title='id'>
      {/* Main Image */}
      <div className='relative w-full h-40 '>
        <Image src={urlFor(post.mainImage).url()} layout='fill' objectFit='cover' alt='mainImage' />
      </div>
      {/* Content */}
      <article className='flex flex-col max-w-3xl mx-auto p-5'>
        <h1 className='text-3xl mt-10 mb-3'>{post.title}</h1>
        <h2 className='text-xl font-light text-gray-500 mb-2'>{post.description}</h2>
        <div className='flex items-center space-x-2'>
          <div className='relative rounded-full w-12 h-12'>
            <Image
              src={urlFor(post.author.image).url()}
              alt='author'
              layout='fill'
              objectFit='cover'
              className='rounded-full'
            />
          </div>
          <p className='font-extralight text-sm'>
            Blog post by <span className='text-green-600'>{post.author.name}</span> - Published at{' '}
            <span className='font-Poppins text-green-600'>
              {new Date(post.publishedAt).toLocaleString('en-US')}
            </span>
          </p>
        </div>
        <div className=''>
          <PortableText
            className=''
            dataset={process.env.NEXT_PUBLIC_SANITY_DATASET}
            projectId={process.env.NEXT_PUBLIC_SANITY_PROJECT_ID}
            content={post.body}
            serializers={{
              h1: (props: any) => <h1 className='text-2xl font-bold my-5' {...props} />,
              h2: (props: any) => <h1 className='text-xl font-bold my-5' {...props} />,
              li: ({ children }: any) => <li className='ml-4 list-disc'>{children}</li>,
              link: ({ href, children }: any) => (
                <Link href={href}>
                  <a className='text-blue-500 hover:underline'>{children}</a>
                </Link>
              ),
            }}
          />
        </div>
      </article>

      <hr className='max-w-[14rem] md:max-w-md lg:max-w-lg my-5 mx-auto border border-yellow-500' />

      {/* Comment Form */}
      <form
        action=''
        className='flex flex-col p-5 max-w-2xl mx-auto mb-10'
        onSubmit={handleSubmit(onSubmit)}>
        <h3 className='text-md text-yellow-500'>Enjoyed this article</h3>
        <h4 className='text-3xl font-bold capitalize'>Leave a comment below</h4>
        <hr className='py-3 mt-2' />
        <input type='hidden' {...register('_id')} name='_id' value={post._id} />
        <label htmlFor='name' className='block mb-5'>
          <span className='text-gray-700'>Name</span>
          <input
            type='text'
            className='shadow rounded py-2 px-3 mt-1 block w-full border ring-yellow-500 outline-none focus:ring'
            placeholder='Your name'
            {...register('name', { required: 'Name is required' })}
          />
          {errors?.name && <span className='text-red-500'>{errors.name.message}</span>}
        </label>
        <label htmlFor='email' className='block mb-5'>
          <span className='text-gray-700'>Email</span>
          <input
            type='email'
            className='shadow rounded py-2 px-3 mt-1 block w-full border ring-yellow-500 outline-none focus:ring'
            placeholder='Your email'
            {...register('email', { required: 'Email is required' })}
          />
          {errors?.email && <span className='text-red-500'>{errors.email.message}</span>}
        </label>
        <label htmlFor='comment' className='block mb-5'>
          <span className='text-gray-700'>Comment</span>
          <textarea
            className='shadow rounded py-2 px-3 mt-1 block w-full border ring-yellow-500 outline-none focus:ring'
            placeholder='Leave some comments...'
            rows={8}
            {...register('comment', { required: 'Comment is required' })}
          />
          {errors?.comment && <span className='text-red-500'>{errors.comment.message}</span>}
        </label>
        <button
          className='w-full rounded-md bg-yellow-500 text-white p-2'
          type='submit'
          onClick={() =>
            setTimeout(() => {
              clearErrors();
            }, 10000)
          }>
          Submit
        </button>
        {/* errors will return when field validation fails */}
        <Toaster position='top-center' />
      </form>

      {/* Comments */}
      <div className='flex flex-col p-10 my-10 max-w-2xl mx-auto shadow-yellow-500 shadow space-y-2'>
        <div className='flex justify-between items-end'>
          <h3 className='text-4xl'>Comments</h3>
          <p className='md:flex text-gray-500 hidden'>
            Total Comments: <span className='font-Poppins ml-1'>{post.comments.length}</span>
          </p>
        </div>
        <hr className='mb-2 border-yellow-300 border' />
        {post?.comments.map((comment: any) => (
          <div className='' key={comment._id}>
            <p className=''>
              <span className='text-yellow-500 mr-1'>{comment.name}:</span>
              <span className='font-Poppins'>{comment.comment}</span>
            </p>
          </div>
        ))}
      </div>
    </Layout>
  );
};

export default PostPage;

export const getStaticPaths: GetStaticPaths = async () => {
  const query = `*[_type == "post"] {
  _id,
  slug,
}`;

  const posts = await sanityClient.fetch(query);

  const paths = posts.map((post: Post) => ({
    params: {
      slug: post.slug.current,
    },
  }));

  return {
    paths,
    fallback: 'blocking',
  };
};

export const getStaticProps: GetStaticProps = async ({ params }) => {
  const query = `*[_type == "post" && slug.current == $slug][0] {
  _id,
  title,
  description,
  slug,
  author->{
    name,
    image,
    bio
  },
  'comments': *[
    _type == "comment" &&
    post._ref == ^._id &&
    approved == true],
  mainImage {
    asset
  },
  categories,
  publishedAt,
  body
}`;

  const post = await sanityClient.fetch(query, { slug: params?.slug });

  if (!post)
    return {
      notFound: true,
    };

  return {
    props: { post },
    revalidate: 60, //after 1 minute, it will update the old cache version
  };
};
