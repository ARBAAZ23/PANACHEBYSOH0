import React from "react";
import CheckmarkIcon from "./CheckmarkIcon"; // Import the icon

const NewsLetterBox = () => {
  const onSubmitHandler = (event) => {
    event.preventDefault();
    // Handle form submission logic here (e.g., API call)
    console.log("Form submitted with email:", event.target.email.value);
    event.target.reset(); // Clear the form
  };

  return (
    // Section Container: Adds background, padding, and shadow to make the component stand out.
    <div className="bg-slate-100/70 p-8 md:p-12 rounded-2xl shadow-sm my-16">
      <div className="text-center max-w-2xl mx-auto">
        
        {/* Title: Larger, bolder, and better spacing for impact. */}
        <h2 className="text-3xl md:text-4xl font-bold text-gray-900">
          Unlock Exclusive Member Benefits
        </h2>

        {/* Subtitle: Softer color for contrast and better readability. */}
        <p className="text-gray-600 mt-4 text-lg leading-relaxed">
          Get rewards, early sale access, travel perks, and more when you join our community.
        </p>

        {/* Benefits List: Uses icons and flexbox for a clean, professional look. */}
        <ul className="mt-8 space-y-3 text-gray-700 text-left max-w-md mx-auto">
          <li className="flex items-start">
            <CheckmarkIcon />
            <span className="ml-3">
              Earn <strong>SuperCoins</strong> on every single order.
            </span>
          </li>
          <li className="flex items-start">
            <CheckmarkIcon />
            <span className="ml-3">
              Get <strong>early access</strong> to New Arrivals & sales events.
            </span>
          </li>
          <li className="flex items-start">
            <CheckmarkIcon />
            <span className="ml-3">
              Receive <strong>priority customer support</strong> from our dedicated team.
            </span>
          </li>
        </ul>

        {/* Newsletter Form: Modern styling with focus states for better UX. */}
        <form
          onSubmit={onSubmitHandler}
          className="mt-8 flex flex-col sm:flex-row items-center gap-3 w-full max-w-lg mx-auto"
        >
          <input
            name="email" // Added name for easier access in handler
            className="flex-grow w-full px-4 py-3 text-gray-800 bg-white border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 transition-shadow"
            type="email"
            placeholder="Enter your email address"
            required
          />
          <button
            type="submit"
            className="w-full sm:w-auto bg-gray-900 text-white font-semibold text-sm px-6 py-3 rounded-lg hover:bg-gray-800 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-gray-900 transition-colors duration-300"
          >
            SUBSCRIBE
          </button>
        </form>
      </div>
    </div>
  );
};

export default NewsLetterBox;