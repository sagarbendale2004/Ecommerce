import React from "react";
import { useSelector, useDispatch } from "react-redux";
import { remove } from "../store/CartSlice";
import { Link } from "react-router-dom";
import { useNavigate } from "react-router-dom";
import { clearCart } from "../store/CartSlice";

const ShoppingCart = () => {
  const items = useSelector((state) => state.cart.items);
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const handleRemove = (product) => {
    dispatch(remove(product.id));
  };

  const calculateSubtotal = () => {
    return items.reduce(
      (total, product) => total + product.price * (product.quantity || 1),
      0
    );
  };

  const handleCheckOut = () => {
    if (items.length === 0) {
      alert("Add items into cart");
    } else {
      const order = window.confirm("Do You Want To Confirm Order?");
      if (order) {
        alert("Order Confirmed.. Visit Again");
        dispatch(clearCart());
        navigate("/");
      } else {
        alert("Order Rejected..");
      }
    }
  };

  return (
    <div className="flex items-center justify-center min-h-[100vh] w-[90%] mx-auto flex-col bg-white shadow-xl">
      <div className="flex-1 overflow-y-auto px-4 py-6 sm:px-6">
        <h2 className="text-lg font-medium text-gray-900">Shopping cart</h2>
        <ul role="list" className="divide-y divide-gray-200 mt-8">
          {items.map((product) => (
            <li key={product.id} className="flex py-6">
              <div className="h-24 w-24 flex-shrink-0 overflow-hidden rounded-md border border-gray-200">
                <img
                  alt={product.title}
                  src={product.image}
                  className="h-full w-full object-inherit object-center"
                />
              </div>
              <div className="ml-4 flex flex-1 flex-col">
                <div className="flex justify-between text-base font-medium text-gray-900">
                  <h3>{product.title}</h3>
                  <p className="ml-4">${product.price}</p>
                </div>
                <p className="mt-1 text-sm text-gray-500">
                  Quantity: {product.quantity || 1}
                </p>
                <div className="flex items-end justify-between text-sm mt-2">
                  <p className="text-gray-500 pr-4">
                    Description: {product.description}
                  </p>
                  <button
                    type="button"
                    className="font-medium text-indigo-600 hover:text-indigo-500"
                    onClick={() => handleRemove(product)}
                  >
                    Remove
                  </button>
                </div>
              </div>
            </li>
          ))}
        </ul>
        <div className="border-t border-gray-200 mt-4 pt-4">
          <div className="flex justify-between text-base font-medium text-gray-900">
            <p>Subtotal</p>
            <p>${calculateSubtotal().toFixed(2)}</p>
          </div>
          <p className="mt-0.5 text-sm text-gray-500">
            Shipping and taxes calculated at checkout.
          </p>
          <div className="mt-6">
            <div
              onClick={handleCheckOut}
              className="flex items-center justify-center rounded-md border border-transparent bg-indigo-600 px-6 py-3 text-base font-medium text-white shadow-sm hover:bg-indigo-700 cursor-pointer"
            >
              Checkout
            </div>
          </div>
          <div className="mt-6 text-center text-sm text-gray-500">
            <p>
              or{" "}
              <Link
                to={"/"}
                type="button"
                className="font-medium text-indigo-600 hover:text-indigo-500"
              >
                Continue Shopping
                <span aria-hidden="true"> &rarr;</span>
              </Link>
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ShoppingCart;
