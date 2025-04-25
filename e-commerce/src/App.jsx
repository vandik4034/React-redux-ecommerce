import { Provider } from "react-redux";

import { store } from "./redux/Store";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import Navbar from "./components/Navbar";
import Hero from "./components/Hero";
import Features from "./components/Features";

import TrendingProduct from "./components/TrendingProduct";
import { Toaster } from "react-hot-toast";

import Banner from "./components/Banner";
import NewArrival from "./components/NewArrival";
import Footer from "./components/Footer";
import Cart from "./components/Cart";
import { useEffect, useState } from "react";
import LoginForm from "./components/LoginForm";
import SignUp from "./components/Signup";
import { useRef } from "react";


const App = () => {
  const [user, setUser] = useState(null);

  const [showCart, setShowCart] = useState(false);

  const [searchQuery, setSearchQuery] = useState("");

  const trendingRef = useRef(null);

  const scrollToTrending = () => {

    trendingRef.current?.scrollIntoView({ behavior: "smooth"});
  };

  useEffect(() => {
    const storedUser = localStorage.getItem("user");
    if (storedUser) {
      setUser(JSON.parse(storedUser));
    }
  }, []);

  const handleSearch = (query) => {
    console.log("Search query updated:", query);

    setSearchQuery(query);
  };

  const handleLoginSuccess = (user) => {
    setUser(user);
    localStorage.setItem("user", JSON.stringify(user));
  };

  return (
    <Router>
      <Provider store={store}>
        <Navbar
          setShowCart={setShowCart}
          onSearch={handleSearch}
          handleLoginSuccess={handleLoginSuccess}
          user={user}
          setUser={setUser}
        />
        {showCart && <Cart setShowCart={setShowCart} />}

        <Routes>
          <Route
            path="/"
            element={
              <>
                <Hero onShopNowClick={scrollToTrending}/>
                <Features />
                
                <TrendingProduct searchQuery={searchQuery} ref={trendingRef}/>
                
                <Banner />
                <NewArrival />

                <Footer />
              </>
            }
          />
          <Route
            path="/login"
            element={<LoginForm onLoginSuccess={handleLoginSuccess} />}
          />
          <Route path="/signup" element={<SignUp />} />
        </Routes>
        <Toaster position="bottom-center" />
       
      </Provider>
    </Router>
  );
};

export default App;
