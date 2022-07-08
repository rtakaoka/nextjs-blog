import { ApolloProvider } from '@apollo/client'
import { ThemeProvider } from 'next-themes'
import Layout from '../components/layout'
import client from '../apollo-client'

import '../styles/global.css'

export default function App({ Component, pageProps }) {
  return (

    <ThemeProvider attribute='class'>
      <ApolloProvider client={client}>
        <Component {...pageProps} />
      </ApolloProvider>
    </ThemeProvider>

  )
}