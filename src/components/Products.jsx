import { useEffect, useState } from "react";
import { IoMdAdd } from "react-icons/io";
import { IoRemove } from "react-icons/io5";
import { useDispatch, useSelector } from "react-redux";
import { add, remove } from "../store/CartSlice";
import { fetchProducts } from "../store/ProductSlice";
import { STATUSES } from "../store/ProductSlice";
/*
  This example requires some changes to your config:
  
  ```
  // tailwind.config.js
  module.exports = {
    // ...
    plugins: [
      // ...
      require('@tailwindcss/aspect-ratio'),
    ],
  }
  ```
*/

export default function Example() {
  // const [data, setData] = useState([]);
  const dispatch = useDispatch();
  const { data, status } = useSelector((state) => state.product);

  useEffect(() => {
    dispatch(fetchProducts());
    // const Products = async () => {
    //   const res = await fetch("https://fakestoreapi.com/products");
    //   const data = await res.json();
    //   setData(data);
    // };

    // Products();
  }, []);

  const handleAdd = (product) => {
    dispatch(add({ ...product, quantity: 1 }));
  };

  const handleRemove = (product) => {
    dispatch(remove(product.id));
  };

  if (status === STATUSES.LOADING) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <div className="relative">
          <div className="w-16 h-16 border-4 border-t-4 border-blue-500 border-dashed rounded-full animate-spin"></div>
        </div>
      </div>
    );
  }
  return (
    <div className="bg-white">
      <div className="mx-auto max-w-2xl px-4 py-16 sm:px-6 sm:py-24 lg:max-w-7xl lg:px-8">
        <h2 className="sr-only">Products</h2>

        <div className="grid grid-cols-1 gap-x-6 gap-y-10 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 xl:gap-x-8">
          {data.map((product) => (
            <a
              key={product.id}
              href={product.href}
              className="group border-2 border-gray-200 p-2 rounded-xl"
            >
              <div className="aspect-h-1 aspect-w-1 w-full overflow-hidden rounded-lg bg-gray-200 xl:aspect-h-8 xl:aspect-w-7">
                <img
                  alt={product.title}
                  src={product.image}
                  className="h-full w-full object-inherit object-center group-hover:opacity-75"
                />
              </div>
              <h3 className="mt-4 text-sm text-gray-700">{product.title}</h3>
              <div className="flex items-center justify-between">
                <p className="mt-1 text-lg font-medium text-gray-900">
                  {product.price}
                </p>
                <div className="flex gap-2">
                  <button
                    onClick={() => handleAdd(product)}
                    className="bg-gray-300 px-2 py-1 rounded"
                  >
                    <IoMdAdd />
                  </button>
                  <button
                    onClick={() => handleRemove(product)}
                    className="bg-gray-300 px-2 py-1 rounded"
                  >
                    <IoRemove />
                  </button>
                </div>
              </div>
            </a>
          ))}
        </div>
      </div>
    </div>
  );
}
