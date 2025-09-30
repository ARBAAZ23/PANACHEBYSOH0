import React from "react";

const Faq = () => {
  return (
    <main className="max-w-4xl mx-auto p-6 font-poppins text-gray-800">
      <h1 className="text-3xl font-bold mb-6">Frequently Asked Questions (FAQ)</h1>

      <section className="mb-6">
        <h2 className="text-xl font-semibold mb-2">How do I place an order?</h2>
        <p>Browse our collection, add items to your cart, and follow the checkout process to place your order.</p>
      </section>

      <section className="mb-6">
        <h2 className="text-xl font-semibold mb-2">What payment methods do you accept?</h2>
        <p>We accept PayPal, major credit/debit cards, and other payment options available at checkout.</p>
      </section>

      <section className="mb-6">
        <h2 className="text-xl font-semibold mb-2">Can I track my order?</h2>
        <p>Yes! Once your order ships, we will send you a tracking number via email.</p>
      </section>

      <section>
        <h2 className="text-xl font-semibold mb-2">How do I contact customer support?</h2>
        <p>You can reach us via email at <a href="mailto:Panachebysoh@gmail.com" className="text-blue-600 underline">Panachebysoh@gmail.com</a> or call us at <a href="tel:+447442276432" className="text-blue-600 underline">+44 7442 276 432</a>.</p>
      </section>
    </main>
  );
};

export default Faq;
