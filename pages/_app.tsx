import "../styles/globals.css";
import type { AppProps } from "next/app";
import Navigation from "../components/Navigation";
import Footer from "../components/Footer";
import { QueryClientProvider, QueryClient } from "react-query";
import { DefaultSeo } from "next-seo";
import SEO from "../next-seo.config";
import { CartStateContextProvider } from "../components/Cart/CartContext";

// Create a client
const queryClient = new QueryClient();

function MyApp({ Component, pageProps }: AppProps) {
  return (
    <CartStateContextProvider>
      <QueryClientProvider client={queryClient}>
        <DefaultSeo {...SEO} />
        <div>
          <Navigation />
          <main>
            <Component {...pageProps} />
          </main>
          <Footer />
        </div>
      </QueryClientProvider>
    </CartStateContextProvider>
  );
}

export default MyApp;
