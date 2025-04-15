import ProductCard from "./ProductCard";
import { useState, useEffect, useCallback } from "react";
import debounce from "lodash.debounce";

const products = [
  {
    id: 1,
    img: "./Images/IPhone-16.png",
    category: "Smartphones",
    title: "iPhone 16",
    price: 799.99,
  },
  {
    id: 2,
    img: "./Images/S25.png",
    category: "Smartphones",
    title: "Samsung Galaxy S25",
    price: 999.99,
  },
  {
    id: 3,
    img: "./Images/Google-Pixel.png",
    category: "Smartphones",
    title: "Google Pixel 6",
    price: 599.99,
  },
  {
    id: 4,
    img: "./Images/One-Plus.png",
    category: "Smartphones",
    title: "OnePlus 9",
    price: 729.99,
  },
  {
    id: 5,
    img: "./Images/smartwatch.png",
    category: "Smartwatch",
    title: "noise-watch",
    price: 749.99,
  },
  {
    id: 6,
    img: "./Images/speaker.png",
    category: "Speaker",
    title: "JBL speaker",
    price: 899.99,
  },
  {
    id: 7,
    img: "/Images/smartwatch2.png",
    category: "Smartwatch",
    title: "apple smartwatch",
    price: 899.99,
  },
  {
    id: 8,
    img: "./Images/headphone.png",
    category: "headphone",
    title: "apple headphone",
    price: 899.99,
  },
];

const TrendingProduct = ({ searchQuery }) => {
  const [filteredProducts, setFilteredProducts] = useState(products);

  const handleSearchDebounced = useCallback(
    debounce((query) => {
      if (query.trim()) {
        const filtered = products.filter((product) =>
          product.title.toLowerCase().includes(query.toLowerCase())
        );

        setFilteredProducts(filtered);
      } else {
        setFilteredProducts(products);
      }
    }, 500),

    []
  );

  useEffect(() => {
    handleSearchDebounced(searchQuery);
  }, [searchQuery, handleSearchDebounced]);

  return (
    <div className="container mt-32">
      <div className="sm:flex justify-between items-center">
        <h2 className="text-4xl font-medium">Trending Products</h2>

        <div className="text-gray-500 flex gap-4 text-xl mt-4 sm:mt-0">
          <div className="text-black">New</div>

          <div>Featured</div>

          <div>Top Seller</div>
        </div>
      </div>

      <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 mt-8">
        {filteredProducts.map((item) => (
          <ProductCard
            key={item.id}
            id={item.id}
            img={item.img}
            category={item.category}
            title={item.title}
            price={item.price}
          />
        ))}
      </div>
    </div>
  );
};

export default TrendingProduct;
