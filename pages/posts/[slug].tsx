import { gql } from "@apollo/client";
import client from "../../apollo-client";
import Layout from "../../components/layout";
import Head from 'next/head';
import Date from '../../components/date';
import PostsList from "../../components/PostsList";

const GET_POST_BY_SLUG = gql`
  query GetPostBySlug ($slug:String){
    post(locales: pt_BR, where: {slug: $slug}) {
      title
      tags
      publishedAt
      metaDescription
      author {
        bio
        name
        photo {
          url
        }
      }
      categories {
        title
        slug
      }
      content {
        html
      }
    }
  }
`

export const GET_POSTS = gql`
query GetPosts {
  posts(orderBy: publishedAt_DESC, stage: PUBLISHED) {
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

interface Post {
  post: {
    title: string;
    tags: string[];
    publishedAt: Date;
    metaDescription: string;
    author: {
      bio: string;
      name: string;
      photo: {
        url: string;
      }
    }
    categories: {
      title: string;
      slug: string
    }
    content: {
      html: string;
    }
  }
}

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
}

export async function getStaticProps({ params }) {
  const singlePostResponse = await client.query<Post>(
    {
      query: GET_POST_BY_SLUG,
      variables: { slug: params.slug }
    }
  );
  const singlePostData = singlePostResponse.data;
  
  const postsResponse = await client.query<PostsData>({
    query: GET_POSTS,
  });

  const postsData = postsResponse.data

  return {
    props: {
      post: singlePostData.post,
      posts: postsData.posts,
    },
    revalidate: 10,
  }
}



export async function getStaticPaths() {
  const { data } = await client.query({
    query: GET_POSTS,
  });

  const paths = data.posts.map((item) => ({
    params: {
      slug: item.slug,
    }
  }))

  return {
    paths,
    fallback: 'blocking'
  }
}

export default function Post({ post, posts }) {


  return (
    <Layout home={false}>

      <Head>
        <title>{post.title}</title>
      </Head>

      <div className="md:flex md:justify-between gap-6">

        <main className="max-w-7xl">
          <div className="max-w-[65ch] py-6">
            <h1 className="text-3xl font-bold">{post.title}</h1>
            <p className="mt-4 text-sm">{post.metaDescription}</p>
          </div>

          <article>

            <div className="max-w-[65ch] text-sm border border-gray-900 dark:border-gray-100 rounded p-4">
              <div className="flex gap-2">
                <p className="font-bold">Publicado em:</p>
                <Date dateString={post.publishedAt} />
              </div>

              <div className="flex gap-4 mt-2">
                <p className="font-bold">Categorias:</p>
                <ul>
                  {post.categories.map((category) => (
                    <li key={category.slug}>{category.title}</li>
                  ))}
                </ul>
              </div>
            </div>

            <div
              className="mt-4 prose dark:prose-invert"
              dangerouslySetInnerHTML={{ __html: post.content.html }}></div>
          </article>
        </main>
        
        <aside className="max-w-[65ch] pt-6">
        <p className="text-3xl font-bold pb-6">Mais Posts</p>
          <PostsList posts={posts}/>

        </aside>
      </div>
    </Layout>
  )
}