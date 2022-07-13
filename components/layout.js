import Head from 'next/head'
import Link from 'next/link'
import Footer from './Footer'
import Header from './Header'

const name = 'Rômulo Takaoka'
export const siteTitle = "Rômulo Takaoka's Blog"

export default function Layout({ children, home }) {
  return (
    <div className=''>
      <Head>
        <link rel="icon" href="/favicon.ico" />
        <meta
          name="description"
          content="Everything about me."
        />
        <meta
          property="og:image"
          content={`https://og-image.vercel.app/${encodeURI(
            siteTitle
          )}.png?theme=light&md=0&fontSize=75px&images=https%3A%2F%2Fassets.vercel.com%2Fimage%2Fupload%2Ffront%2Fassets%2Fdesign%2Fnextjs-black-logo.svg`}
        />
        <meta name="og:title" content={siteTitle} />
        <meta name="twitter:card" content="summary_large_image" />
      </Head>
      
      <Header />

      <main className='mx-auto max-w-7xl p-4'>{children}</main>
      {!home && (
        <div className='mx-auto max-w-7xl p-4'>
          <Link href="/">
            <a className='text-blue-500 hover:underline'>← Back to Home</a>
          </Link>
        </div>
      )}
      <Footer />
    </div>
  )
}