import { InferGetStaticPropsType } from "next";

const ProductsPage = ({ data } : InferGetStaticPropsType<typeof getStaticProps>) => {
  return <div>sieema</div>;
};

export default ProductsPage;

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

export const getStaticProps = async () => {
  const res = await fetch("https://fakestoreapi.com/products/");
  const data: StoreApiResponse[] = await res.json();

  return {
    props: {
      data,
    },
  };
};
