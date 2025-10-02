import React from "react";

const TermsAndConditions = () => {
  return (
    <main className="max-w-4xl mx-auto p-6 font-poppins text-gray-800">
      <h1 className="text-3xl font-bold mb-6 text-indigo-700 text-center">
        Terms & Conditions
      </h1>

      {/* General Terms */}
      <section className="mb-8">
        <h2 className="text-xl font-semibold mb-3 text-gray-900">General</h2>
        <ul className="list-disc pl-6 space-y-3">
          <li>By accessing and using this website, you accept and agree to be bound by the terms and conditions stated here.</li>
          <li>We reserve the right to update or change these terms at any time without prior notice.</li>
          <li>Use of the site is limited to lawful purposes only. Any misuse may result in termination of access or legal action.</li>
        </ul>
      </section>

      {/* Product & Orders */}
      <section className="mb-8">
        <h2 className="text-xl font-semibold mb-3 text-gray-900">Products & Orders</h2>
        <ul className="list-disc pl-6 space-y-3">
          <li>All products are subject to availability. We reserve the right to cancel any order in case of stock unavailability.</li>
          <li>Customised/stitched products cannot be cancelled, returned, or exchanged once the order is confirmed.</li>
          <li>We strive for accuracy in product descriptions, but cannot guarantee complete absence of errors. Color and fabric variations may occur due to screen or lighting differences.</li>
        </ul>
      </section>

      {/* Pricing & Payment */}
      <section className="mb-8">
        <h2 className="text-xl font-semibold mb-3 text-gray-900">Pricing & Payment</h2>
        <ul className="list-disc pl-6 space-y-3">
          <li>All prices are listed in GBP (£) and are inclusive of applicable taxes unless stated otherwise.</li>
          <li>We reserve the right to update product prices at any time without prior notice.</li>
          <li>Payments must be made in full before the product is shipped or processed.</li>
        </ul>
      </section>

      {/* Intellectual Property */}
      <section className="mb-8">
        <h2 className="text-xl font-semibold mb-3 text-gray-900">Intellectual Property</h2>
        <ul className="list-disc pl-6 space-y-3">
          <li>All content, logos, images, and designs on this website are the property of our brand or licensors and are protected by copyright laws.</li>
          <li>No part of this website may be copied, reproduced, or reused without explicit written permission.</li>
        </ul>
      </section>

      {/* Liability */}
      <section className="mb-8">
        <h2 className="text-xl font-semibold mb-3 text-gray-900">Limitation of Liability</h2>
        <ul className="list-disc pl-6 space-y-3">
          <li>We are not liable for any direct, indirect, incidental, or consequential damages arising from the use of or inability to use our products or website.</li>
          <li>We make no guarantees regarding uninterrupted or error-free access to the website.</li>
        </ul>
      </section>

      {/* Governing Law */}
      <section>
        <h2 className="text-xl font-semibold mb-3 text-gray-900">Governing Law</h2>
        <ul className="list-disc pl-6 space-y-3">
          <li>These terms are governed by and construed in accordance with the laws of the United Kingdom.</li>
          <li>Any disputes arising under these terms will be subject to the jurisdiction of UK courts.</li>
        </ul>
      </section>
    </main>
  );
};

export default TermsAndConditions;
