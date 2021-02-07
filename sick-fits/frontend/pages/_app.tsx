import NProgress from "nprogress";
import { NextFunctionComponent } from "next";
import Router from "next/router";
import { AppProps } from "next/app";
import Page from "../components/Page";
import "../components/styles/nprogress.css";
import { ApolloProvider } from "@apollo/client";
import withData from "../lib/withData";

Router.events.on("routeChangeStart", () => NProgress.start());
Router.events.on("routeChangeComplete", () => NProgress.done());
Router.events.on("routeChangeError", () => NProgress.done());

const MyApp: NextFunctionComponent<IMyApp> = ({
  Component,
  pageProps,
  apollo
}) => {
  const x = 1;
  return (
    <ApolloProvider client={apollo}>
      <Page>
        <Component {...pageProps} />
      </Page>
    </ApolloProvider>
  );
};

MyApp.getInitialProps = async function({ Component, ctx }) {
  let pageProps: { query?: any } = {};
  if (Component.getInitialProps)
    pageProps = await Component.getInitialProps(ctx);

  pageProps.query = ctx.query;
  return pageProps;
};

export default withData(MyApp);

interface IMyApp extends AppProps {
  apollo: any;
}
