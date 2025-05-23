import { useAppSelector } from "../redux/hooks";
import { RxCross1 } from "react-icons/rx";
import { useDispatch } from "react-redux";
import { ClearCart } from "../redux/features/cartSlice";
import axios from "axios";
import CartProduct from "./CartProduct";
import toast from "react-hot-toast";

const backendUrl = "https://react-redux-ecommerce-7.onrender.com";

const Cart = ({ setShowCart }) => {
  const products = useAppSelector((state) => state.cartReducer);

  const dispatch = useDispatch();

  const getTotal = () => {
    let total = 0;

    products.forEach((item) => (total = total + item.price * item.quantity));

    return parseFloat(total.toFixed(2));
  };

  const handleClearCart = async () => {
    const user = JSON.parse(localStorage.getItem("user"));

    const userEmail = user?.email;

    try {
      const res = await axios.delete(`${backendUrl}/api/cart/clear`, {
        data: { userEmail },
      });

      if (res.status === 200) {
        toast.success("cart & Account deleted");
        dispatch(ClearCart());
        localStorage.removeItem("cart");
      }
    } catch (err) {
      console.error("error clearing cart &  deleting user", err);
      toast.error("failed to delete");
    }
  };

  return (
    <div className="bg-[#0000007d] w-full min-h-screen fixed left-0 top-0 z-20 overflow-y-scroll">
      <div className="max-w-[400px] w-full min-h-full bg-white absolute right-0 top-0 p-6">
        <RxCross1
          className="absolute right-0 top-0 m-6 text-[24px] cursor-pointer"
          onClick={() => setShowCart(false)}
        />

        <h3 className="pt-6 text-lg font-medium text-gray-600 uppercase">
          Your Cart
        </h3>

        <div className="mt-6 space-y-2">
          {products?.map((item) => (
            <CartProduct
              key={item.id}
              id={item.id}
              img={item.img}
              title={item.title}
              price={item.price}
              quantity={item.quantity}
            />
          ))}
        </div>

        <div className="flex justify-between items-center font-medium text-xl py-4">
          <p>Total:</p>
          <p>${getTotal()}</p>
        </div>

        <button
          className="bg-black text-white text-center  w-full rounded-3xl py-2 hover:bg-accent"
          onClick={handleClearCart}
        >
          Clear Cart & Delete Account
        </button>

        <button className="bg-black text-white text-center w-full rounded-3xl py-2 hover:bg-accent mb-4 mt-4">
          View Cart
        </button>

        <button className="bg-black text-white text-center  w-full rounded-3xl py-2 hover:bg-accent">
          CheckOut
        </button>
      </div>
    </div>
  );
};

export default Cart;
