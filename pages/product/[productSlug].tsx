import { InferGetStaticPropsType } from "next";
import { InferGetStaticPaths } from "../products";
import Image from "next/image";
import { NextSeo } from "next-seo";
import { serialize } from "next-mdx-remote/serialize";
import MyReactMarkdown from "../../components/MyReactMakrdown";
import { apolloClient } from "../../graphql/apolloClient";
import { GetProductDetailsBySlugDocument, GetProductDetailsBySlugQuery, GetProductDetailsBySlugQueryVariables, GetProductsSlugsDocument, GetProductsSlugsQuery } from "../../generated/graphql";

const ProductDetails = ({
  data,
}: InferGetStaticPropsType<typeof getStaticProps>) => {
  if (!data) {
    return <p> coś poszło nie tak! </p>;
  }

  return (
    <div>
      <NextSeo
        title={data.name}
        description={data.description}
        canonical={`https://hyperfunctor.vercel.app/product/${data.slug}/`}
        openGraph={{
          url: `https://hyperfunctor.vercel.app/product/${data.slug}/`,
          title: data.name,
          description: data.description,
          images: [
            {
              url: data.images[0].url,
              width: 800,
              height: 600,
              alt: data.name,
              type: "image/jpeg",
            },
          ],
          site_name: "SiteName",
        }}
      />
      <h2>{data.name}</h2>
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
        src={data.images[0].url}
        alt={data.name}
      />
    </div>
  );
};

export default ProductDetails;

export const getStaticPaths = async () => {

  const { data } = await apolloClient.query<GetProductsSlugsQuery>({
    query: GetProductsSlugsDocument,
  });

  return {
    paths: data.products.map((product) => {
      return {
        params: {
          productSlug: product.slug,
        },
      };
    }),
    fallback: "blocking",
  };
};

export const getStaticProps = async ({
  params,
}: InferGetStaticPaths<typeof getStaticPaths>) => {

  if (!params?.productSlug) {
    return {
      props: {},
      notFound: true,
    };
  }

  const { data } = await apolloClient.query<GetProductDetailsBySlugQuery, GetProductDetailsBySlugQueryVariables>({
    variables: {
      slug: params.productSlug,
    },
    query: GetProductDetailsBySlugDocument,
  });

  if (!data || !data.product) {
    return {
      props: {},
      notFound: true,
    };
  }

  return {
    props: {
      data: {
        ...data.product,
        longDescription: await serialize(data.product.description),
      },
    },
  };
};
