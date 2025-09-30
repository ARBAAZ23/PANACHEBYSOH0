import React from "react";

const Terms = () => {
  return (
    <main className="max-w-4xl mx-auto p-6 font-poppins text-gray-800">
      <h1 className="text-3xl font-bold mb-6">Terms & Conditions</h1>

      <p className="mb-4">
        Welcome to PanacheBySoh. By accessing or using our website, you agree to be bound by these terms and conditions.
      </p>

      <section className="mb-4">
        <h2 className="text-xl font-semibold mb-2">Use of Website</h2>
        <p>You agree to use the site only for lawful purposes and in a way that does not infringe the rights of others.</p>
      </section>

      <section className="mb-4">
        <h2 className="text-xl font-semibold mb-2">Pricing and Availability</h2>
        <p>Prices and availability of products are subject to change without notice.</p>
      </section>

      <section>
        <h2 className="text-xl font-semibold mb-2">Limitation of Liability</h2>
        <p>We are not liable for any damages resulting from the use of our products or website.</p>
      </section>
    </main>
  );
};

export default Terms;
