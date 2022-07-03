import { InferGetStaticPaths } from "..";
import { InferGetStaticPropsType } from "next";
import ProductListItem from "../../product-list-item";
import { v4 as uuidv4 } from "uuid";

export interface StoreApiResponse {
  map(arg0: (product: any) => JSX.Element): import("react").ReactNode;
  id: number;
  title: string;
  price: number;
  description: string;
  category: string;
  image: string;
  rating: {
    rate: number;
    count: number;
  };
}

const Page = ({ data }:  InferGetStaticPropsType<typeof getStaticProps>)  => {

  return (
    <div className="bg-white">
      <div className="max-w-7xl mx-auto overflow-hidden sm:px-6 lg:px-8">
        <h2 className="sr-only">Products</h2>
        <div className="-mx-px border-l border-gray-200 grid grid-cols-2 sm:mx-0 md:grid-cols-3 lg:grid-cols-4">
          {data &&
            data.map((product) => (
              <ProductListItem
                data={{
                  id: product.id,
                  title: product.title,
                  description: product.description,
                  price: product.price,
                  image: product.image,
                }}
                key={uuidv4()}
              />
            ))}
        </div>
      </div>
    </div>
  );
};

export default Page

const PAGES_COUNT = 10;

export const getStaticPaths = async () => {
  return {
    paths: Array.from({ length: PAGES_COUNT }, (_, i) => {
      return {
        params: { page: (i + 1).toString() },
      };
    }),
    fallback: false,
  };
};

export const getStaticProps = async ({
  params,
}: InferGetStaticPaths<typeof getStaticPaths>) => {
  if (!params?.page) {
    return {
      props: {},
      notFound: true,
    };
  }

  const offset = (Number(params?.page) * 25).toString();

  const res = await fetch(
    `https://naszsklep-api.vercel.app/api/products?take=25&offset=${offset}`
  );
  const data: StoreApiResponse | null = await res.json();

  return {
    props: {
      data,
    },
  };
};
