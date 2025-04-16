

const Hero = ({onShopNowClick}) =>  {
  return(
   <div className="bg-slate-400 mt-4">

    <div className="container grid md:grid-cols-2 py-8">
        <div className="flex items-center">

            <div className="max-w-[450px] space-y-4">
            <p className="text-topHeadingSecondary">
                Starting  At <span className="font-bold">$999.00</span>
            </p>
            <h2 className="text-topHeadingPrimary font-bold text-4xl md:text-5xl">
                The best note book collection 2025
            </h2>
            <h3 className="text-2xl font-['oregano,cursive ']">
                Exclusive offer <span className="text-red-600">-10%</span> off this week
            </h3>

            <button
              onClick={onShopNowClick}
              className="bg-white rounded-md px-6 py-3 hover:bg-accent hover:text-white"
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
