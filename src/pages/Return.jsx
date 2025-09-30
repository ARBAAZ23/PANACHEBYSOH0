import React from "react";

const Returns = () => {
  return (
    <main className="max-w-4xl mx-auto p-6 font-poppins text-gray-800">
      <h1 className="text-3xl font-bold mb-6">Return Policy</h1>

      <section className="mb-6">
        <h2 className="text-xl font-semibold mb-2">Eligibility</h2>
        <p>
          Returns are accepted within 14 days of receiving your order. Items must be unused, in original packaging, and with all tags attached.
        </p>
      </section>

      <section className="mb-6">
        <h2 className="text-xl font-semibold mb-2">How to Return</h2>
        <p>
          To start a return, please contact our support team with your order details. We will provide instructions for returning your item.
        </p>
      </section>

      <section>
        <h2 className="text-xl font-semibold mb-2">Refunds</h2>
        <p>
          Refunds will be processed to the original payment method within 7 business days after we receive and inspect the returned items.
        </p>
      </section>
    </main>
  );
};

export default Returns;
