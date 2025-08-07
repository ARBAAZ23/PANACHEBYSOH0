import React, { useContext, useState } from "react";
import Select from "react-select";
import { Country, State, City } from "country-state-city";
import Title from "../components/Title";
import CartTotal from "../components/CartTotal";
import { assets } from "../assets/assets";
import { ShopContext } from "../contexts/ShopContext";

const PlaceOrder = () => {
  const [selectedCountry, setSelectedCountry] = useState(null);
  const [selectedState, setSelectedState] = useState(null);
  const [selectedCity, setSelectedCity] = useState(null);
  const [paymentMethod, setPaymentMethod] = useState(null);
  
  const {navigate} = useContext(ShopContext)

  const countries = Country.getAllCountries().map((country) => ({
    value: country.isoCode,
    label: country.name,
  }));

  const states = selectedCountry
    ? State.getStatesOfCountry(selectedCountry.value).map((state) => ({
        value: state.isoCode,
        label: state.name,
      }))
    : [];

  const cities = selectedState
    ? City.getCitiesOfState(selectedCountry.value, selectedState.value).map(
        (city) => ({
          value: city.name,
          label: city.name,
        })
      )
    : [];

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!selectedCountry || !selectedState || !selectedCity) {
      alert("Please select country, state, and city");
      return;
    }
    if (!paymentMethod) {
      alert("Please select a payment method");
      return;
    }
    console.log("Order placed!");
  };

  return (
    <form
      onSubmit={handleSubmit}
      className="min-h-screen py-12 px-4 sm:px-6 lg:px-8 bg-gray-50"
    >
      <div className="max-w-6xl mx-auto grid grid-cols-1 lg:grid-cols-2 gap-10">
        {/* Left Section: Address Form */}
        <div className="bg-white p-8 rounded-lg shadow-sm border border-gray-200">
          <div className="mb-6">
            <Title text1="DELIVERY " text2="INFORMATION" />
          </div>
          <div className="flex flex-col gap-4">
            <input
              type="text"
              placeholder="Full Name"
              className="border border-gray-300 p-3 rounded-md outline-none focus:ring-2 focus:ring-black"
              required
            />
            <input
              type="text"
              placeholder="Street Address"
              className="border border-gray-300 p-3 rounded-md outline-none focus:ring-2 focus:ring-black"
              required
            />
            <div className="flex flex-col gap-3">
              <Select
                options={countries}
                value={selectedCountry}
                onChange={(option) => {
                  setSelectedCountry(option);
                  setSelectedState(null);
                  setSelectedCity(null);
                }}
                placeholder="Select Country"
              />
              <Select
                options={states}
                value={selectedState}
                onChange={(option) => {
                  setSelectedState(option);
                  setSelectedCity(null);
                }}
                placeholder="Select State"
                isDisabled={!selectedCountry}
              />
              <Select
                options={cities}
                value={selectedCity}
                onChange={setSelectedCity}
                placeholder="Select City"
                isDisabled={!selectedState}
              />
            </div>
            <input
              type="text"
              placeholder="Zip Code"
              className="border border-gray-300 p-3 rounded-md outline-none focus:ring-2 focus:ring-black"
              required
            />
            <input
              type="tel"
              placeholder="Phone Number"
              className="border border-gray-300 p-3 rounded-md outline-none focus:ring-2 focus:ring-black"
              required
            />
            <input
              type="email"
              placeholder="Email Address"
              className="border border-gray-300 p-3 rounded-md outline-none focus:ring-2 focus:ring-black"
              required
            />
            <textarea
              placeholder="Delivery Instructions (Optional)"
              className="border border-gray-300 p-3 rounded-md outline-none focus:ring-2 focus:ring-black"
              rows={4}
            />
          </div>
        </div>

        {/* Right Section: Payment + Order */}
        <div className="bg-white p-8 rounded-lg shadow-sm border border-gray-200 h-fit flex flex-col gap-6">
          <CartTotal />
          <div>
            <Title text1="PAYMENT " text2="METHOD" />
            <div className="flex flex-col sm:flex-row gap-4 mt-4">
              {[
                {
                  id: "mastercard",
                  label: "Mastercard",
                  img: assets.mastercard_icon,
                },
                {
                  id: "razorpay",
                  label: "Razorpay",
                  img: assets.razorpay_icon,
                },
                {
                  id: "cod",
                  label: "Cash on Delivery",
                  img: assets.cod_icon,
                },
              ].map((method) => (
                <button
                  key={method.id}
                  type="button"
                  onClick={() => setPaymentMethod(method.id)}
                  className={`flex flex-col items-center justify-center gap-2 border w-full sm:w-auto px-5 py-4 rounded-xl font-medium transition ${
                    paymentMethod === method.id
                      ? "border-gray-400 bg-white text-black"
                      : "border-gray-300 bg-white text-black hover:bg-gray-100"
                  }`}
                  style={{ minWidth: "140px", height: "100px" }}
                >
                  <img
                    src={method.img}
                    alt={method.label}
                    className="h-10 w-auto object-contain"
                  />
                  <span className="text-sm text-center">{method.label}</span>
                </button>
              ))}
            </div>
          </div>

          {/* Place Order Button moved here */}
          <button
            onClick={()=>navigate('/orders')}
            type="submit"
            className="mt-4 bg-black text-white py-3 rounded-md font-semibold transition"
          >
            Place Order
          </button>
        </div>
      </div>
    </form>
  );
};

export default PlaceOrder;
