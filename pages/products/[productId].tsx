import { InferGetStaticPropsType } from "next";

const ProductDetails = ({
  data,
}: InferGetStaticPropsType<typeof getStaticProps>) => {

  if (!data) {
    return <p> coś poszło nie tak! </p>;
  }

  return (
    <div>
      <h2>{data.title}</h2><br/>
      <p>{data.description}</p><br/>
      <p>{data.price} zł</p>
      <img src={data.image} alt={data.title} />
    </div>
  );
};

export default ProductDetails;

export const getStaticPaths = async () => {
  const res = await fetch("https://fakestoreapi.com/products/");
  const data: StoreApiResponse[] = await res.json();

  return {
    paths: data.map(product => {
      return {
        params: {
          productId: product.id.toString()
        }
      }
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
    `https://fakestoreapi.com/products/${params.productId}`
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

export type InferGetStaticPaths<T> = T extends () => Promise<{
  paths: Array<{ params: infer R }>;
}>
  ? { params?: R }
  : never;