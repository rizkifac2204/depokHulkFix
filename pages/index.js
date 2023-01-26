import styles from "../styles/Home.module.css";
import Head from "next/head";
import config from "constants/AppConfig";
import Link from "next/link";

function Home() {
  return (
    <div className={styles.container}>
      <Head>
        <title>{`Selamat Datang di ${config.brandName} `}</title>
      </Head>

      <main className={styles.main}>
        <h1 className={styles.title}>
          Selamat Datang Di{" "}
          <a href="https://loremit.com/">{config.brandName}</a>
        </h1>

        <p className={styles.description}>
          <code>
            <Link href="/login">Login</Link>
          </code>{" "}
          OR{" "}
          <code>
            <Link href="/admin">Admin</Link>
          </code>
        </p>
      </main>
    </div>
  );
}

Home.fullPage = true;
export default Home;
