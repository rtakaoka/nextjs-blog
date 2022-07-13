
import { gql } from "@apollo/client";
import client from "../../apollo-client";
import Layout, { siteTitle } from "../../components/layout";
import Head from 'next/head';
import Date from '../../components/date';

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

export async function getStaticProps({ params }) {
  const { data } = await client.query<Post>(
    {
      query: GET_POST_BY_SLUG,
      variables: { slug: params.slug }
    }
  );

  return {
    props: {
      post: data.post,
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

export default function Post({ post }) {
  

  return (
    <Layout home={false}>

      <Head>
        <title>{post.title}</title>
      </Head>

      <div className="py-6">
        <h1 className="text-3xl font-bold">{post.title}</h1>
        <p className="mt-4 text-sm">{post.metaDescription}</p>
      </div>

      <main>
        <article className="max-w-[65ch]">



          <div className="text-sm border border-gray-900 dark:border-gray-100 rounded p-4">
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

    </Layout>
  )
}