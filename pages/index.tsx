import Head from 'next/head'
import Link from 'next/link'

import Layout, { siteTitle } from '../components/layout'
import { getSortedPostsData } from '../lib/posts'
import { GetStaticProps, GetStaticPaths, GetServerSideProps } from 'next'

import Date from '../components/date'
import ThemeToggle from '../components/ThemeToggle'
import Header from '../components/Header'
import Image from 'next/image'


export async function getStaticProps() {
  const allPostsData = getSortedPostsData()
  return {
    props: {
      allPostsData
    }
  }
}

export default function Home({ allPostsData }) {
  return (
    <Layout home>
      <Head>
        <title>{siteTitle}</title>
      </Head>

      <section className=''>
        <div className=''>
          <Image 
            src='/images/profile.jpg' 
            height={144} 
            width={144} 
            className='rounded-3xl'></Image>
        </div>

        <div className='my-6'>
          <p className='max-w-[600px] text-2xl font-bold italic'>“I build websites and help business to establish their presence on the web.”</p>
        </div>

      </section>

      <section>
        <h2 className='text-3xl font-bold my-6'>Blog</h2>
        <ul>
          {allPostsData.map(({ id, date, title }) => (
            <li 
              key={id}
              className='
                border 
                rounded 
                p-4 
                my-4 
                dark:border-white 
                border-gray-900 
                hover:bg-gray-200 
                dark:hover:bg-gray-800
                hover:underline
                '
            >
              <Link href={`/posts/${id}`}>
                <a className='font-bold'>{title}</a>
              </Link>
              <br />
              <small>
                <Date dateString={date} />
              </small>
            </li>
          ))}
        </ul>
      </section>

    </Layout>
  )
}