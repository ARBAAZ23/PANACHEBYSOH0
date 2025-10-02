import React, { useEffect, useState } from "react";

const Returns = () => {
  const [showContent, setShowContent] = useState(false);

  useEffect(() => {
    // Trigger animation after component mounts
    setTimeout(() => setShowContent(true), 100);
  }, []);

  return (
    <main
      className={`max-w-4xl mx-auto p-6 font-poppins text-gray-800 transition-opacity duration-1000 ${
        showContent ? "opacity-100 translate-y-0" : "opacity-0 translate-y-5"
      }`}
    >
      <h1 className="text-3xl font-bold mb-6 text-center text-indigo-700">
        Refund Policy
      </h1>

      <ul className="list-disc pl-6 space-y-4 text-base leading-relaxed">
        {[
          "We believe in giving 100% satisfaction to our clients. Though if you are not happy, you can contact us within 48 hours after you receive the product.",
          "No return will be entertained for customised/stitched products.",
          "Restocking fees will be charged (10% of the order value excluding shipping charges) to the customer and customer has to bear the cost of shipping the product back.",
          "Customer must return the product within 7 days after receiving it.",
          "Custom, oversize, or hazardous items cannot be returned.",
          "Items that have been used will not be accepted as returns. Items which have any stains, emit body odours or perfume scents, have any kind of marks, damages or water stains will not be accepted for returns.",
          "We are not responsible for any damage that occurs while shipping once it is shipped from our end.",
          "We check the product thoroughly for quality and any existing damage before we ship.",
          "When custom measurements are truly followed, the returns are not accepted.",
          "On sale items we only offer exchange or a credit note.",
          "Shipping and stitching charges cannot be refunded.",
        ].map((item, index) => (
          <li
            key={index}
            className="hover:translate-x-1 transition-transform duration-300 text-gray-700"
          >
            {item}
          </li>
        ))}
      </ul>
    </main>
  );
};

export default Returns;
