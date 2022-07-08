import Link from "next/link";
import Date from "./date";

export default function PostsList({ posts }) {

  return (
    
    <div className='md:flex-1'>
          <ul>
            {posts.map((post) => (
              <li
                key={post.id}
                className='
                border 
                rounded 
                p-4
                mb-6
                dark:border-white 
                border-gray-900 
                hover:bg-gray-200 
                dark:hover:bg-gray-800
                hover:underline
                '
              >
                <Link href={`/posts/${post.slug}`}>
                  <a className='font-bold'>{post.title}</a>
                </Link>
                <br />
                <small>
                  <Date dateString={post.publishedAt} />
                </small>
              </li>
            ))}
          </ul>
        </div>
  )
}