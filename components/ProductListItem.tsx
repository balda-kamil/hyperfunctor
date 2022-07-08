import Link from "next/link";
import Image from "next/image";
import { useCartState } from "./Cart/CartContext";

interface ListItem {
  data: {
    id: number;
    title: string;
    description: string;
    price: number;
    image: string;
  };
}

const ProductListItem = ({ data }: ListItem) => {
  const cartState = useCartState();
  return (
    <>
      {data && (
        <div className="group relative p-4 border-r border-b border-gray-200 sm:p-6">
          <Link href={`/product/${data.id}`}>
            <a>
              <div className="rounded-lg overflow-hidden bg-gray-200 aspect-w-1 aspect-h-1 group-hover:opacity-75">
                <Image
                  layout="responsive"
                  width={16}
                  height={9}
                  objectFit="contain"
                  src={data.image}
                  alt={data.title}
                  className="w-full h-full object-center object-cover"
                />
              </div>
              <div className="pt-10 mb-4 text-center">
                <h3 className="text-sm font-medium text-gray-900">
                  {data.title}
                </h3>
                <p className="mt-4 text-base font-medium text-gray-900">
                  {data.price} zł
                </p>
              </div>
            </a>
          </Link>
          <button
            onClick={() =>
              cartState.addItemToCart({
                price: 40,
                title: data.title,
              })
            }
            type="button"
            className="mx-auto block px-4 py-2 border border-transparent shadow-sm text-sm font-medium rounded-md text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
          >
            Add to cart
          </button>
        </div>
      )}
    </>
  );
};

export default ProductListItem;
