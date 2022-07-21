import { useId } from "react";
import Image from "next/image";
import { useCartState } from "../components/Cart/CartContext";

const CartPage = () => {
  const ID = useId();

  const cartState = useCartState();

  const priceList = cartState.items.map(item => item.price)
  const subtotal = priceList.length >= 1 && priceList.reduce((previousValue, currentValue, currentIndex, array) => previousValue + currentValue)

  return (
    <div className="bg-white">
      <div className="max-w-4xl mx-auto py-16 px-4 sm:py-24 sm:px-6 lg:px-8">
        <h1 className="text-3xl font-extrabold tracking-tight text-gray-900">
          Shopping Cart
        </h1>

        <form className="mt-12">
          <div>
            <h2 className="sr-only">Items in your shopping cart</h2>

            <ul
              role="list"
              className="border-t border-b border-gray-200 divide-y divide-gray-200"
            >
              {cartState.items.map((product, productIdx) => (
                <li key={product.id} className="flex py-6 sm:py-10">
                  <div className="flex-shrink-0 min-w-[128px]">
                    <Image
                      layout="responsive"
                      width={16}
                      height={9}
                      objectFit="contain"
                      src={product.image}
                      alt={product.title}
                      className="w-full h-full object-center object-cover"
                    />
                  </div>

                  <div className="relative ml-4 flex-1 flex flex-col justify-between sm:ml-6">
                    <div>
                      <div className="flex justify-between sm:grid sm:grid-cols-2">
                        <div className="pr-6">
                        <h3 className="text-sm">
                          {/* <a href={product.href} className="font-medium text-gray-700 hover:text-gray-800">
                            {product.name}
                          </a> */}
                          {product.title}
                        </h3>
                        <button
                          type="button"
                          onClick={() => cartState.removeItemFromCart(product.id)}
                          className="ml-4 text-sm font-medium text-indigo-600 hover:text-indigo-500 sm:ml-0 sm:mt-3"
                        >
                          <span>Remove</span>
                        </button>
                        {/* <p className="mt-1 text-sm text-gray-500">{product.color}</p>
                        {product.size ? <p className="mt-1 text-sm text-gray-500">{product.size}</p> : null} */}
                      </div>

                        <p className="text-sm font-medium text-gray-900 text-right">
                          {product.count >= 2 && `${product.count} x `}
                          {product.price} $
                        </p>
                      </div>
                    </div>

                    {/* <p className="mt-4 flex text-sm text-gray-700 space-x-2">
                    {product.inStock ? (
                      <CheckIcon className="flex-shrink-0 h-5 w-5 text-green-500" aria-hidden="true" />
                    ) : (
                      <ClockIcon className="flex-shrink-0 h-5 w-5 text-gray-300" aria-hidden="true" />
                    )}

                    <span>{product.inStock ? 'In stock' : `Ships in ${product.leadTime}`}</span>
                  </p> */}
                  </div>
                </li>
              ))}
            </ul>
          </div>

          {/* Order summary */}
          <div className="mt-10 sm:ml-32 sm:pl-6">
            <div className="bg-gray-50 rounded-lg px-4 py-6 sm:p-6 lg:p-8">
              <h2 className="sr-only">Order summary</h2>

              <div className="flow-root">
                <dl className="-my-4 text-sm divide-y divide-gray-200">
                  <div className="py-4 flex items-center justify-between">
                    <dt className="text-gray-600">Subtotal</dt>
                    <dd className="font-medium text-gray-900">${subtotal}</dd>
                  </div>
                  <div className="py-4 flex items-center justify-between">
                    <dt className="text-gray-600">Shipping</dt>
                    <dd className="font-medium text-gray-900">$5.00</dd>
                  </div>
                  <div className="py-4 flex items-center justify-between">
                    <dt className="text-gray-600">Tax</dt>
                    <dd className="font-medium text-gray-900">$8.32</dd>
                  </div>
                  <div className="py-4 flex items-center justify-between">
                    <dt className="text-base font-medium text-gray-900">
                      Order total
                    </dt>
                    <dd className="text-base font-medium text-gray-900">
                      $112.32
                    </dd>
                  </div>
                </dl>
              </div>
            </div>
            <div className="mt-10">
              <button
                type="submit"
                className="w-full bg-indigo-600 border border-transparent rounded-md shadow-sm py-3 px-4 text-base font-medium text-white hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-offset-gray-50 focus:ring-indigo-500"
              >
                Checkout
              </button>
            </div>

            <div className="mt-6 text-sm text-center text-gray-500">
              <p>
                or{" "}
                <a
                  href="#"
                  className="text-indigo-600 font-medium hover:text-indigo-500"
                >
                  Continue Shopping<span aria-hidden="true"> &rarr;</span>
                </a>
              </p>
            </div>
          </div>
        </form>
      </div>
    </div>
  );
};

export default CartPage;
