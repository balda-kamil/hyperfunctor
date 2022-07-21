import "../styles/globals.css";
import type { AppProps } from "next/app";
import Navigation from "../components/Navigation";
import Footer from "../components/Footer";
import { QueryClientProvider, QueryClient } from "react-query";
import { DefaultSeo } from "next-seo";
import SEO from "../next-seo.config";
import { CartStateContextProvider } from "../components/Cart/CartContext";
import { ApolloProvider } from '@apollo/client'
import { apolloClient } from '../graphql/apolloClient' 

// Create a client
const queryClient = new QueryClient();

function MyApp({ Component, pageProps }: AppProps) {
  return (
    <ApolloProvider client={apolloClient}>
      <CartStateContextProvider>
        <QueryClientProvider client={queryClient}>
          <DefaultSeo {...SEO} />
          <div>
            <Navigation />
            <iframe width="100%" height="800" src="https://deploy-preview-6--fanciful-manatee-ec981d.netlify.app/"/>
            <main>
              <Component {...pageProps} />
            </main>
            <Footer />
          </div>
        </QueryClientProvider>
      </CartStateContextProvider>
    </ApolloProvider>
  );
}

export default MyApp;
