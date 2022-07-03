import { InferGetStaticPropsType } from "next";
import { InferGetStaticPaths } from "../products";
import Image from 'next/image'

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
      <Image width={16} height={9} objectFit="contain" layout="responsive" src={data.image} alt={data.title} />
    </div>
  );
};

export default ProductDetails;

export const getStaticPaths = async () => {
  const res = await fetch("https://naszsklep-api.vercel.app/api/products/");
  const data: StoreApiResponse[] = await res.json();

  return {
    paths: data.map((product) => {
      return {
        params: {
          productId: product.id.toString(),
        },
      };
    }),
    fallback: 'blocking',
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

