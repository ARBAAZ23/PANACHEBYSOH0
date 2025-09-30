import React from "react";

const Shipping = () => {
  return (
    <main className="max-w-4xl mx-auto p-6 font-poppins text-gray-800">
      <h1 className="text-3xl font-bold mb-6">Shipping Information</h1>

      <section className="mb-6">
        <h2 className="text-xl font-semibold mb-2">Shipping Methods & Times</h2>
        <p>
          We offer standard and express shipping options. Orders typically ship within 2-3 business days.
          Delivery times vary by destination but usually range from 3-7 business days.
        </p>
      </section>

      <section className="mb-6">
        <h2 className="text-xl font-semibold mb-2">Shipping Charges</h2>
        <p>
          Shipping costs depend on the weight of your order and delivery location. Final shipping costs will be calculated at checkout.
        </p>
      </section>

      <section>
        <h2 className="text-xl font-semibold mb-2">International Shipping</h2>
        <p>
          We currently ship to select countries internationally. Customs fees and import duties may apply and are the responsibility of the recipient.
        </p>
      </section>
    </main>
  );
};

export default Shipping;
