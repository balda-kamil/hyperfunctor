import "../styles/globals.css";
import type { AppProps } from "next/app";
import Navigation from "../components/Navigation";
import Footer from "../components/Footer";

function MyApp({ Component, pageProps }: AppProps) {
  return (
    <div>
      <Navigation />
      <Component {...pageProps} />
      <Footer />
    </div>
  );
}

export default MyApp;
