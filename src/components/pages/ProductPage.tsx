import React from "react";
import { useParams, Link } from "react-router-dom";
import useStore from "../store/store";

const ProductPage: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const { products } = useStore();
  const product = products.find((p) => p.id.toString() === id);

  if (!product) return <div>Product Not found</div>;

  return (
    <div className="p-4">
      <img
        src={product.image}
        alt={product.title}
        className="w-64 h-64 object-cover"
      />
      <h2 className="text-2xl font-bold">{product.title}</h2>
      <p className="block">{product.description}</p>
      <p className="text-lg font-semibold">${product.price}</p>
      <Link to="/products" className="text-blue-500">
        Back to Products
      </Link>
    </div>
  );
};

export default ProductPage;
