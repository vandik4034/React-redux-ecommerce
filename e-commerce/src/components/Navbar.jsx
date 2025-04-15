import { useEffect, useState, useCallback } from "react";
import { FaSearch } from "react-icons/fa";
import { FaRegUserCircle } from "react-icons/fa";
import { FaShoppingCart } from "react-icons/fa";
import { useAppSelector } from "../redux/hooks";
import { Link, useNavigate } from "react-router-dom";
import debounce from "lodash.debounce";

import { Navigate } from "react-router-dom";

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

  {
    id: 9,
    img: "./Images/newlaptop.png",
    category: "laptop",
    title: "accer gaming laptop",
    price: 799.99
  },
  {
    id: 10,
    img: "./Images/news25ultr.png",
    category: "Smartphones",
    title: "Samsung Galaxy S25 ultra",
    price: 999.99
  },
  {
    id: 11,
    img: "./Images/newspeaker.png",
    category: "Speaker",
    title: "apple speaker",
    price: 599.99
  },
  {
    id: 12,
    img: "./Images/newtv.png",
    category: "televison",
    title: "samsung Qled TV",
    price: 729.99
  }, 
];

const Navbar = ({ setShowCart, onSearch, user, setUser }) => {
  const [term, setTerm] = useState("");
  const [showDropdown, setShowDropdown] = useState(false);
  const [filteredProducts, setFilteredProducts] = useState([]);
  const cartCount = useAppSelector((state) => state.cartReducer.length);
  const navigate = useNavigate();

  useEffect(() => {
    const storedUser = localStorage.getItem("user");

    if (storedUser) {
      
    }
  }, []);

  const handleLogout = () => {
    localStorage.removeItem("user");
    setUser(null);
    navigate("/"); 
  };

  const handleSearchDebounced = useCallback(
    debounce((query) => {
      console.log("search triggered with term:", query);

      if (query.trim()) {
        const filtered = products.filter((product) =>
          product.title.toLowerCase().includes(query.toLowerCase())
        );

        setFilteredProducts(filtered);
        setShowDropdown(true);
      } else {
        setFilteredProducts(products);
        setShowDropdown(false);
      }
    }, 500),
    []
  );

  const handleSearchInput = (e) => {
    setTerm(e.target.value);
    handleSearchDebounced(e.target.value);
  };

  const handleSuggestionClick = (product) => {
    setTerm(product.title);
    onSearch(product.title);
    setFilteredProducts([]);
    setShowDropdown(false);
  };

  return (
    <div className="pt-4 bg-yellow-600 top-0 sticky">
      <div className="container">
        <div className="flex justify-between items-center">
          <Link to={'/'} className="text-4xl font-bold text-blue-950">Logo</Link>

          <div className=" relative lg:flex hidden w-full max-w-[500px]">
            <input
              className="border-2 border-blue-950 rounded-3xl px-6 py-2 w-full pr-12"
              value={term}
              onChange={handleSearchInput}
              type="text"
              placeholder="Search for products..."
            />

            <button onClick={onSearch} className=" absolute right-4 top-1/2 -translate-y-1/2  text-black text-[26px] grid place-items-center px-4">
              <FaSearch />
            </button>

            {showDropdown && filteredProducts.length > 0 && (
              <div className="lg:flex hidden w-full max-w-[500px] absolute text-cyan-50 bg-slate-900 hover:bg-slate-100 hover:text-slate-900 rounded-md z-10 mt-12">
                <ul>
                  {filteredProducts.map((product) => (
                    <li
                      key={product.id}
                      className="px-4 py-2 hover:bg-gray-100 cursor-pointer"
                      onClick={() => handleSuggestionClick(product)}
                    >
                      {product.title}
                    </li>
                  ))}
                </ul>
              </div>
            )}
          </div>

          <div className="flex gap-4 md:gap-8 items-center">
            {user ? (
              <div className="md:flex gap-3 items-center hidden">
                <div className="rounded-full border-2 border-gray-300 text-gray-500 text-[32px] w-[50px] h-[50px] grid place-items-center">
                  <FaRegUserCircle />
                </div>
                <div>
                  <p className="text-slate-950">Welcome, {user.email}</p>
                  <p className="font-bold">Your Account</p>
                </div>
                <button
                  onClick={handleLogout}
                  className="bg-red-500 text-white px-4 py-1 rounded hover:bg-red-600 transition"
                >
                  Logout
                </button>
              </div>
            ) : (
              <div className="flex gap-3">
                <Link to="/login">
                  <div className="rounded-full border-2 border-gray-300 text-gray-500 text-[32px] w-[50px] h-[50px] grid place-items-center">
                    <FaRegUserCircle />
                  </div>
                  <p className="text-gray-600">Hello, Sign In</p>
                </Link>
                <Link to="/signup">
                  <div className="rounded-full border-2 border-gray-300 text-gray-500 text-[32px] w-[50px] h-[50px] grid place-items-center">
                    <FaRegUserCircle />
                  </div>
                  <p className="text-gray-600">Sign Up</p>
                </Link>
              </div>
            )}

            <div
              className="text-gray-500 text-[32px] relative"
              onClick={() => setShowCart(true)}
            >
              <FaShoppingCart />
              <div className="absolute top-[-15px] right-[-10px] bg-red-600 w-[25px] h-[25px] rounded-full text-white text-[14px] grid place-items-center">
                {cartCount}
              </div>
            </div>
          </div>
        </div>

        <div className="border-b border-gray-200 pt-4"></div>
      </div>
    </div>
  );
};

export default Navbar;
