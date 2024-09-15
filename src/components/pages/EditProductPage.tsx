import { useState, useEffect } from "react";
import useStore from "../store/store";
import { useParams, useNavigate } from "react-router-dom";

const EditProductPage: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const { products, setProducts } = useStore();
  const navigate = useNavigate();
  const product = products.find((p) => p.id.toString() === id);

  const [title, setTitle] = useState("");
  const [image, setImage] = useState("");
  const [description, setDescription] = useState("");
  const [price, setPrice] = useState(0);

  useEffect(() => {
    if (product) {
      setTitle(product.title);
      setImage(product.image);
      setDescription(product.description);
      setPrice(product.price);
    }
  }, [product]);

  const handleSubmit = () => {
    if (product) {
      const updatedProduct = { ...product, title, image, description, print };
      setProducts(
        products.map((p) => (p.id === product.id ? updatedProduct : p))
      );
      navigate("/products");
    }
  };
  const handleCancel = () => {
    navigate("/products");
  };

  return (
    <div className="p-4 space-y-4">
      <h2 className="text-2xl font-bold">Edit Product</h2>
      <div>
        <label className="block">Title</label>
        <input
          type="text"
          className="border p-2 rounded w-full"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
        />
      </div>
      <div>
        {" "}
        <label className="block">Image URL</label>
        <input
          type="text"
          value={image}
          className="border p-2 rounded w-full"
          onChange={(e) => setImage(e.target.value)}
        />
      </div>
      <div>
        {" "}
        <label className="block">Description</label>
        <input
          type="text"
          className="border p-2 rounded w-full"
          value={description}
          onChange={(e) => setDescription(e.target.value)}
        />
      </div>
      <div>
        {" "}
        <label htmlFor="">Price</label>
        <input
          type="text"
          value={price}
          onChange={(e) => setPrice(parseFloat(e.target.value))}
        />
      </div>
      <button
        onClick={handleSubmit}
        className="bg-blue-500 text-white px-4 py-2 rounded mr-10"
      >
        Save Changes
      </button>
      <button
        onClick={handleCancel}
        className="bg-gray-500 text-white border border-black"
      >
        Cancel
      </button>
    </div>
  );
};

export default EditProductPage;
