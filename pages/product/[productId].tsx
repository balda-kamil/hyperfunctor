import { InferGetStaticPropsType } from "next";
import { InferGetStaticPaths } from "../products";
import Image from "next/image";
import { NextSeo } from "next-seo";
import { serialize } from 'next-mdx-remote/serialize'
import MyReactMarkdown from "../../components/MyReactMakrdown";

const ProductDetails = ({
  data,
}: InferGetStaticPropsType<typeof getStaticProps>) => {
  if (!data) {
    return <p> coś poszło nie tak! </p>;
  }

  return (
    <div>
      <NextSeo
        title={data.title}
        description={data.description}
        canonical={`https://hyperfunctor.vercel.app/product/${data.id}/`}
        openGraph={{
          url: `https://hyperfunctor.vercel.app/product/${data.id}/`,
          title: data.title,
          description: data.description,
          images: [
            {
              url: data.image,
              width: 800,
              height: 600,
              alt: data.title,
              type: "image/jpeg",
            },
          ],
          site_name: "SiteName",
        }}
      />
      <h2>{data.title}</h2>
      <br />
      <p>{data.description}</p>
      <br />
      <article className="prose lg:prose-xl">
        <MyReactMarkdown>{data.longDescription}</MyReactMarkdown>
      </article>
      <br />
      <p>{data.price} zł</p>
      <Image
        width={16}
        height={9}
        objectFit="contain"
        layout="responsive"
        src={data.image}
        alt={data.title}
      />
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
    fallback: "blocking",
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


  if(!data){
    return{
      props: {},
      notFound: true,
    } 
  }


  return {
    props: {
      data: {
        ...data,
        longDescription: await serialize(data?.longDescription)
      }
    },
  };
};


interface StoreApiResponse {
  id: number;
  title: string;
  price: number;
  description: string;
  longDescription: string,
  category: string;
  image: string;
  rating: {
    rate: number;
    count: number;
  };
}