import ProductListItem from "../../components/ProductListItem";
import { v4 as uuidv4 } from "uuid";
import { MarkDownResult } from "../../utils";
import { apolloClient } from "./../../graphql/apolloClient";
import { InferGetServerSidePropsType } from "next";
import { GetProductsListDocument, GetProductsListQuery } from "../../generated/graphql";

export interface StoreApiResponse {
  id: number;
  title: string;
  price: number;
  description: string;
  longDescription: MarkDownResult;
  category: string;
  image: string;
  rating: {
    rate: number;
    count: number;
  };
}

const ProductsPage = ({ data } : InferGetServerSidePropsType<typeof getStaticProps>) => {
  return (
    <div className="bg-white">
      <div className="max-w-7xl mx-auto overflow-hidden sm:px-6 lg:px-8">
        <h2 className="sr-only">Products</h2>
        <div className="-mx-px border-l border-gray-200 grid grid-cols-2 sm:mx-0 md:grid-cols-3 lg:grid-cols-4">
          {data &&
            data.products.map((product) => (
              <ProductListItem
                data={{
                  slug: product.slug,
                  title: product.name,
                  description: product.description,
                  price: product.price,
                  image: product.images[0].url,
                }}
                key={uuidv4()}
              />
            ))}
        </div>
      </div>
    </div>
  );
};

export default ProductsPage;

export const getStaticProps = async () => {
  const { data } = await apolloClient.query<GetProductsListQuery>({
    query: GetProductsListDocument,
  });

  return {
    props: {
      data,
    },
  };
};

export type InferGetStaticPaths<T> = T extends () => Promise<{
  paths: Array<{ params: infer R }>;
}>
  ? { params?: R }
  : never;
