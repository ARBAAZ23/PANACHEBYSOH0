import React, { useContext, useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { ShopContext } from "../contexts/ShopContext";
// eslint-disable-next-line no-unused-vars
import { motion } from "framer-motion";
import RelatedProduct from '../components/RelatedProduct'
import Reviews from '../components/Reviews'

const Product = () => {
  const { productId } = useParams();
  const { products, addToCart, toggleWishlist, isInWishlist } =
    useContext(ShopContext); // ✅ FIXED
  const [productData, setProductData] = useState(null);
  const [selectedSize, setSelectedSize] = useState(null);
  const [currentImageIndex, setCurrentImageIndex] = useState(0);
  const [formattedSizes, setFormattedSizes] = useState([]);

  // ✅ Load product when products change or productId changes
  useEffect(() => {
    const product = products.find(
      (item) => String(item._id) === String(productId)
    );
    setProductData(product || null);
    setCurrentImageIndex(0);

    if (product) {
      let sizesArr = [];
      if (Array.isArray(product.sizes)) {
        sizesArr = product.sizes;
      } else if (
        typeof product.sizes === "string" &&
        product.sizes.trim() !== ""
      ) {
        sizesArr = product.sizes.split(",").map((s) => s.trim());
      }
      setFormattedSizes(sizesArr);
    }
  }, [productId, products]);

  if (!productData) {
    return (
      <div className="min-h-screen flex items-center justify-center text-gray-600 text-lg">
        Loading product...
      </div>
    );
  }

  const images = Array.isArray(productData.image)
    ? productData.image
    : [productData.image];

  return (
    <section className="min-h-screen bg-[#f9f9f9] px-4 py-10 sm:px-8 font-sans">
      <motion.div
        className="max-w-6xl mx-auto grid grid-cols-1 md:grid-cols-2 gap-8 bg-white shadow-xl rounded-xl overflow-hidden p-6 sm:p-10"
        initial={{ opacity: 0, scale: 0.95 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 0.6 }}
      >
        {/* Image Gallery */}
        <motion.div
          className="flex flex-col-reverse md:flex-row gap-4 w-full"
          initial={{ opacity: 0, x: -50 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.6 }}
        >
          {/* Thumbnails */}
          <div className="flex md:flex-col flex-row gap-3 overflow-auto max-h-[500px]">
            {images.map((img, index) => (
              <motion.img
                key={index}
                src={img}
                alt={`Thumbnail ${index + 1}`}
                onClick={() => setCurrentImageIndex(index)}
                whileHover={{ scale: 1.1 }}
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: index * 0.1 }}
                className={`w-20 h-24 object-cover rounded-md cursor-pointer border transition-all ${
                  currentImageIndex === index
                    ? "border-gray-900 ring-2 ring-gray-700"
                    : "border-gray-300"
                }`}
              />
            ))}
          </div>

          {/* Main Image */}
          <motion.div
            className="relative w-full aspect-[3/4] bg-gray-100 rounded-lg overflow-hidden shadow-inner flex items-center justify-center"
            initial={{ scale: 0.95 }}
            animate={{ scale: 1 }}
            transition={{ duration: 0.5 }}
          >
            <img
              src={images[currentImageIndex]}
              alt={productData.name}
              className="w-full h-full object-cover transition duration-300"
            />
          </motion.div>
        </motion.div>

        {/* Product Info */}
        <motion.div
          className="space-y-6"
          initial={{ opacity: 0, x: 50 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.6 }}
        >
          <h1 className="text-3xl sm:text-4xl font-extrabold text-gray-900">
            {productData.name}
          </h1>

          <p className="text-2xl text-orange-600 font-semibold">
            £{productData.price}
          </p>

          <p className="text-gray-500 text-sm">
            <span className="font-medium">Category:</span>{" "}
            {productData.category}
          </p>

          {/* Product Details */}
          {productData.productDetails && (
            <div className="bg-gray-100 rounded-md p-4 text-sm text-gray-700 border border-gray-200 space-y-2">
              {productData.productDetails.map((detail, i) => (
                <div key={i} className="grid grid-cols-2 gap-2 text-sm">
                  <p>
                    <span className="font-medium">Color:</span> {detail.color}
                  </p>
                  <p>
                    <span className="font-medium">Fabric:</span> {detail.fabric}
                  </p>
                  <p>
                    <span className="font-medium">Cut:</span> {detail.cut}
                  </p>
                  <p>
                    <span className="font-medium">Slip:</span> {detail.slip}
                  </p>
                  <p>
                    <span className="font-medium">Dupatta:</span>{" "}
                    {detail.dupatta}
                  </p>
                  <p>
                    <span className="font-medium">Trouser:</span>{" "}
                    {detail.trouser}
                  </p>
                </div>
              ))}
            </div>
          )}

          {/* Size Selection */}
          {formattedSizes.length > 0 ? (
            <div>
              <p className="text-sm font-medium text-gray-700 mb-2">
                Select Size:
              </p>
              <div className="flex gap-3 flex-wrap">
                {formattedSizes.map((size, i) => (
                  <motion.button
                    key={i}
                    onClick={() => setSelectedSize(size)}
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                    className={`px-4 py-2 rounded-full border text-sm font-medium transition ${
                      selectedSize === size
                        ? "bg-gray-900 text-white border-gray-900"
                        : "bg-white text-gray-800 border-gray-300 hover:bg-gray-100"
                    }`}
                  >
                    {size}
                  </motion.button>
                ))}
              </div>
            </div>
          ) : (
            <p className="text-gray-500 text-sm">No sizes available</p>
          )}

          <p className="text-gray-600 leading-relaxed">
            Experience timeless elegance with our newest collection piece.
          </p>

          {/* Buttons */}
          <div className="flex flex-col sm:flex-row gap-4 pt-4">
            {/* Add to Cart */}
            <motion.button
              whileHover={{ scale: selectedSize ? 1.05 : 1 }}
              whileTap={{ scale: selectedSize ? 0.95 : 1 }}
              disabled={!selectedSize}
              className={`w-full sm:w-auto px-6 py-3 text-sm font-bold rounded-lg transition duration-200 ${
                selectedSize
                  ? "bg-orange-600 hover:bg-orange-700 text-white"
                  : "bg-gray-300 text-gray-500 cursor-not-allowed"
              }`}
              onClick={() => addToCart(productData._id, selectedSize)}
            >
              Add to Cart
            </motion.button>

            {/* Wishlist */}
            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              className={`w-full sm:w-auto px-6 py-3 text-sm font-bold rounded-lg transition duration-200 ${
                isInWishlist(productData._id)
                  ? "bg-red-600 hover:bg-red-700 text-white"
                  : "bg-gray-200 hover:bg-gray-300 text-gray-800"
              }`}
              onClick={() => toggleWishlist(productData._id)}
            >
              {isInWishlist(productData._id) ? "❤️ In Wishlist" : "♡ Wishlist"}
            </motion.button>
          </div>
        </motion.div>
      </motion.div>
      {/* Related Products */}
      {productData && (
        <RelatedProduct
          category={productData.category}
          currentProductId={productData._id}
        />
      )}
       {/* Reviews Section */}
      <div className="mt-10">
        <Reviews /> {/* ⬅️ show reviews here */}
      </div>
    </section>
  );
};

export default Product;
