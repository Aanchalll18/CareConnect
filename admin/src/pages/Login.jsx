

import React, { useContext, useState } from 'react';
import { AdminContext } from '../context/AdminContext';
import axios from 'axios';
import { toast } from 'react-toastify';

const Login = () => {
  const [state, setState] = useState('Admin');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const { setaToken, backendUrl } = useContext(AdminContext);
  const [loading, setLoading] = useState(false);

  const onSubmitHandler = async (event) => {
    event.preventDefault();

    // Input validation
    if (!email || !password) {
      toast.error('Please fill in all fields.');
      return;
    }

    try {
      setLoading(true);
      const loginUrl =
        state === 'Admin'
          ? `${backendUrl}/api/admin/login`
          : `${backendUrl}/api/doctor/login`;

      const { data } = await axios.post(loginUrl, { email, password });

      if (data.success) {
        const tokenKey = state === 'Admin' ? 'aToken' : 'dToken';
        localStorage.setItem(tokenKey, data.token);
        setaToken(data.token);
        toast.success(`${state} Login successful!`);
      } else {
        toast.error(data.message || 'Login failed. Please try again.');
      }
    } catch (e) {
      console.error('Error during login:', e.message);
      toast.error(e.response?.data?.message || 'An error occurred during login.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <form
      onSubmit={onSubmitHandler}
      className="flex justify-center items-center min-h-screen bg-gradient-to-br from-purple-200 via-purple-300 to-purple-400"
    >
      <div className="bg-white rounded-lg shadow-2xl transform hover:scale-105 transition-transform duration-300 p-8 w-96">
        <p className="text-2xl font-bold text-purple-700 text-center mb-6">
          <span className="capitalize">{state}</span> Login
        </p>
        <div className="mb-4">
          <label className="text-purple-600 font-semibold mb-2 block" htmlFor="email">
            Email
          </label>
          <input
            id="email"
            onChange={(e) => setEmail(e.target.value)}
            value={email}
            type="email"
            className="w-full p-3 border border-purple-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-500 focus:border-purple-500"
            placeholder="Enter your email"
          />
        </div>
        <div className="mb-6">
          <label className="text-purple-600 font-semibold mb-2 block" htmlFor="password">
            Password
          </label>
          <input
            id="password"
            onChange={(e) => setPassword(e.target.value)}
            value={password}
            type="password"
            className="w-full p-3 border border-purple-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-500 focus:border-purple-500"
            placeholder="Enter your password"
          />
        </div>
        <button
          type="submit"
          disabled={loading}
          className={`w-full bg-gradient-to-r from-purple-500 to-purple-600 text-white font-semibold py-3 rounded-lg shadow-lg hover:shadow-2xl transition-all duration-300 mb-4 ${
            loading ? 'opacity-50 cursor-not-allowed' : ''
          }`}
        >
          {loading ? 'Logging in...' : 'Login'}
        </button>
        <div className="text-center text-sm text-purple-500 font-medium">
          {state === 'Admin' ? (
            <p>
              Doctor Login?{' '}
              <span
                onClick={() => setState('Doctor')}
                className="text-purple-700 font-bold cursor-pointer hover:underline"
              >
                Click here
              </span>
            </p>
          ) : (
            <p>
              Admin Login?{' '}
              <span
                onClick={() => setState('Admin')}
                className="text-purple-700 font-bold cursor-pointer hover:underline"
              >
                Click here
              </span>
            </p>
          )}
        </div>
      </div>
    </form>
  );
};

export default Login;
