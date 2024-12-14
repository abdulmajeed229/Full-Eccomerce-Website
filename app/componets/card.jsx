"use client";
import { useState, useEffect } from "react";
import { db } from "../lib/firebase";
import { collection, getDocs } from "firebase/firestore";
import Link from "next/link";
import { Heart, Star } from "lucide-react";

export default function ProductCard() {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const querySnapshot = await getDocs(collection(db, "products"));
        const productsList = querySnapshot.docs.map((doc) => ({
          id: doc.id,
          ...doc.data(),
        }));
        setProducts(productsList);
      } catch (err) {
        setError("Error fetching products");
      } finally {
        setLoading(false);
      }
    };

    fetchProducts();
  }, []);

  if (loading)
    return <div className="text-center text-lg font-semibold">Loading...</div>;
  if (error) return <div className="text-center text-red-500">{error}</div>;

  return (

    <>
<div className="font-[sans-serif] p-4 mx-auto lg:max-w-7xl sm:max-w-full">
  <h2 className="text-4xl font-extrabold text-gray-800 mb-12">Our Products</h2>
  <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 max-xl:gap-4 gap-6">
    {products.map((product) => (
      <div
        key={product.id}
        className="bg-white rounded-2xl p-5 cursor-pointer hover:-translate-y-2 transition-all relative"
      >
        <div className="absolute top-4 right-4 flex space-x-2">
          <Heart className="w-6 h-6 text-gray-500 hover:text-red-500 transition-colors cursor-pointer" />
        </div>

        <div className="w-5/6 h-[210px] overflow-hidden mx-auto aspect-w-16 aspect-h-8 md:mb-2 mb-4">
          <img
            src={product.imageUrl || "https://via.placeholder.com/150"}
            alt={product.title || "Product Image"}
            className="h-full w-full object-contain"
          />
        </div>

        <div>
        <h3 className="text-lg font-extrabold text-gray-800">
  {product.productName?.length > 35
    ? `${product.productName.slice(0, 35)}...`
    : product.productName || "Product Title"}
</h3>

       
          <div className="flex items-center mt-2">
            {[...Array(5)].map((_, index) => (
              <Star
                key={index}
                className={`w-5 h-5 ${
                  index < (product.rating || 3)
                    ? "text-yellow-400"
                    : "text-gray-300"
                }`}
              />
            ))}
          </div>
          <h4 className="text-lg text-gray-800 font-bold mt-4">
            ${product.price || "N/A"}
          </h4>
          <Link
            href={`/${product.id}`}
            className="mt-4 block text-center text-white bg-blue-500 px-4 py-2 rounded-full hover:bg-blue-600 transition-all"
          >
            View Product
          </Link>
        </div>
      </div>
    ))}
  </div>
</div>

    
    
    </>
    
  );
}
