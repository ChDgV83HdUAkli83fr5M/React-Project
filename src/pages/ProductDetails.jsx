import React, { useContext, useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import { ProductContext } from "../contexts/ProductContext.jsx";
import { CartContext } from "../contexts/CartContext.jsx";

const ProductDetails = () => {
  const { id } = useParams();  // Get the product ID from the URL
  const { addToCart } = useContext(CartContext); // Get the addToCart function from context
  const [product, setProduct] = useState(null); // Store the product details
  const [loading, setLoading] = useState(true); // Loading state
  const [error, setError] = useState(null); // Error state

  useEffect(() => {
    // Fetch the product data based on the id
	
    const fetchProduct = async () => {
      try {
        const response = await fetch(`https://fakestoreapi.com/products/${id}`);
        if (!response.ok) {
          throw new Error("Product not found");
        }
        const data = await response.json();
        setProduct(data);
        setLoading(false);
      } catch (error) {
        setError(error.message);
        setLoading(false);
      }
    };

    fetchProduct();
  }, [id]);

  // If the product is still loading
  if (loading) {
    return (
      <section className="h-screen flex justify-center items-center">
        Loading...
      </section>
    );
  }

  // If there's an error (e.g., product not found)
  if (error) {
    return (
      <section className="h-screen flex justify-center items-center">
        <div className="text-xl text-gray-800">{error}</div>
      </section>
    );
  }

  // Destructure the product details
  const { title, price, description, image } = product;

  return (
    <section className="pt-[450px] md:pt-32 pb-[400px] md:pb-12 lg:py-32 h-screen flex items-center" data-testid="product-details">
      <div className="container mx-auto">
        <div className="flex flex-col lg:flex-row items-center">
          {/* Image */}
          <div className="flex flex-1 justify-center items-center mb-8 lg:mb-0">
            <img className="max-w-[200px] lg:max-w-xs" src={image} alt={title} />
          </div>

          {/* Text */}
          <div className="flex-1 text-center lg:text-left">
            <h1 className="text-[26px] font-medium mb-2 max-w-[450px] mx-auto lg:mx-0">{title}</h1>
            <div className="text-2xl text-red-500 font-medium mb-6">
              $ {price}
            </div>
            <p className="mb-8">{description}</p>
            <button
              onClick={() => addToCart(product, product.id)}
              className="bg-black py-4 px-8 text-white hover:bg-gray-800 transition duration-300"
            >
              Add to cart
            </button>
          </div>
        </div>
      </div>
    </section>
  );
};

export default ProductDetails;
