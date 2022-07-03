import { InferGetStaticPropsType } from "next";
import { InferGetStaticPaths } from "../products";

const ProductDetails = ({
  data,
}: InferGetStaticPropsType<typeof getStaticProps>) => {

  if (!data) {
    return <p> coś poszło nie tak! </p>;
  }
  
  return (
    <div>
      <h2>{data.title}</h2>
      <br />
      <p>{data.description}</p>
      <br />
      <p>{data.price} zł</p>
      <img src={data.image} alt={data.title} />
    </div>
  );
};

export default ProductDetails;

const PRODUCTS_NUMBER = 4000

export const getStaticPaths = async () => {
  const res = await fetch("https://naszsklep-api.vercel.app/api/products/");
  const data: StoreApiResponse[] = await res.json();

  return {
    paths: Array.from({length : PRODUCTS_NUMBER}, (_,i) => {
      return {
        params: {
          productId: (i + 1).toString(),
        },
      };
    }),
    fallback: false,
  };
};

export const getStaticProps = async ({
  params,
}: InferGetStaticPaths<typeof getStaticPaths>) => {
  if (!params?.productId) {
    return {
      props: {},
      notFound: true,
    };
  }

  const res = await fetch(
    `https://naszsklep-api.vercel.app/api/products/${params.productId}`
  );
  const data: StoreApiResponse | null = await res.json();

  return {
    props: {
      data,
    },
  };
};

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

