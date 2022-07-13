import Head from 'next/head'
import Image from 'next/image'

import Layout, { siteTitle } from '../components/layout'
import PostsList from '../components/PostsList'
import ProfileCard from '../components/ProfileCard'

import client from '../apollo-client'
import { gql } from '@apollo/client'
import Footer from '../components/Footer'

export const GET_POSTS = gql`
  query GetPosts {
    posts(orderBy: createdAt_DESC, stage: PUBLISHED) {
      id
      slug
      title
      publishedAt
      createdAt
      locale
      categories {
        title
      }
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

        <ProfileCard />

      </section>

    </Layout>
    
  )
}