import "styles/_style.scss";

// next
import PropTypes from "prop-types";
import Head from "next/head";

import { CacheProvider } from "@emotion/react";

// context
import { ContextProvider } from "context/AppContext";

import createEmotionCache from "utils/createEmotionCache";
// Client-side cache, shared for the whole session of the user in the browser.
const clientSideEmotionCache = createEmotionCache();

// component container
import Container from "container/Container";

export default function App({
  Component,
  emotionCache = clientSideEmotionCache,
  pageProps,
}) {
  return (
    <CacheProvider value={emotionCache}>
      <Head>
        <meta name="viewport" content="initial-scale=1, width=device-width" />
      </Head>
      <noscript>
        Browser Anda Tidak Mendukung Aplikasi Ini, Silakan Ganti Browser Yang
        Anda Gunakan {`(recomended : Google Chrome, Firefox, Edge, Opera)`}
      </noscript>
      <ContextProvider>
        <Container>
          <Component {...pageProps} />
        </Container>
      </ContextProvider>
    </CacheProvider>
  );
}

App.propTypes = {
  Component: PropTypes.elementType.isRequired,
  emotionCache: PropTypes.object,
  pageProps: PropTypes.object.isRequired,
};
