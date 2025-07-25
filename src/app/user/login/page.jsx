'use client'
import { FaGrav } from "react-icons/fa";
import {useRouter} from "next/navigation";
import React, { useState } from "react";
import { useService } from "@/context/ServerContext";
import { FiLogIn, FiEye, FiEyeOff, FiMail, FiLock } from "react-icons/fi";

export default function Page() {
  const { login, authLoading, authError } = useService();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const router = useRouter();
  
  const handleSubmit =async (e) => {
    e.preventDefault();
    try{
      await login( email,password);
      router.push("/");
      // add real login logic here
    } catch (error){
      console.log("aldaa garlaa:",error);

    }
   
  };

  return (
    <div className="min-h-screen flex items-center justify-center ">
      
      <div className="w-full max-w-md mx-4 shadow-2xl rounded-3xl bg-gradient-to-br from-slate-900 via-indigo-900 to-slate-800  bg-slate-900/30 backdrop-blur-lg border border-slate-700/50 font-serif">
        <div className="p-8">
          {/* Header */}
          <div className=" justify-center flex items-center text-center mb-8 gap-2">
         <FaGrav className="w-10  h-10 "/>
            <h2 className="text-xl font-semibold text-slate-200">
              Нэвтрэх
            </h2>
          </div>

          {/* Form */}
          <form onSubmit={handleSubmit} className="space-y-6">
            {/* Email Input */}
            <div>
              <label className="block text-sm font-medium mb-2 text-slate-200">
                Имэйл
              </label>
              <div className="relative">
                <FiMail className="absolute left-3 top-1/2 transform -translate-y-1/2 text-cyan-400 h-5 w-5" />
                <input 
                  type="email"
                  placeholder="your@email.com"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  required
                  className="w-full pl-12 pr-4 py-3 bg-slate-800/40 border border-slate-600/50 rounded-xl text-white placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-cyan-400 focus:border-cyan-400 transition-all duration-200"
                />
              </div>
            </div>

            {/* Password Input */}
            <div>
              <label className="block text-sm font-medium mb-2 text-slate-200">
                Нууц үг
              </label>
              <div className="relative">
                <FiLock className="absolute left-3 top-1/2 transform -translate-y-1/2 text-cyan-400 h-5 w-5" />
                <input
                  type={showPassword ? "text" : "password"}
                  placeholder="••••••••"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  required
                  className="w-full pl-12 pr-12 py-3 bg-slate-800/40 border border-slate-600/50 rounded-xl text-white placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-cyan-400 focus:border-cyan-400 transition-all duration-200"
                />
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className="absolute right-3 top-1/2 transform -translate-y-1/2 text-slate-400 hover:text-cyan-400 transition-colors duration-200"
                >
                  {showPassword ? <FiEyeOff size={20} /> : <FiEye size={20} />}
                </button>
              </div>
            </div>

            {/* Submit Button */}
            <div className="pt-4">
              <button 
                type="submit" 
                className="w-full bg-gradient-to-r from-indigo-400 to-blue-400 hover:from-cyan-700 hover:to-teal-700 text-white font-semibold py-3 px-6 rounded-xl transition-all duration-200 transform hover:scale-[1.02] focus:outline-none focus:ring-2 focus:ring-cyan-400 focus:ring-offset-2 focus:ring-offset-transparent shadow-lg"
              >
                 {authLoading ? (
                <svg
                  className="animate-spin -ml-1 mr-3 h-5 w-5 text-white flex items-center"
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 24 24"
                >
                  <circle
                    className="opacity-25"
                    cx="12"
                    cy="12"
                    r="10"
                    stroke="currentColor"
                    strokeWidth="4"
                  ></circle>
                  <path
                    className="opacity-75"
                    fill="currentColor"
                    d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
                  ></path>
                </svg>
              ) : (
                <div className="flex items-center justify-center gap-2">
                <span>Нэвтрэх</span>
                <FiLogIn className="h-5 w-5" />
              </div>
              )}

              </button>
            </div>
          </form>

          {/* Footer */}
          <div className="mt-8 text-center">
            <p className="text-sm text-slate-300">
              Бүртгэлгүй юу?{" "}
              <a 
                href="/user/register" 
                className="text-cyan-300 hover:text-cyan-200 underline underline-offset-2 transition-colors duration-200 font-medium"
              >
                Бүртгүүлэх
              </a>
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}