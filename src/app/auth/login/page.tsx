"use client";
import { Lock, Mail } from "lucide-react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import React from "react";
import { useForm } from "react-hook-form";

const page = () => {
  const { register } = useForm();
  const router = useRouter();

  return (
    <div className="min-h-screen pt-20 bg-slate-950 selection:!bg-violet-500 selection:text-white flex items-center justify-center relative overflow-hidden px-4">
      {/* Background Decor */}
      <div className="absolute top-1/4 left-1/4 w-[500px] h-[500px] bg-violet-600/20 rounded-full blur-[120px] -z-10"></div>
      <div className="absolute bottom-1/4 right-1/4 w-[400px] h-[400px] bg-blue-600/10 rounded-full blur-[100px] -z-10"></div>

      <div className="w-full max-w-md bg-slate-900/50 backdrop-blur-xl border border-slate-800 rounded-2xl p-8 shadow-2xl animate-in zoom-in-95 duration-300">
        <div className="text-center mb-8">
          <h2 className="text-3xl font-bold text-white mb-2">Welcome back</h2>
          <p className="text-slate-400 text-sm">
            Enter your credentials to access your validation dashboard.
          </p>
        </div>

        <form
          className="space-y-4"
          onSubmit={(e) => {
            e.preventDefault();
            router.push("/chat");
          }}
        >
          <div className="space-y-1">
            <label className="text-xs font-medium text-slate-300 ml-1">
              Email Address
            </label>
            <div className="relative">
              <Mail className="absolute left-3 top-3.5 h-5 w-5 text-slate-500" />
              <input
                {...register("email")}
                type="email"
                placeholder="Enter your email"
                className="w-full bg-slate-950 border border-slate-800 rounded-lg py-3 pl-10 pr-4 text-white placeholder:text-slate-600 focus:outline-none focus:border-violet-500 focus:ring-1 focus:ring-violet-500 transition-all"
                required
              />
            </div>
          </div>

          <div className="space-y-1">
            <div className="flex justify-between items-center px-1">
              <label className="text-xs font-medium text-slate-300">
                Password
              </label>

              <a
                href="#"
                className="text-xs text-violet-400 hover:text-violet-300"
              >
                Forgot password?
              </a>
            </div>
            <div className="relative">
              <Lock className="absolute left-3 top-3.5 h-5 w-5 text-slate-500" />
              <input
                {...register("password")}
                type="password"
                placeholder="Enter your password"
                className="w-full bg-slate-950 border border-slate-800 rounded-lg py-3 pl-10 pr-4 text-white placeholder:text-slate-600 focus:outline-none focus:border-violet-500 focus:ring-1 focus:ring-violet-500 transition-all"
                required
              />
            </div>
          </div>

          <button className="w-full bg-violet-600 hover:bg-violet-500 text-white font-bold py-3.5 rounded-lg transition-all shadow-[0_0_20px_rgba(124,58,237,0.3)] hover:shadow-[0_0_30px_rgba(124,58,237,0.5)] mt-2">
            Sign In
          </button>
        </form>

        <p className="text-center mt-6 text-sm text-slate-400">
          Don't have an account?
          <Link
            href="/auth/register"
            className="text-violet-400 hover:text-violet-300 font-medium hover:underline"
          >
            Sign up
          </Link>
        </p>
      </div>
    </div>
  );
};

export default page;
