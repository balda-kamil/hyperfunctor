import { useState } from "react";
import ProductListItem from "../product-list-item";
import { v4 as uuidv4 } from "uuid";
import { useQuery } from "react-query";


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

const ProductsPage = () => {

  const { data } = useQuery('first-products', () => fetch('https://naszsklep-api.vercel.app/api/products?take=25&offset=0').then(res => res.json()))

  return (
    <div className="bg-white">
      <div className="max-w-7xl mx-auto overflow-hidden sm:px-6 lg:px-8">
        <h2 className="sr-only">Products</h2>
        <div className="-mx-px border-l border-gray-200 grid grid-cols-2 sm:mx-0 md:grid-cols-3 lg:grid-cols-4">
          {data &&
            data.map((product: StoreApiResponse) => (
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
      {/* // TO DO PAGINATION  */}
    </div>
  );
};

export default ProductsPage;

export type InferGetStaticPaths<T> = T extends () => Promise<{
  paths: Array<{ params: infer R }>;
}>
  ? { params?: R }
  : never;
