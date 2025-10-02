import React from "react";

const Shipping = () => {
  return (
    <main className="max-w-4xl mx-auto p-6 font-poppins text-gray-800">
      <h1 className="text-3xl font-bold mb-6 text-indigo-700 text-center">
        Shipping Policy
      </h1>

      {/* Shipping Policy */}
      <section className="mb-8">
        <h2 className="text-xl font-semibold mb-3 text-gray-900">
          Shipping Policy
        </h2>
        <ul className="list-disc pl-6 space-y-3">
          <li>
            We offer delivery of our products across the globe. Courier companies do not deliver to P.O. Box addresses, so you must provide a full street address with postal code/zip code and a telephone/mobile number.
          </li>
          <li>
            In case you are not at home, our shipping partners typically leave a card behind. You must contact them to reschedule delivery. Most partners make 2 to 3 delivery attempts. After three failed attempts, they hold the goods at their warehouse — you must arrange a reschedule or pick-up.
          </li>
          <li>
            Once an order is dispatched, if the order/product returns to us due to an incomplete or incorrect address, we are not responsible and no refunds will be provided. Re-shipment can be arranged at the customer’s expense.
          </li>
        </ul>
      </section>

      {/* Shipping Rate */}
      <section className="mb-8">
        <h2 className="text-xl font-semibold mb-3 text-gray-900">
          Shipping Rate
        </h2>
        <ul className="list-disc pl-6 space-y-3">
          <li>We ship within the UK and worldwide.</li>
          <li>Shipping charges within the UK depend on the weight of the outfit, starting from £4.99 per kg.</li>
          <li>Next-day delivery starts from £8.99 (weight dependent) within the UK.</li>
          <li>International delivery starts from £9.99 per kg (weight and location dependent).</li>
          <li>International delivery takes 12–14 working days.</li>
          <li>Shipping cost is based on product weight and delivery location.</li>
        </ul>
      </section>

      {/* Shipment and Tracking */}
      <section>
        <h2 className="text-xl font-semibold mb-3 text-gray-900">
          Shipment and Tracking Details
        </h2>
        <ul className="list-disc pl-6 space-y-3">
          <li>
            We will send an email confirming the shipment once the items are handed over to the courier. The email will include tracking details and the courier’s website.
          </li>
          <li>
            Tracking numbers may take up to 24 business hours to become active on the courier websites.
          </li>
        </ul>
      </section>
    </main>
  );
};

export default Shipping;
