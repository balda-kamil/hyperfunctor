import Link from "next/link";
import Image from 'next/image'

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
              <div className="pt-10 pb-4 text-center">
                <h3 className="text-sm font-medium text-gray-900">
                  <span aria-hidden="true" className="absolute inset-0" />
                  {data.title}
                </h3>
                <p className="mt-4 text-base font-medium text-gray-900">
                  {data.price} zł
                </p>
              </div>
            </a>
          </Link>
        </div>
      )}
    </>
  );
};

export default ProductListItem;


