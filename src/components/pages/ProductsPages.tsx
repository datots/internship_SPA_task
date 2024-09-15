import React, { useEffect, useState } from "react";
import useStore from "../store/store";
import ProductCard from "../ProductCard";
import { Link } from "react-router-dom";

const ITEMS_PER_PAGE = 4;

const ProductsPage: React.FC = () => {
  const { products, setProducts, setFilters, applyFilters } = useStore();
  const [filter, setFilter] = useState<"all" | "favorites">("all");
  const [search, setSearch] = useState("");
  const [currentPage, setCurrentPage] = useState(1);
  const [category, setCategory] = useState<
    "all" | "men's clothing" | "jewelery" | "electronics" | "women's clothing"
  >("all");
  const [priceRange, setPriceRange] = useState<"all" | [number, number]>("all");

  useEffect(() => {
    fetch("https://fakestoreapi.com/products")
      .then((res) => res.json())
      .then((data) => setProducts(data));
  }, [setProducts]);

  useEffect(() => {
    setFilters({ searchQuery: search, category, priceRange });
    applyFilters();
  }, [search, category, priceRange, setFilters, applyFilters]);

  const filteredProducts = products.filter((product) => {
    const matchesLike = filter === "all" || product.liked;
    const matchesSearch =
      product.title.toLowerCase().includes(search.toLowerCase()) ||
      product.description.toLowerCase().includes(search.toLowerCase());
    const matchesCategory = category === "all" || product.category === category;
    const matchesPrice =
      priceRange === "all" ||
      (Array.isArray(priceRange) &&
        product.price >= priceRange[0] &&
        product.price <= priceRange[1]);

    return matchesLike && matchesSearch && matchesCategory && matchesPrice;
  });

  const totalPages = Math.ceil(filteredProducts.length / ITEMS_PER_PAGE);
  const currentPageProducts = filteredProducts.slice(
    (currentPage - 1) * ITEMS_PER_PAGE,
    currentPage * ITEMS_PER_PAGE
  );

  return (
    <div className="p-4 space-y-4">
      <div className="flex flex-col sm:flex-row justify-between mb-4">
        <Link
          to="/create-product"
          className="bg-blue-500 text-white px-4 py-2 rounded mb-2 sm:mb-0"
        >
          Add Product
        </Link>
        <input
          type="text"
          placeholder="Search..."
          value={search}
          onChange={(event) => setSearch(event.target.value)}
          className="border p-2 rounded mb-2 sm:mb-0"
        />
        <div>
          <button
            onClick={() => setFilter("all")}
            className={`px-4 py-2 rounded ${filter === "all" ? "bg-blue-500 text-white" : "bg-gray-200"}`}
          >
            All
          </button>
          <button
            onClick={() => setFilter("favorites")}
            className={`px-4 py-2 rounded ${filter === "favorites" ? "bg-blue-500 text-white" : "bg-gray-200"}`}
          >
            Favorites
          </button>
          <button
            onClick={() => setCategory("all")}
            className={`px-4 py-2 rounded ${category === "all" ? "bg-blue-500 text-white" : "bg-gray-200"}`}
          >
            All Categories
          </button>
          <button
            onClick={() => setCategory("men's clothing")}
            className={`px-4 py-2 rounded ${category === "men's clothing" ? "bg-blue-500 text-white" : "bg-gray-200"}`}
          >
            Men's Clothing
          </button>
          <button
            onClick={() => setCategory("women's clothing")}
            className={`px-4 py-2 rounded ${category === "women's clothing" ? "bg-blue-500 text-white" : "bg-gray-200"}`}
          >
            Women's Clothing
          </button>
          <button
            onClick={() => setCategory("jewelery")}
            className={`px-4 py-2 rounded ${category === "jewelery" ? "bg-blue-500 text-white" : "bg-gray-200"}`}
          >
            Jewelery
          </button>
          <button
            onClick={() => setCategory("electronics")}
            className={`px-4 py-2 rounded ${category === "electronics" ? "bg-blue-500 text-white" : "bg-gray-200"}`}
          >
            Electronics
          </button>
          <button
            onClick={() => setPriceRange("all")}
            className={`px-4 py-2 rounded ${priceRange === "all" ? "bg-blue-500 text-white" : "bg-gray-200"}`}
          >
            All Prices
          </button>
          <button
            onClick={() => setPriceRange([0, 50])}
            className={`px-4 py-2 rounded ${Array.isArray(priceRange) && priceRange[1] === 50 ? "bg-blue-500 text-white" : "bg-gray-200"}`}
          >
            Low Price
          </button>
          <button
            onClick={() => setPriceRange([50, 100])}
            className={`px-4 py-2 rounded ${Array.isArray(priceRange) && priceRange[0] === 50 && priceRange[1] === 100 ? "bg-blue-500 text-white" : "bg-gray-200"}`}
          >
            Medium Price
          </button>
          <button
            onClick={() => setPriceRange([100, Infinity])}
            className={`px-4 py-2 rounded ${Array.isArray(priceRange) && priceRange[0] === 100 ? "bg-blue-500 text-white" : "bg-gray-200"}`}
          >
            High Price
          </button>
        </div>
      </div>
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
        {currentPageProducts.length === 0 ? (
          <p>No products found</p>
        ) : (
          currentPageProducts.map((product) => (
            <ProductCard key={product.id} product={product} />
          ))
        )}
      </div>
      <div className="flex justify-between mt-4">
        <button
          onClick={() => setCurrentPage((prev) => Math.max(prev - 1, 1))}
          disabled={currentPage === 1}
          className="bg-blue-500 text-white px-4 py-2 rounded"
        >
          Previous
        </button>
        <span>
          Page {currentPage} of {totalPages}
        </span>
        <button
          onClick={() =>
            setCurrentPage((prev) => Math.min(prev + 1, totalPages))
          }
          disabled={currentPage === totalPages}
          className="bg-blue-500 text-white px-4 py-2 rounded"
        >
          Next
        </button>
      </div>
    </div>
  );
};

export default ProductsPage;
