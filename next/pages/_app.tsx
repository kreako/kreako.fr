import "../styles/globals.css"
import type { AppProps } from "next/app"
import type { NextPage } from "next"
import Layout from "../components/layout"
import EmptyLayout from "../components/empty-layout"

export type EmptyLayoutPage = NextPage & {
  emptyLayout: boolean
}

function MyApp({ Component, pageProps }: AppProps) {
  if ("emptyLayout" in Component) {
    const Comp = Component as EmptyLayoutPage
    return (
      <EmptyLayout>
        <Comp {...pageProps} />
      </EmptyLayout>
    )
  } else {
    return (
      <Layout>
        <Component {...pageProps} />
      </Layout>
    )
  }
}

export default MyApp
