import NProgress from 'nprogress';
import Router from 'next/router';
import { AppProps } from "next/app";
import Page from "../components/Page";
import '../components/styles/nprogress.css';

Router.events.on('routeChangeStart', () => NProgress.start());
Router.events.on('routeChangeComplete', () => NProgress.done());
Router.events.on('routeChangeError', () => NProgress.done());

const myApp = ({ Component, pageProps }: AppProps) => {
  const x = 1;
  return (
    <Page>
      <Component {...pageProps} />
    </Page>
  );
};

export default myApp;
