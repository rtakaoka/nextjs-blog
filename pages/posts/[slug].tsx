
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
    }
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
    fallback: false
  }
}

export default function Post({ post }) {
  console.log(post);

  return (
    <Layout home={false}>

      <Head>
        <title>{post.title}</title>
      </Head>

      <div className="py-6">
        <p className="text-3xl font-bold">{post.title}</p>
        <p className="mt-4 text-sm">{post.metaDescription}</p>
      </div>

      <main>
        <article>
          <div className="text-sm">
            <Date dateString={post.publishedAt} />
          </div>


          <div className="flex gap-4 text-sm">
            <p className="text-bold">Categorias:</p>
            <ul>
              {post.categories.map((category) => (
                <li key={category.slug}>{category.title}</li>
              ))}
            </ul>
          </div>

          <div 
            className="mt-4" 
            dangerouslySetInnerHTML={{ __html: post.content.html }}></div>
        </article>
      </main>

    </Layout>
  )
}