import Link from "next/link";
import { useRouter } from "next/router";
import Date from "./date";

export default function PostsList({ posts }) {
  const router = useRouter()
  const { slug } = router.query

  return (

    <div className='md:flex-1'>
      <ul>
        {posts.map((post) => (
          <li
            key={post.id}
            className={`
                border 
                rounded 
                p-4
                mb-6
                
                ${post.slug == slug
                ? 'bg-gray-300 border-0 hover:bg-gray-400 dark:bg-gray-800 dark:hover:bg-gray-700'
                : 'border-gray-900 hover:bg-gray-200 dark:border-white dark:hover:bg-gray-800'
              }
                `}
          >
            <div className="flex gap-4 justify-between items-baseline text-xs">
              <Link
                className="hover:underline"
                href={`/posts/${post.slug}`}>
                {post.slug == slug
                  ? <p>Você está lendo este post<span className="text-xl"> 🎉</span></p>
                  : <Date dateString={post.publishedAt} />
                }
              </Link>

              <p className="rounded bg-gray-300 dark:bg-gray-700 px-2 py-1 hover:no-underline">{post.categories[0].title}</p>



            </div>


            <div className="mt-4 font-bold hover:underline">
              <Link href={`/posts/${post.slug}`}>
                {post.title}
              </Link>
            </div>

          </li>
        ))}
      </ul>
    </div>
  )
}