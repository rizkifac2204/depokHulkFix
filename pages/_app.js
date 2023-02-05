import "styles/_style.scss";
import "styles/global.css";
import "nprogress/nprogress.css";
import "react-toastify/dist/ReactToastify.css";

import PropTypes from "prop-types";
import Head from "next/head";
import { CacheProvider } from "@emotion/react";
import createEmotionCache from "utils/createEmotionCache";
import ErrorBoundary from "services/ErrorBoundary";

// Toast dibutuhkan pada semua halaman termasuk saat logout
import { ToastContainer } from "react-toastify";

// Progess dibutuhkan pada semua halaman termasuk saat logout
import NProgress from "nprogress";

// Router berjalan termasuk saat logout
import Router from "next/router";
Router.events.on("routeChangeStart", () => NProgress.start());
Router.events.on("routeChangeComplete", () => NProgress.done());
Router.events.on("routeChangeError", () => NProgress.done());

// context
import { AuthContextProvider } from "context/AuthContext";
import { ContextProvider } from "context/AppContext";

// Client-side cache, shared for the whole session of the user in the browser.
const clientSideEmotionCache = createEmotionCache();

// component
import Container from "container/Container";

export default function App({
  Component,
  emotionCache = clientSideEmotionCache,
  pageProps,
}) {
  return (
    <ErrorBoundary>
      <CacheProvider value={emotionCache}>
        <Head>
          <meta name="viewport" content="initial-scale=1, width=device-width" />
        </Head>
        <noscript>
          Browser Anda Tidak Mendukung Aplikasi Ini, Silakan Ganti Browser Yang
          Anda Gunakan {`(recomended : Google Chrome, Firefox, Edge, Opera)`}
        </noscript>
        <ToastContainer />
        <ContextProvider>
          <AuthContextProvider>
            <Container fullPage={Component.fullPage}>
              <Component {...pageProps} />
            </Container>
          </AuthContextProvider>
        </ContextProvider>
      </CacheProvider>
    </ErrorBoundary>
  );
}

App.propTypes = {
  Component: PropTypes.elementType.isRequired,
  emotionCache: PropTypes.object,
  pageProps: PropTypes.object.isRequired,
};
