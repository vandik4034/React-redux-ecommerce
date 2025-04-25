import ProductCard from "./ProductCard";

const products = [
    {
      id: 1,
      img: "./Images/newlaptop.png",
      category: "laptop",
      title: "accer gaming laptop",
      price: 799.99
    },
    {
      id: 2,
      img: "./Images/news25ultr.png",
      category: "Smartphones",
      title: "Samsung Galaxy S25 ultra",
      price: 999.99
    },
    {
      id: 3,
      img: "./Images/newspeaker.png",
      category: "Speaker",
      title: "apple speaker",
      price: 599.99
    },
    {
      id: 4,
      img: "./Images/newtv.png",
      category: "televison",
      title: "samsung Qled TV",
      price: 729.99
    }, 

  ];
  

  

const NewArrival = () => {
  return (
    <div className="container mt-16">
        
        <div className="sm:flex justify-between items-center">

            <h2 className="text-4xl font-medium">New Arrival</h2>

            
        </div>

        <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 mt-8">

            {
                products.map((item) => (

                    <ProductCard key={item.id} id={item.id} img={item.img} category={item.category} title={item.title} price={item.price} />
                ))
            }
        </div>

      
    </div>
  )
}

export default NewArrival
 