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
  console.log("ProductListItem data", data);

  return (
    <>
      {data && (
        <div className="group relative p-4 border-r border-b border-gray-200 sm:p-6">
          <div className="rounded-lg overflow-hidden bg-gray-200 aspect-w-1 aspect-h-1 group-hover:opacity-75">
            <img
              src={data.image}
              alt={data.title}
              className="w-full h-full object-center object-cover"
            />
          </div>
          <div className="pt-10 pb-4 text-center">
            <h3 className="text-sm font-medium text-gray-900">
              <a href={`/products/${data.id}`}>
                <span aria-hidden="true" className="absolute inset-0" />
                {data.title}
              </a>
            </h3>
            <p className="mt-4 text-base font-medium text-gray-900">
              {data.price} zł
            </p>
          </div>
        </div>
      )}
    </>
  );
};

export default ProductListItem;
