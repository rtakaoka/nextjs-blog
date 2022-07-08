import Head from 'next/head'
import Link from 'next/link'

import Layout, { siteTitle } from '../components/layout'

import Date from '../components/date'
import Image from 'next/image'
import { Envelope, GithubLogo, LinkedinLogo } from 'phosphor-react'
import PostsList from '../components/PostsList'
import client from '../apollo-client'
import { gql } from '@apollo/client'

export const GET_POSTS = gql`
  query GetPosts {
    posts(orderBy: publishedAt_DESC, stage: PUBLISHED) {
      id
      slug
      title
      publishedAt
      createdAt
      locale
    }
  }
`;

interface PostsData {
  posts: {
    id: string;
    slug: string;
    title: string;
    publishedAt: Date;
    createdAt: Date;
    locale: string;
  }
}

export async function getStaticProps() {

  const { data } = await client.query<PostsData>({
    query: GET_POSTS,
  });

  return {
    props: {
      posts: data.posts,
    },
    revalidate: 10,
  }
}

export default function Home({ posts }) {
  console.log(posts);
  return (
    <Layout home>
      <Head>
        <title>{siteTitle}</title>
      </Head>

      <section className='md:flex gap-6 items-end'>
        <div className='md:flex-col'>
          <Image
            src='/images/profile.jpg'
            height={144}
            width={144}
            className='rounded-3xl'></Image>
        </div>

        <div className='my-6 md:flex-col'>
          <p className='max-w-[600px] text-2xl font-bold italic'>“I build websites and help business to establish their presence on the web.”</p>
        </div>

      </section>
      <h2 className='text-3xl font-bold my-6'>Blog</h2>


      <section className='md:flex gap-6 items-start'>

        <PostsList posts={posts} />

        <aside className='md:flex-1'>
          <div className='
            border
            border-gray-900
            dark:border-white
            rounded
            p-4
            min-h-[240px]
            overflow-hidden
            items-center
            md:min-h-0
            '
          >
            <h3 className='text-xl font-bold'>Rômulo Takaoka</h3>
            <p className='mt-4'>Sou um apaixonado por tecnologia que teve medo de programação por muito tempo. Desde 2021 decidi superar esse medo e programar minhas aplicações pra valer.</p>

            <div className='flex gap-4 mt-4'>

              <Link
                href="https://github.com/rtakaoka"
                target={'_blank'}
                aria-label='Perfil Github'
              >
                <a className='hover:text-blue-500 flex-col'>
                  <GithubLogo size={24} />
                </a>
              </Link>

              <Link
                href="https://linkedin.com/in/romulotakaoka"
                aria-label='Perfil LinkedIn'
                target={'_blank'}>
                <a className='hover:text-blue-500 flex-col'>
                  <LinkedinLogo size={24} />
                </a>
              </Link>

              <Link
                href="mailto:romulo.takaoka@desperta.me"
                aria-label='Enviar e-mail'>
                <a className='hover:text-blue-500 flex-col'>
                  <Envelope size={24} />
                </a>
              </Link>
            </div>
          </div>
        </aside>
      </section>

    </Layout>
  )
}