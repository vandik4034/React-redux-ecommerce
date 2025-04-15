import { useDispatch } from "react-redux";
import {
  removeFromCart,
  incrementQuantity,
  decrementQuantity,
} from "../redux/features/cartSlice";
import { RxCross1 } from "react-icons/rx";
import axios from "axios";
import toast from "react-hot-toast";

const CartProduct = ({ id, img, title, price, quantity }) => {
  const dispatch = useDispatch();

  const handleIncrement = async () => {
    const user = JSON.parse(localStorage.getItem("user"));

    const newQuantity = quantity + 1;

    dispatch(incrementQuantity(id));
    try {
      await axios.put("http://localhost:5000/api/cart", {
        userEmail: user?.email,
        id,
        price,

        quantity: newQuantity,
      });

      toast.success("quantity increased");
    } catch (err) {
      console.error("increment error:", err);
      toast.error("failed to increase quantity");
    }
  };

  const handleDecrement = async () => {
    const user = JSON.parse(localStorage.getItem("user"));

    const newQuantity = quantity - 1;
    dispatch(decrementQuantity(id));

    try {
      await axios.put("http://localhost:5000/api/cart", {
        userEmail: user?.email,
        id,
        price,

        quantity: newQuantity,
      });
      toast.success("quantity decresed");
    } catch (err) {
      console.error("decrement error:", err);
      toast.error("failed to decrese quantity");
    }
  };

  const handleDelete = async () => {
    const user = JSON.parse(localStorage.getItem("user"));

    dispatch(removeFromCart(id));

    try {
      await axios.delete("http://localhost:5000/api/cart", {
        data: {
          userEmail: user?.email,
          id,
        },
      });
      toast.success("Item deleted from cart");
    } catch (err) {
      console.error("Delete error:", err);
      toast.error("Failed to delete item");
    }
  };

  return (
    <div className="flex justify-between items-center">
      <div className="flex items-center gap-4 ">
        <img className="h-[80px]" src={img} alt={title} />

        <div className="space-y-2">
          <h3 className="font-medium">{title}</h3>

          <p className="text-gray-600 text-[14px]">
            {quantity} X ${price}
          </p>

          <div>
            <button
              className="px-3 py-1 bg-blue-500 text-white rounded hover:bg-blue-600"
              onClick={handleDecrement}
            >
              {" "}
              -
            </button>
            <span className="mx-2">{quantity}</span>
            <button
              className="px-3 py-1 bg-blue-500 text-white rounded hover:bg-blue-600"
              onClick={handleIncrement}
            >
              {" "}
              +
            </button>
          </div>
        </div>
      </div>

      <RxCross1 className="cursor-pointer" onClick={handleDelete} />
    </div>
  );
};

export default CartProduct;
