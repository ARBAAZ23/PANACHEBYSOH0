import React, { useContext, useEffect, useState } from "react";
import { ShopContext } from "../contexts/ShopContext";
import Title from "./Title";
import ProductItem from "./ProductItem";

const LatestCollection = () => {
  const { products } = useContext(ShopContext);
  // console.log(products);
  const [LatestProduct, setLatestProduct] = useState([]);

  useEffect(() => {
    setLatestProduct(products.slice(0, 10));
  }, []);

  return (
    <div className="my-10">
      <div className="text-center py-8 text-3xl">
        <Title text1={"LATEST "} text2={" COLLECTIONS"} />
        <p className="w-3/4 m-auto text-xs sm:text-sm md:text-base text-gray-600">
          Discover our new arrivals in women's fashion, showcasing the latest
          trends and styles in ladies' wear. From elegant dresses to chic
          everyday outfits, this fresh collection for women is designed to
          elevate your wardrobe. Explore our modern looks and must-have pieces,
          perfect for any occasion. Whether you're updating your closet or
          looking for something bold and new, our trending outfits for women
          bring you the best of the season in one place.
        </p>
      </div>
      {/*Renderin the Products   */}
      <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-4 gap-y-6">
        {
          LatestProduct.map((item,index)=>(
            <ProductItem key={index} id={item._id} image={item.image} name={item.name} price={item.price}/>
          ))
        }
      </div>
    </div>
  );
};

export default LatestCollection;
