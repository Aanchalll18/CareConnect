
import React, { useContext, useEffect, useState } from 'react';
import { AppContext } from '../context/AppContext';
import {toast} from 'react-hot-toast'
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

const Login = () => {
  const {backendUrl,token,settoken}=useContext(AppContext)

  const navigate=useNavigate()
  const [state, setState] = useState('Sign Up'); // Toggle between Sign Up and Login
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [name, setName] = useState('');

  const onSubmitHandler = async (event) => {
    event.preventDefault();
    console.log({ name, email, password });

    try{
      console.log('in tryblock')
      if(state === 'Sign Up'){
        const {data}=await axios.post(backendUrl + '/api/user/register',{name,email,password})
        if(data.success){
          localStorage.setItem('token',data.token)
          settoken(data.token)

        }else{
          toast.error(data.message)
        }
      }else{
        const {data}=await axios.post(backendUrl + '/api/user/login',{email,password})
        
        if(data.success){
          localStorage.setItem('token',data.token)
          settoken(data.token)

        }else{
          toast.error(data.message)
        }
      }
  
    }
    catch(e){
      toast.error(e.message)
    }
  
  };
  useEffect(()=>{
    if(token){
      navigate('/')
    }
  },[token])

  return (
    <form
      onSubmit={onSubmitHandler}
      className="min-h-[80vh] flex items-center"
    >
      <div className="flex flex-col gap-4 m-auto items-start p-8 sm:min-w-[24rem] border rounded-xl bg-white text-grey-600 shadow-lg hover:shadow-[6px_6px_12px_#7b2cbf] transition duration-300">
        {/* Title */}
        <p className="text-lg font-semibold text-grey-800">
          {state === 'Sign Up' ? 'Create Account' : 'Welcome Back'}
        </p>
        <p className="text-sm text-grey-500">
          Please {state === 'Sign Up' ? 'sign up' : 'log in'} to book appointments
        </p>

        {/* Full Name */}
        {state === 'Sign Up' && (
          <div className="w-full">
            <label className="block text-grey-700 text-sm mb-1">Full Name</label>
            <input
              type="text"
              onChange={(e) => setName(e.target.value)}
              value={name}
              placeholder="John Doe"
              className="w-full p-2 border border-grey-300 rounded-md focus:outline-none focus:ring-2 focus:ring-primary"
              required
            />
          </div>
        )}

        {/* Email */}
        <div className="w-full">
          <label className="block text-grey-700 text-sm mb-1">Email</label>
          <input
            type="email"
            onChange={(e) => setEmail(e.target.value)}
            value={email}
            placeholder="example@example.com"
            className="w-full p-2 border border-grey-300 rounded-md focus:outline-none focus:ring-2 focus:ring-primary"
            required
          />
        </div>

        {/* Password */}
        <div className="w-full">
          <label className="block text-grey-700 text-sm mb-1">Password</label>
          <input
            type="password"
            onChange={(e) => setPassword(e.target.value)}
            value={password}
            placeholder="Enter your password"
            className="w-full p-2 border border-grey-300 rounded-md focus:outline-none focus:ring-2 focus:ring-primary"
            required
          />
        </div>

        {/* Submit Button */}
        <button
          type="submit"
          className="w-full py-2 bg-primary text-white font-medium rounded-md hover:bg-purple2 shadow-lg transition"
        >
          {state === 'Sign Up' ? 'Create Account' : 'Login'}
        </button>

        {/* Toggle Login/Sign Up */}
        <p className="text-sm text-center w-full mt-2">
          {state === 'Sign Up' ? (
            <>
              Already have an account?{' '}
              <span
                onClick={() => setState('Login')}
                className="text-blue-600 cursor-pointer hover:underline"
              >
                Log in
              </span>
            </>
          ) : (
            <>
              Don't have an account?{' '}
              <span
                onClick={() => setState('Sign Up')}
                className="text-blue-600 cursor-pointer hover:underline"
              >
                Sign up
              </span>
            </>
          )}
        </p>
      </div>
    </form>
  );
};

export default Login;
