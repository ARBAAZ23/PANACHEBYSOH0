import React, { useState } from 'react';

const Login = () => {
  const [currentState, setCurrentState] = useState('Sign Up');

  const toggleState = () => {
    setCurrentState((prev) => (prev === 'Sign Up' ? 'Login' : 'Sign Up'));
  };

  return (
    <div>
      <form className="flex flex-col items-center w-[90%] sm:max-w-96 m-auto mb-4 gap-4 text-gray-800">
        <div className="inline-flex items-center gap-2 mb-2 mt-10">
          <p className="prata-regular text-3xl">{currentState}</p>
          <hr className="border-none h-[1.5px] w-8 bg-gray-800" />
        </div>

        {/* Example Input Fields */}
        <input
          type="email"
          placeholder="Email"
          className="w-full p-3 border rounded-md"
        />
        <input
          type="password"
          placeholder="Password"
          className="w-full p-3 border rounded-md"
        />

        {currentState === 'Sign Up' && (
          <input
            type="text"
            placeholder="Username"
            className="w-full p-3 border rounded-md"
          />
        )}

        <button
          type="submit"
          className="w-full bg-black text-white py-3 rounded-md hover:bg-gray-900 transition"
        >
          {currentState}
        </button>

        <p className="text-sm mt-2">
          {currentState === 'Sign Up' ? 'Already have an account?' : 'New here?'}{' '}
          <span
            onClick={toggleState}
            className="text-blue-600 cursor-pointer font-semibold"
          >
            {currentState === 'Sign Up' ? 'Login' : 'Sign Up'}
          </span>
        </p>
      </form>
    </div>
  );
};

export default Login;
