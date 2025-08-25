import React from "react";

const NewsLetterBox = () => {
  const onSubmitHandler = (event) => {
    event.preventDefault();
  };

  return (
    <div className="text-center max-w-2xl mx-auto">
      {/* Title */}
      <p className="text-2xl font-bold text-gray-800">
        Subscribe & Unlock Exclusive Membership Benefits
      </p>

      {/* Subtitle */}
      <p className="text-gray-500 mt-2">
        Get access to rewards, early sale entries, travel perks, and more.
      </p>

      {/* ✅ Benefits List */}
      <ul className="text-left mt-4 space-y-2 text-gray-700 list-disc list-inside">
        <li>
          💰 Earn <strong>SuperCoins</strong> on every order
        </li>
        <li>
          ⚡ Get <strong>early access</strong> to New Arrivals & sales
        </li>
        <li>
          📞 Priority <strong>customer support</strong>
        </li>
      </ul>

      {/* Newsletter Form */}
      <form
        onSubmit={onSubmitHandler}
        className="w-full sm:w-3/4 flex items-center gap-3 mx-auto my-6 border rounded-lg pl-3"
      >
        <input
          className="w-full sm:flex-1 outline-none py-3 px-2"
          type="email"
          placeholder="Enter your email"
          required
        />
        <button
          type="submit"
          className="bg-black text-white font-medium text-xs px-8 py-3 rounded-r-lg"
        >
          SUBSCRIBE
        </button>
      </form>
    </div>
  );
};

export default NewsLetterBox;
