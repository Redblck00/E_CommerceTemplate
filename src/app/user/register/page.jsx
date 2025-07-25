"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import { FiUser, FiMail, FiPhone, FiLock, FiUserPlus, FiEye, FiEyeOff ,FiAlertCircle} from "react-icons/fi";
import { FaSpinner, FaUserPlus } from 'react-icons/fa';
import { useService } from "@/context/ServerContext";

export default function RegisterPage() {
  const router = useRouter();
  const { register, authLoading, authError } = useService();
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [phone, setPhone] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [passwordError, setPasswordError] = useState(null);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setPasswordError(null);

    if (password !== confirmPassword) {
      setPasswordError("Нууц үг таарахгүй байна");
      return;
    }

    try {
      await register({ name, email, password, phone });
      // On success redirect to login
      router.push("/user/login");
    } catch (err) {
      console.error("Registration failed:", err);
    }
  };

  const displayError = passwordError || authError;

  return (
    <div className="min-h-screen  flex justify-center bg-white">
 
      <div className="w-full max-h-[800px] max-w-lg mx-4 shadow-2xl rounded-3xl bg-gradient-to-br from-slate-900 via-indigo-900 to-slate-800  bg-slate-900/30 backdrop-blur-lg border border-slate-700/50 font-serif mt-10 ">
     
        <div className="p-4 sm:p-4 lg:p-8 9xl:p-8">
          {/* Header */}
          <div className="text-center mb-8 items-center justify-center">
           <FaUserPlus  className="items-center"/>
            <h2 className="text-xl font-semibold text-slate-200">
              Бүртгүүлэх
            </h2>
          </div>

          {/* Error Display */}
          {displayError && (
            <div className="mb-6 p-4 bg-red-500/20 border border-red-400/50 rounded-xl backdrop-blur-sm">
              <div className="flex items-center">
                <div className="flex-shrink-0">
                  <FiAlertCircle className="h-5 w-5 text-red-400" />
                </div>
                <div className="ml-3">
                  <p className="text-sm text-red-300">{displayError}</p>
                </div>
              </div>
            </div>
          )}

          {/* Form */}
          <form onSubmit={handleSubmit} className="space-y-5 sm:space-y-2">
            <div className="flex flex-col gap-5  lg:flex-row 8xl:lgflex-row" >
            {/* Name Input */}
            <div>
              <label className="block text-sm font-medium mb-2 text-slate-200">
                Нэр
              </label>
              <div className="relative">
                <FiUser className="absolute left-3 top-1/2 transform -translate-y-1/2 text-indigo-200 h-5 w-5" />
                <input
                  type="text"
                  placeholder="Таны нэр"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  required
                  className="w-full pl-12 pr-4 py-3 bg-slate-800/40 border border-slate-100 rounded-xl text-white placeholder-slate-400 focus:outline-none focus:ring-1 focus:ring-indigo-200 focus:border-cyan-400 transition-all duration-200"
                />
              </div>
            </div>
              {/* Phone Input */}
              <div>
              <label className="block text-sm font-medium mb-2 text-slate-200">
                Утасны дугаар
              </label>
              <div className="relative">
                <FiPhone className="absolute left-3 top-1/2 transform -translate-y-1/2 text-indigo-200h-5 w-5" />
                <input
                  type="text"
                  placeholder="99123456"
                  value={phone}
                  onChange={(e) => setPhone(e.target.value)}
                  required
                  className="w-full pl-12 pr-4 py-3 bg-slate-800/40 border border-slate-100 rounded-xl text-white placeholder-slate-400 focus:outline-none focus:ring-1 focus:ring-indigo-200 focus:border-cyan-400 transition-all duration-200"
                />
              </div>
            </div>
            </div>
            {/* Email Input */}
            <div>
              <label className="block text-sm font-medium mb-2 text-slate-200">
                И-мэйл хаяг
              </label>
              <div className="relative">
                <FiMail className="absolute left-3 top-1/2 transform -translate-y-1/2 text-indigo-200h-5 w-5" />
                <input
                  type="email"
                  placeholder="your@email.com"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  required
                  className="w-full pl-12 pr-4 py-3 bg-slate-800/40 border border-slate-100 rounded-xl text-white placeholder-slate-400 focus:outline-none focus:ring-1 focus:ring-white-200 focus:border-cyan-400 transition-all duration-200"
                />
              </div>
            </div>

            {/* Password Input */}
            <div>
              <label className="block text-sm font-medium mb-2 text-slate-200">
                Нууц үг
              </label>
              <div className="relative">
                <FiLock className="absolute left-3 top-1/2 transform -translate-y-1/2 text-indigo-200 h-5 w-5" />
                <input
                  type={showPassword ? "text" : "password"}
                  placeholder="••••••••"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  required
                  className="w-full pl-12 pr-12 py-3 bg-slate-800/40 border border-slate-100 rounded-xl text-white placeholder-slate-400 focus:outline-none focus:ring-1 focus:ring-white focus:border-cyan-200 transition-all duration-200"
                />
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className="absolute right-3 top-1/2 transform -translate-y-1/2 text-slate-400 hover:text-indigo-200transition-colors duration-200"
                >
                  {showPassword ? <FiEyeOff size={20} /> : <FiEye size={20} />}
                </button>
              </div>
            </div>

            {/* Confirm Password Input */}
            <div>
              <label className="block text-sm font-medium mb-2 text-slate-200">
                Нууц үг давтах
              </label>
              <div className="relative">
                <FiLock className="absolute left-3 top-1/2 transform -translate-y-1/2 text-indigo-200 h-5 w-5" />
                <input
                  type={showConfirmPassword ? "text" : "password"}
                  placeholder="••••••••"
                  value={confirmPassword}
                  onChange={(e) => setConfirmPassword(e.target.value)}
                  required
                  className="w-full pl-12 pr-12 py-3 bg-slate-800/40 border border-slate-100 rounded-xl text-white placeholder-slate-400 focus:outline-none focus:ring-1 focus:ring-white focus:border-indigo-400 transition-all duration-200"
                />
                <button
                  type="button"
                  onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                  className="absolute right-3 top-1/2 transform -translate-y-1/2 text-slate-400 hover:text-cyan-200 transition-colors duration-200"
                >
                  {showConfirmPassword ? <FiEyeOff size={20} /> : <FiEye size={20} />}
                </button>
              </div>
            </div>

            {/* Submit Button */}
            <div className="pt-4">
              <button
                type="submit"
                disabled={authLoading}
                className="w-full bg-indigo-400 text-white font-semibold py-3 px-6 rounded-xl transition-all duration-200 transform hover:scale-[1.02] focus:outline-none focus:ring-1  focus:ring-white-400 focus:ring-offset-2 focus:ring-offset-transparent shadow-lg disabled:opacity-50 disabled:cursor-not-allowed disabled:transform-none"
              >
                <div className="flex items-center justify-center gap-2">
                {authLoading ? (
  <>
    <FaSpinner className="animate-spin h-5 w-5 text-white" />
    <span>Түр хүлээнэ үү...</span>
  </>
) : (
  <>
    <span>Бүртгүүлэх</span>
    <FaUserPlus className="h-5 w-5" />
  </>
)}
                </div>
              </button>
            </div>
          </form>

          {/* Footer */}
          <div className="mt-8 text-center">
            <p className="text-sm text-slate-300">
              Бүртгэлтэй юу?{" "}
              <Link
                href="/user/login"
                className="text-cyan-300 hover:text-cyan-200 underline underline-offset-2 transition-colors duration-200 font-medium"
              >
                Нэвтрэх
              </Link>
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}