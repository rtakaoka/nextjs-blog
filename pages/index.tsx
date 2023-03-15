import Head from 'next/head'
import Image from 'next/image'

import Layout, { siteTitle } from '../components/layout'
import PostsList from '../components/PostsList'
import ProfileCard from '../components/ProfileCard'

import client from '../apollo-client'
import { gql } from '@apollo/client'
import { MouseEvent, useState } from 'react'

export const GET_POSTS = gql`
  query GetPosts ($first: Int, $after: String){
    posts(orderBy: createdAt_DESC, stage: PUBLISHED, first: $first, after: $after) {
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
    postsConnection(orderBy: createdAt_DESC, stage: PUBLISHED, first: $first, after: $after) {
    pageInfo {
      endCursor
      hasNextPage
      hasPreviousPage
      pageSize
      startCursor
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
    categories: {
      title: string
    }
  }
  postsConnection: {
    pageInfo: {
      endCursor: string;
      hasNextPage: boolean;
      hasPreviousPage: boolean;
      pageSize: number;
      startCursor: string
    }
  }
}

interface PostsDataArray extends Array<PostsData["posts"]>{}

async function getPosts(first: number = 4, after: string = null) {
  const { loading, data } = await client.query<PostsData>({
    query: GET_POSTS,
    variables: { first: first, after: after }
  });

  return {
    posts: data.posts,
    postsConnection: data.postsConnection,
  }
}

async function loadMorePosts(posts: PostsData["posts"], postsConnection: PostsData["postsConnection"]) {
  const cursor = postsConnection.pageInfo.endCursor
  const { loading, data } = await client.query<PostsData>({
    query: GET_POSTS,
    variables: { first: 4, after: cursor }
  });

  const newPosts: PostsData["posts"] = data.posts

  return {
    props: {
      posts: [...posts, ...newPosts],
      postsConnection: data.postsConnection
    }
  }

}

export async function getStaticProps() {

  const { posts, postsConnection } = await getPosts()

  return {
    props: {
      posts: posts,
      postsConnection: postsConnection,
    },
    revalidate: 10,
  }
}

export default function Home(props: PostsData) {
  const [posts, setPosts] = useState(props.posts)
  const [postsConnection, setPostsConnection] = useState(props.postsConnection)
  const [disable, setDisable] = useState(false)
  const [buttonText, setButtonText] = useState("Carregar Mais...")


  const handleClick = async (e: MouseEvent) => {
    const newProps = await loadMorePosts(posts, postsConnection)
    setPosts(newProps.props.posts)
    setPostsConnection(newProps.props.postsConnection)

    if (!postsConnection.pageInfo.hasNextPage) {
      setDisable(true)
      setButtonText("Em breve mais posts...")
    }
  }

  return (
    <Layout home>
      <Head>
        <title>{siteTitle}</title>
      </Head>

      <section className='md:flex gap-6 items-end'>
        <div className='h-[144px] w-[144px] md:flex-col'>
          <Image
            src='/images/profile.jpg'
            height={144}
            width={144}
            alt='Foto Rômulo Takaoka'
            className='rounded-3xl'>
          </Image>
        </div>

        <div className='my-6 md:flex-col'>
          <p className='max-w-[600px] text-2xl font-bold italic'>“I build websites and help business to establish their presence on the web.”</p>
        </div>

      </section>
      <h2 className='text-3xl font-bold my-6'>Blog</h2>


      <section className='md:flex gap-6 items-start'>
        <div>
          <PostsList posts={posts} />
          <button
            disabled={disable}
            onClick={e => handleClick(e)}>{buttonText}</button>
        </div>

        <ProfileCard />

      </section>

    </Layout>

  )
}