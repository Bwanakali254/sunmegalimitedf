import React, { useContext, useState, useMemo } from "react";
import { ShopContext } from "../context/ShopContext";
import { assets } from "../assets/assets";
import Title from "../components/Title";
import ProductItem from "../components/ProductItem";

const Collection = () => {
  const { products, search } = useContext(ShopContext);
  const [showFilter, setShowFilter] = useState(false);
  const [category, setCategory] = useState(""); // single select
  const [sort, setSort] = useState("newest");

  const toggleCategory = (value) => {
    if (category === value) {
      setCategory(""); // unselect if same
    } else {
      setCategory(value); // replace
    }
  };

  const filterProducts = useMemo(() => {
    let filtered = products;

    if (search.trim()) {
      filtered = filtered.filter(
        (product) =>
          product.name.toLowerCase().includes(search.toLowerCase()) ||
          product.description.toLowerCase().includes(search.toLowerCase())
      );
    }

    if (category) {
      filtered = filtered.filter(
        (product) =>
          product.category.toLowerCase().replace(/\s+/g, "-") === category
      );
    }

    const sorted = [...filtered].sort((a, b) => {
      switch (sort) {
        case "newest":
          return new Date(b.createdAt) - new Date(a.createdAt);
        case "oldest":
          return new Date(a.createdAt) - new Date(b.createdAt);
        case "price-low-to-high":
          return parseInt(a.price) - parseInt(b.price);
        case "price-high-to-low":
          return parseInt(b.price) - parseInt(a.price);
        default:
          return 0;
      }
    });

    return sorted;
  }, [products, search, category, sort]);

  const categories = [
    { label: "Batteries", value: "batteries" },
    { label: "Controllers", value: "controllers" },
    { label: "Converters", value: "converters" },
    { label: "Energy Storage Systems", value: "energy-storage-systems" },
    { label: "Inverters", value: "inverters" },
    { label: "Portable Power", value: "portable-power" },
  ];

  return (
    <div className="flex flex-col sm:flex-row gap-1 sm:gap-10 pt-10 border-t">
      {/* Filters */}
      <div className="min-w-60">
        <p
          onClick={() => setShowFilter(!showFilter)}
          className="my-2 text-xl flex items-center cursor-pointer gap-2"
        >
          Filters
          <img
            className={`h-3 sm:hidden ${showFilter ? "rotate-90" : ""}`}
            src={assets.dropdownIcon}
            alt="dropdown"
          />
        </p>

        {/* Category Filter - Single Select */}
        <div
          className={`mt-6 border border-green-300 rounded-lg p-3 bg-white ${
            showFilter ? "" : "hidden"
          } sm:block`}
        >
          <p className="mb-3 text-sm font-semibold text-gray-800">Category</p>

          <div className="flex flex-col gap-2">
            {categories.map((item) => {
              const active = category === item.value;

              return (
                <button
                  key={item.value}
                  onClick={() => toggleCategory(item.value)}
                  className={`text-left px-4 py-2 rounded-md border transition
                    ${
                      active
                        ? "bg-green-600 text-white border-green-600"
                        : "bg-white text-gray-700 border-gray-200 hover:border-green-400"
                    }`}
                >
                  {item.label}
                </button>
              );
            })}
          </div>
        </div>
      </div>

      {/* Right side */}
      <div className="flex-1">
        <div className="flex justify-between test-base sm:text-2xl mb-4">
          <Title text1={"ALL"} text2={"PRODUCTS"} />
          <select
            className="border-2 border-green-500 text-sm px-2"
            value={sort}
            onChange={(e) => setSort(e.target.value)}
          >
            <option value="price-low-to-high">Price: Low to High</option>
            <option value="price-high-to-low">Price: High to Low</option>
          </select>
        </div>

        {/* Products */}
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 gap-y-6">
          {filterProducts.map((Item, index) => (
            <ProductItem
              key={index}
              id={Item._id}
              name={Item.name}
              price={Item.price}
              image={Item.image}
            />
          ))}
        </div>
      </div>
    </div>
  );
};

export default Collection;
