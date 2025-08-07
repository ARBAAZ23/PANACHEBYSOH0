import React, { useState } from 'react';

const Login = () => {
  const [currentState, setCurrentState] = useState('Sign Up');
  const [formData, setFormData] = useState({
    email: '',
    password: '',
    username: '',
  });
  const [errors, setErrors] = useState({});

  const toggleState = () => {
    setCurrentState((prev) => (prev === 'Sign Up' ? 'Login' : 'Sign Up'));
    setFormData({ email: '', password: '', username: '' });
    setErrors({});
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const validate = () => {
    const newErrors = {};

    if (!formData.email.trim()) {
      newErrors.email = 'Email is required';
    } else if (!/^\S+@\S+\.\S+$/.test(formData.email)) {
      newErrors.email = 'Email is invalid';
    }

    if (!formData.password.trim()) {
      newErrors.password = 'Password is required';
    } else if (formData.password.length < 6) {
      newErrors.password = 'Password must be at least 6 characters';
    }

    if (currentState === 'Sign Up') {
      if (!formData.username.trim()) {
        newErrors.username = 'Username is required';
      } else if (formData.username.length < 3) {
        newErrors.username = 'Username must be at least 3 characters';
      }
    }

    return newErrors;
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    const validationErrors = validate();
    if (Object.keys(validationErrors).length > 0) {
      setErrors(validationErrors);
      return;
    }

    setErrors({});
    console.log(`${currentState} form submitted`, formData);

    if (currentState === 'Sign Up') {
      setTimeout(() => {
        alert('Sign up successful! Redirecting to login...');
        toggleState();
      }, 500);
    } else {
      alert('Login successful!');
    }
  };

  return (
    <main className="min-h-full flex items-center justify-center bg-gray-50 px-4 py-10 transition-all duration-500">
      <section className="w-full max-w-md bg-white p-8 rounded-xl shadow-2xl animate-fade-in transition-all duration-500">
        <header className="text-center mb-6">
          <h2 className="text-3xl font-bold text-gray-800 transition-all duration-300">
            {currentState}
          </h2>
          <p className="font-prata text-sm text-gray-500 transition-opacity duration-300">
            {currentState === 'Sign Up'
              ? 'Create your account to get started'
              : 'Welcome back! Please login to your account'}
          </p>
        </header>

        <form onSubmit={handleSubmit} className="space-y-5">
          {/* Email */}
          <div className="transition-all duration-300">
            <input
              type="email"
              name="email"
              placeholder="Email Address"
              value={formData.email}
              onChange={handleChange}
              className={`w-full px-4 py-3 border rounded-md transition-all duration-200 focus:outline-none focus:ring-2 ${
                errors.email ? 'border-red-500 ring-red-400' : 'focus:ring-black'
              }`}
            />
            {errors.email && <p className="text-red-500 text-sm mt-1">{errors.email}</p>}
          </div>

          {/* Password */}
          <div className="transition-all duration-300">
            <input
              type="password"
              name="password"
              placeholder="Password"
              value={formData.password}
              onChange={handleChange}
              className={`w-full px-4 py-3 border rounded-md transition-all duration-200 focus:outline-none focus:ring-2 ${
                errors.password ? 'border-red-500 ring-red-400' : 'focus:ring-black'
              }`}
            />
            {errors.password && (
              <p className="text-red-500 text-sm mt-1">{errors.password}</p>
            )}
          </div>

          {/* Username (only for Sign Up) */}
          {currentState === 'Sign Up' && (
            <div className="transition-all duration-300">
              <input
                type="text"
                name="username"
                placeholder="Username"
                value={formData.username}
                onChange={handleChange}
                className={`w-full px-4 py-3 border rounded-md transition-all duration-200 focus:outline-none focus:ring-2 ${
                  errors.username ? 'border-red-500 ring-red-400' : 'focus:ring-black'
                }`}
              />
              {errors.username && (
                <p className="text-red-500 text-sm mt-1">{errors.username}</p>
              )}
            </div>
          )}

          {/* Submit Button */}
          <button
            type="submit"
            className="w-full bg-black text-white py-3 rounded-md hover:bg-gray-900 transition duration-300 transform hover:scale-[1.02] active:scale-95"
          >
            {currentState}
          </button>
        </form>

        {/* Toggle Link */}
        <div className="text-center mt-6 text-sm text-gray-600">
          {currentState === 'Sign Up'
            ? 'Already have an account?'
            : 'New here?'}{' '}
          <button
            type="button"
            onClick={toggleState}
            className="text-blue-600 hover:underline font-medium transition duration-200"
          >
            {currentState === 'Sign Up' ? 'Login' : 'Sign Up'}
          </button>
        </div>
      </section>
    </main>
  );
};

export default Login;
