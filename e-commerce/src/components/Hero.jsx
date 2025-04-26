

const Hero = ({onShopNowClick}) =>  {
  return(
   <div className="bg-gray-900 mt-0">

    <div className="container grid md:grid-cols-2 py-8">
        <div className="flex items-center">

            <div className="max-w-[450px] space-y-4">
            <p className="text-gray-300">
                Starting  At <span className="font-bold">$999.00</span>
            </p>
            <h2 className="text-gray-400 font-bold text-4xl md:text-5xl">
                The best note book collection 2025
            </h2>
            <h3 className="text-2xl text-gray-300 font-['oregano,cursive ']">
                Exclusive offer <span className="text-red-600">-10%</span> off this week
            </h3>

            <button
              onClick={onShopNowClick}
              className="bg-yellow-600 rounded-md px-6 py-3 hover:bg-yellow- hover:text-black"
            >
              Shop Now
            </button>
            </div>
        </div>

        <div>
            <img className="ml-auto" src="/Hero.png" alt="hero image"></img>
        </div> 

    </div>
  </div>
  )
};

export default Hero
