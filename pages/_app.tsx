import Layout from '@/components/layout/Layout';
import '@/styles/globals.css';
import type { AppProps } from 'next/app';
import Head from 'next/head';

export const App = ({ Component, pageProps }: AppProps) => {
  return (
    <Layout>
      <Head>
        <title>Quizz App: Crea tus quizz facilmente!</title>
        <meta
          name="description"
          content="Una app para crear quizz y resolverlos."
        />
      </Head>
      <Component {...pageProps} />
    </Layout>
  );
};

export default App;
