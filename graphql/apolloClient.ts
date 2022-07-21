import {
  ApolloClient,
  InMemoryCache,
} from "@apollo/client";

export const apolloClient = new ApolloClient({
  uri: 'https://api-eu-central-1.hygraph.com/v2/cl5m7gvmy4u1c01uohom3927p/master',
  cache: new InMemoryCache(),
});
