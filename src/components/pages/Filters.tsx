import React from "react";
import useStore from "../store/store";

const Filters: React.FC = () => {
  const { filters, setFilters, applyFilters } = useStore();

  const handleLikedChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setFilters({ liked: event.target.checked });
    applyFilters();
  };

  const handlePriceChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const [min, max] = event.target.value.split(",").map(Number);
    setFilters({ priceRange: [min, max] });
    applyFilters();
  };

  const handleSearchChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setFilters({ searchQuery: event.target.value });
    applyFilters();
  };

  return (
    <div className="space-y-4">
      <div>
        <label>
          <input
            type="checkbox"
            checked={filters.liked}
            onChange={handleLikedChange}
          />
          Show only liked
        </label>
      </div>
      <div>
        <label>
          Price Range:
          <input
            type="text"
            defaultValue={`${filters.priceRange[0]},${filters.priceRange[1]}`}
            onChange={handlePriceChange}
            placeholder="Min,Max"
          />
        </label>
      </div>
      <div>
        <label>
          Search:
          <input
            type="text"
            value={filters.searchQuery}
            onChange={handleSearchChange}
            placeholder="Search products"
          />
        </label>
      </div>
    </div>
  );
};

export default Filters;
