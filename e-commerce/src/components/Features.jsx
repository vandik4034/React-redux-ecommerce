import { TbTruckDelivery } from "react-icons/tb";
import { RiRefund2Line } from "react-icons/ri";
import { RiDiscountPercentFill } from "react-icons/ri";
import { MdOutlineSupportAgent } from "react-icons/md";
import FeatureCard from "./FeatureCard";


const data = [
    {
        icon: <TbTruckDelivery className="text-4xl" />,
        title: "Free Delivery",
        desc: "Orders from all item"

    },

    {
        icon: <RiRefund2Line className="text-4xl"/>,
        title: "Return & Refund",
        desc: "Money back guarantee"

    },

    {
        icon: <RiDiscountPercentFill className="text-4xl"/>,
        title: "Membar Discount",
        desc: "on order over $99.00"

    },

    {
        icon: <MdOutlineSupportAgent className="text-4xl"/>,
        title: "Support 24/7",
        desc: "contact us 24 Hours a day"

    },
];


const Features = () => {

    return (
        <div className="container grid gap-1 sm:grid-cols-2 lg:grid-cols-4 mt-8">
            {
                data.map((item) => (

                <FeatureCard key={item.title} icon={item.icon} title={item.title} desc={item.desc}/>
            ))
            }
        </div>
    )
}

export default Features
