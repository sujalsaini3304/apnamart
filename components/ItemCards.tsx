import React from "react";

const products = [
  {
    id: 1,
    name: "Noise Smartwatch",
    price: 2999,
    originalPrice: 4999,
    discount: "40% off",
    rating: 4.3,
    image: "/watch.jpeg",
  },
  {
    id: 2,
    name: "Boat Rockerz Headphones",
    price: 1499,
    originalPrice: 2999,
    discount: "50% off",
    rating: 4.1,
    image: "/boat-headphone.jpeg",
  },
  {
    id: 3,
    name: "Nike Running Shoes",
    price: 3999,
    originalPrice: 6999,
    discount: "42% off",
    rating: 4.5,
    image: "/nike-shoes.jpeg",
  },
  {
    id: 4,
    name: "Laptop Backpack",
    price: 999,
    originalPrice: 1999,
    discount: "50% off",
    rating: 4.0,
    image: "/Laptop-bag.jpeg",
  },
  {
    id: 5,
    name: "Nescafe",
    price: 999,
    originalPrice: 1999,
    discount: "50% off",
    rating: 4.0,
    image: "/nescafe-powder.jpeg",
  },
];

export default function ItemCards() {
  return (
    <div className="bg-white min-h-screen p-4 font-sans">
      <div className="max-w-7xl mx-auto">

        {/* Section heading — matches navbar brand weight */}
        <h1 className="text-xl sm:text-2xl font-semibold tracking-tight text-gray-900 mb-4">
          Trending Products
        </h1>

        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-3 sm:gap-4">
          {products.map((product) => (
            <div
              key={product.id}
              className="bg-white border border-gray-100 rounded-lg hover:shadow-md hover:border-gray-200 transition-all duration-200 cursor-pointer overflow-hidden group"
            >
              {/* Image */}
              <div className="relative aspect-square bg-gray-50 flex items-center justify-center overflow-hidden">
                <img
                  src={product.image}
                  alt={product.name}
                  className="max-h-full max-w-full object-contain p-3 group-hover:scale-105 transition-transform duration-200"
                />

                {/* Discount badge — matches navbar sign-out pill style */}
                <span className="absolute top-2 left-2 bg-red-500 text-white text-[10px] font-medium px-1.5 py-0.5 rounded-md tracking-wide">
                  {product.discount}
                </span>
              </div>

              {/* Details */}
              <div className="p-2.5">
                <h2 className="text-sm font-medium text-gray-800 leading-snug line-clamp-2">
                  {product.name}
                </h2>

                {/* Rating */}
                <div className="flex items-center mt-1.5">
                  <span className="inline-flex items-center gap-0.5 bg-green-600 text-white text-[11px] font-medium px-1.5 py-0.5 rounded-md">
                    {product.rating} ★
                  </span>
                </div>

                {/* Price */}
                <div className="flex items-baseline gap-1.5 mt-1.5">
                  <span className="text-base font-semibold text-gray-900 tracking-tight">
                    ₹{product.price.toLocaleString("en-IN")}
                  </span>
                  <span className="text-xs text-gray-400 line-through">
                    ₹{product.originalPrice.toLocaleString("en-IN")}
                  </span>
                </div>

                {/* Delivery */}
                <p className="text-[11px] text-gray-400 font-medium mt-1">
                  Free delivery
                </p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}