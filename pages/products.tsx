import { InferGetStaticPropsType } from "next";
import ProductListItem from "./product-list-item";
import { v4 as uuidv4 } from "uuid";

export interface StoreApiResponse {
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

const ProductsPage = ({
  data,
}: InferGetStaticPropsType<typeof getStaticProps>) => {

  return (
    <div className="bg-white">
      <div className="max-w-7xl mx-auto overflow-hidden sm:px-6 lg:px-8">
        <h2 className="sr-only">Products</h2>

        <div className="-mx-px border-l border-gray-200 grid grid-cols-2 sm:mx-0 md:grid-cols-3 lg:grid-cols-4">
          {data.map((product) => (
            <ProductListItem data={{
              id: product.id,
              title: product.title,
              description: product.description,
              price: product.price,
              image: product.image
            }} key={uuidv4()} />
          ))}
        </div>
      </div>
    </div>
  );
};

export default ProductsPage;

export const getStaticProps = async () => {
  const res = await fetch("https://fakestoreapi.com/products/");
  const data: StoreApiResponse[] = await res.json();

  return {
    props: {
      data,
    },
  };
};
