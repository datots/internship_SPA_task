import React from "react";
import useStore from "./store/store";
import { Link } from "react-router-dom";

interface Product {
  id: number;
  title: string;
  image: string;
  description: string;
  liked: boolean;
}

interface Props {
  product: Product;
}

const ProductCard: React.FC<Props> = ({ product }) => {
  const { toggleLike, deleteProduct } = useStore();

  return (
    <div className="border p-4 rounded-md shadow-md flex flex-col items-center space-y-2">
      <img
        src={product.image}
        alt={product.title}
        className="w-32 h-32 object-cover"
      />
      <h3 className="text-lg font-semibold truncate-text">{product.title}</h3>
      <p className="text-sm line-clamp-2 text-center text-gray-600 truncate-text">
        {product.description}
      </p>
      <div className="flex space-x-2">
        <button
          onClick={() => toggleLike(product.id)}
          aria-label={product.liked ? "Unlike" : "Like"}
        >
          <span
            className={`text-xl ${product.liked ? "text-red-500" : "text-gray-500"}`}
          >
            ❤️
          </span>
        </button>
        <button
          onClick={() => deleteProduct(product.id)}
          aria-label="Delete Product"
        >
          <span className="text-xl text-gray-500">🗑️</span>
        </button>
      </div>
      <Link to={`/products/${product.id}`} className="text-blue-500">
        View Details
      </Link>
      <Link to={`/edit-product/${product.id}`} className="text-green-500">
        Edit
      </Link>
    </div>
  );
};

export default ProductCard;
