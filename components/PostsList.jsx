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
                
                '
          >
            <div className="flex gap-4 justify-between items-baseline text-xs">
              <Link href={`/posts/${post.slug}`}>
                <a className="hover:underline">
                  <Date dateString={post.publishedAt} />
                </a>
              </Link>
              <p className="rounded bg-gray-300 dark:bg-gray-700 px-2 py-1 hover:no-underline">
                {post.categories[0].title}
              </p>
            </div>


            <div className="mt-4">
              <Link href={`/posts/${post.slug}`}>
                <a className='font-bold hover:underline'>{post.title}</a>
              </Link>
            </div>

          </li>
        ))}
      </ul>
    </div>
  )
}