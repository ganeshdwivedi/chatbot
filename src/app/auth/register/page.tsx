import { Lock, Mail, User, Zap } from "lucide-react";
import React from "react";

const Page = () => {
  return (
    <div className="min-h-screen bg-gray-50 flex flex-col justify-center items-center p-4">
      <div className="max-w-md w-full">
        <div
          className="text-center mb-8 cursor-pointer"
          //   onClick={() => navigate("landing")}
        >
          <Zap className="h-10 w-10 text-indigo-600 mx-auto" />
          <h1 className="text-3xl font-bold text-gray-900 mt-2">PrepAce</h1>
        </div>
        <div className="bg-white p-8 rounded-2xl shadow-xl">
          <h2 className="text-2xl font-bold text-center text-gray-800 mb-1">
            Create Your Account
          </h2>
          <p className="text-center text-gray-500 mb-8">
            Start your journey to your dream job today.
          </p>
          <form className="space-y-6">
            <div className="relative">
              <User className="absolute left-3 top-1/2 -translate-y-1/2 h-5 w-5 text-gray-400" />
              <input
                type="text"
                placeholder="Full Name"
                required
                className="w-full pl-10 pr-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 outline-none transition"
              />
            </div>
            <div className="relative">
              <Mail className="absolute left-3 top-1/2 -translate-y-1/2 h-5 w-5 text-gray-400" />
              <input
                type="email"
                placeholder="Email"
                required
                className="w-full pl-10 pr-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 outline-none transition"
              />
            </div>
            <div className="relative">
              <Lock className="absolute left-3 top-1/2 -translate-y-1/2 h-5 w-5 text-gray-400" />
              <input
                type="password"
                placeholder="Password"
                required
                className="w-full pl-10 pr-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 outline-none transition"
              />
            </div>
            <button className="w-full bg-indigo-600 text-white py-3 rounded-lg font-semibold hover:bg-indigo-700 transition-all duration-300 transform hover:scale-105">
              Create Account
            </button>
          </form>
          <p className="text-center text-gray-500 mt-8">
            Already have an account?{" "}
            <button
              //   onClick={() => navigate("login")}
              className="font-semibold text-indigo-600 hover:underline"
            >
              Log In
            </button>
          </p>
        </div>
      </div>
    </div>
  );
};

export default Page;
