import Head from 'next/head'
import Link from 'next/link'

import Layout, { siteTitle } from '../components/layout'
import { getSortedPostsData } from '../lib/posts'

import Date from '../components/date'
import Image from 'next/image'
import { Envelope, GithubLogo, LinkedinLogo } from 'phosphor-react'


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

      <section className='md:flex gap-6 items-start'>
        <div>
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
        </div>

        <aside>
          <div className='
            border
            border-gray-900
            dark:border-white
            rounded
            p-4
            min-h-[240px]
            overflow-hidden
            items-center
            '
          >
            <h3 className='text-xl font-bold'>Rômulo Takaoka</h3>
            <p className='mt-4'>Sou um apaixonado por tecnologia que teve medo de programação por muito tempo. Desde 2021 decidi superar esse medo e programar minhas aplicações pra valer.</p>
            
            <div className='flex gap-4 mt-4'>
            <a 
              href="https://github.com/rtakaoka"
              aria-label='Perfil Github'
              target={'_blank'}
              className='hover:text-blue-500 flex-col'
            >
              <GithubLogo size={24} />
            </a>
            <a 
              href="https://linkedin.com/in/romulotakaoka"
              aria-label='Perfil LinkedIn'
              target={'_blank'}
              className='hover:text-blue-500 flex-col'
            >
              <LinkedinLogo size={24} />
            </a>
            <a 
              href="mailto:romulo.takaoka@desperta.me"
              aria-label='Enviar e-mail'
              className='hover:text-blue-500 flex-col'
            >
              <Envelope size={24} />
            </a>
            </div>
          </div>
        </aside>
      </section>

    </Layout>
  )
}