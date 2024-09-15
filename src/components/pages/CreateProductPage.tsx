import { useState } from "react";
import useStore from "../store/store";
import { useNavigate } from "react-router-dom";
const CreateProductPage = () => {
  const { addProduct } = useStore();
  const navigate = useNavigate();

  const [title, setTitle] = useState("");
  const [image, setImage] = useState("");
  const [description, setDescription] = useState("");
  const [price, setPrice] = useState(0);
  const [errors, setErrors] = useState<{ [key: string]: string }>({});

  const handleSubmit = () => {
    const newErrors: { [key: string]: string } = {};
    if (!title) newErrors.title = "Title is required";
    if (!image) newErrors.image = "Image URL is required";
    if (!description) newErrors.description = "Description is required";
    if (price <= 0) newErrors.price = "Price must be greater than 0";

    if (Object.keys(newErrors).length > 0) {
      setErrors(newErrors);
      return;
    }
    addProduct({
      id: Date.now(),
      title,
      image,
      description,
      price,
      liked: false,
      category: "",
    });
    navigate("/products");
  };
  const handleCancel = () => {
    navigate("/products");
  };
  return (
    <div>
      <div>
        <h2>Create Product</h2>
        <div>
          <label htmlFor="">Title</label>
          <input
            type="text"
            value={title}
            onChange={(event) => setTitle(event.target.value)}
          />
          {errors.title && <p>{errors.title}</p>}
        </div>
        <div>
          <label htmlFor="">Image URL</label>
          <input
            type="text"
            value={image}
            onChange={(event) => setImage(event.target.value)}
          />
          {errors.image && <p>{errors.image}</p>}
        </div>
        <div>
          <label htmlFor="">Description</label>
          <textarea
            value={description}
            onChange={(event) => setDescription(event.target.value)}
          />
          {errors.description && <p>{errors.description}</p>}
        </div>
        <div>
          <label htmlFor="">Price</label>
          <input
            type="number"
            value={price}
            onChange={(event) => setPrice(parseFloat(event.target.value))}
          />
          {errors.price && <p>{errors.price}</p>}
        </div>
      </div>
      <button
        onClick={handleSubmit}
        className="mr-10 w-auto bg-slate-500 rounded-xl"
      >
        Create Product
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

export default CreateProductPage;
