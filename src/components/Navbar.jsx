import React from "react";
import { FaShoppingCart } from "react-icons/fa";
import { useSelector } from "react-redux";
import { Link } from "react-router-dom";

const Navbar = () => {
  const items = useSelector((state) => state.cart.items); // Access the items array from the cart slice

  return (
    <nav className="bg-[#1E3A8A] p-4">
      <div className="container mx-auto flex justify-between items-center">
        <div className="text-white text-xl font-bold">Shopify App</div>

        <Link to={"/ShoppingCart"} className="relative text-white text-xl">
          <FaShoppingCart className="cursor-pointer" />
          <div className="absolute -top-2 -right-2 bg-red-600 text-white text-xs w-5 h-5 flex items-center justify-center rounded-full">
            {items.length}{" "}
            {/* Correctly displaying the number of items in the cart */}
          </div>
        </Link>
      </div>
    </nav>
  );
};

export default Navbar;
