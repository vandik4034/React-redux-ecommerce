import { AiFillStar } from "react-icons/ai";
import { AiOutlineStar } from "react-icons/ai";
import { AiOutlineShopping } from "react-icons/ai";
import { useDispatch } from "react-redux";
import { addToCart } from "../redux/features/cartSlice";
import toast from "react-hot-toast";
import axios from "axios";

const backendUrl = "https://react-redux-ecommerce-7.onrender.com";

const ProductCard = ({ id, img, category, title, price }) => {
  const dispatch = useDispatch();

  const addProductToCart = async () => {
    const user = JSON.parse(localStorage.getItem("user"));
    console.log("Current logged-in user:", user);

    const payload = {
      userEmail: user?.email,
      id,
      title,
      img,
      price: parseFloat(price),
      quantity: 1,
      action: "increment"
    };

    dispatch(addToCart(payload));

    toast.success("Added to Cart");

    try {
      const response = await axios.post(
        `${backendUrl}/api/cart`,
        payload
      );
      if (response.status === 200) {
        toast.success("Product saved to database");
      }
    } catch (err) {
      console.error("Error sending to backend", err);
      toast.error("Failed to save to backend");
    }
  };

  return (
    <div className="border border-gray-300">
      <div className="text-center border-b border-gray-300">
        <img className="inline-block" src={img} alt={title} />
      </div>

      <div className="px-8 py-4">
        <p className="text-gray-500 text-[14px] font-medium">{category}</p>

        <h2 className="font-medium">{title}</h2>

        <div className="mt-3 flex text-[#ffb21d] items-center">
          <AiFillStar />
          <AiFillStar />
          <AiFillStar />
          <AiFillStar />
          <AiOutlineStar />
          <p className="text-gray-600 text-[14px] ml-2">(3 Review)</p>
        </div>

        <div className="flex justify-between items-center mt-4">
          <h2 className="font-medium text-accent text-xl">${price}</h2>

          <div
            className="flex gap-2 items-center bg-pink text-white px-4 py-2 cursor-pointer hover:bg-accent"
            onClick={addProductToCart}
          >
            <AiOutlineShopping /> Add To Cart
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProductCard;
