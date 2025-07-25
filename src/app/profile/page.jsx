"use client";

import { useEffect } from "react";
import { useRouter } from "next/navigation";
import { useService } from "@/context/ServerContext";
import {
  FaUser,
  FaEnvelope,
  FaPhone,
  FaSignOutAlt,
  FaShoppingBag,
  FaHeart,
  FaEdit,
  FaCog,
} from "react-icons/fa";
import Link from "next/link";

export default function ProfilePage() {
  const router = useRouter();
  const { user, logout } = useService();
  console.log("user:",user);
  useEffect(() => {
    if (user === null) {
      router.replace("/user/login");
    }
  }, [user, router]);

  if (!user) {
    return null;
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-indigo-50 to-purple-50 py-8 px-4 sm:px-6 lg:px-8">
      <div className="max-w-5xl mx-auto font-serif">
        {/* Header Card */}
        <div className="bg-white rounded-xl shadow-sm overflow-hidden mb-6">
          <div className="bg-gradient-to-r from-indigo-400 via-indigo-500 to-purple-500 px-6 py-6 relative">
            <div className="absolute top-0 right-0 w-32 h-32 bg-white opacity-10 rounded-full -mr-16 -mt-16"></div>
            <div className="absolute bottom-0 left-0 w-24 h-24 bg-white opacity-10 rounded-full -ml-12 -mb-12"></div>
            <div className="relative z-10">
              <h1 className="text-4xl font-bold text-white mb-2 flex items-center">
                <div className="bg-white bg-opacity-20 p-3 rounded-full mr-4">
                  <FaUser className="text-2xl" />
                </div>
                Миний хуудас
              </h1>
              <p className="text-indigo-100 text-lg">Таны хувийн мэдээлэл болон тохиргоо</p>
            </div>
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3  gap-6">
          {/* User Info Card */}
          <div className="lg:col-span-2 ">
            <div className="bg-white rounded-2xl shadow-sm p-8">
              <div className="flex items-center justify-between mb-6">
                <h2 className="text-2xl font-bold text-gray-800 flex items-center">
                  <FaUser className="mr-3 text-indigo-400" />
                  Хувийн мэдээлэл
                </h2>
                <button className="flex items-center px-4 py-2 bg-indigo-50 text-indigo-600 rounded-lg hover:bg-indigo-100 transition duration-200">
                  <FaEdit className="mr-2" />
                  Засах
                </button>
              </div>
              
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="space-y-6">
                  <div className="flex items-center p-4 bg-gray-50 rounded-xl">
                    <div className="bg-indigo-100 p-3 rounded-full mr-4">
                      <FaUser className="text-indigo-500" />
                    </div>
                    <div>
                      <p className="text-sm text-gray-500 font-medium">Нэр</p>
                      <p className="text-lg font-semibold text-gray-800">name</p>
                    </div>
                  </div>
                  
                  <div className="flex items-center p-4 bg-gray-50 rounded-xl">
                    <div className="bg-indigo-100 p-3 rounded-full mr-4">
                      <FaEnvelope className="text-indigo-500" />
                    </div>
                    <div>
                      <p className="text-sm text-gray-500 font-medium">И-мэйл</p>
                      <p className="text-lg font-semibold text-gray-800">email</p>
                    </div>
                  </div>
                </div>
                
                <div className="space-y-6">
                  <div className="flex items-center p-4 bg-gray-50 rounded-xl">
                    <div className="bg-indigo-100 p-3 rounded-full mr-4">
                      <FaPhone className="text-indigo-500" />
                    </div>
                    <div>
                      <p className="text-sm text-gray-500 font-medium">Утас</p>
                      <p className="text-lg font-semibold text-gray-800">94245181</p>
                    </div>
                  </div>
                  
                  <div className="flex items-center p-4 bg-gradient-to-r from-indigo-50 to-purple-50 rounded-xl border border-indigo-100">
                    <div className="bg-indigo-400 p-3 rounded-full mr-4">
                      <FaCog className="text-white" />
                    </div>
                    <div>
                      <p className="text-sm text-indigo-600 font-medium">Статус</p>
                      <p className="text-lg font-semibold text-indigo-700">Идэвхтэй хэрэглэгч</p>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Quick Actions Sidebar */}
          <div className="space-y-6">
            {/* Quick Links Card */}
            <div className="bg-white rounded-2xl shadow-sm p-6">
              <h3 className="text-xl font-bold text-gray-800 mb-4 flex items-center">
                <div className="bg-indigo-100 p-2 rounded-lg mr-3">
                  <FaShoppingBag className="text-indigo-500" />
                </div>
                Түргэн холбоос
              </h3>
              <div className="space-y-3">
                <Link
                  href="/orders"
                  className="flex items-center p-4 bg-gradient-to-r from-indigo-50 to-indigo-100 rounded-xl hover:from-indigo-100 hover:to-indigo-200 transition duration-200 group"
                >
                  <div className="bg-indigo-400 p-2 rounded-lg mr-3 group-hover:bg-indigo-500 transition duration-200">
                    <FaShoppingBag className="text-white" />
                  </div>
                  <div>
                    <p className="font-semibold text-gray-800">Миний захиалгууд</p>
                    <p className="text-sm text-gray-500">Захиалгын түүх үзэх</p>
                  </div>
                </Link>
                
                <Link
                  href="/wishlist"
                  className="flex items-center p-4 bg-gradient-to-r from-purple-50 to-pink-50 rounded-xl hover:from-purple-100 hover:to-pink-100 transition duration-200 group"
                >
                  <div className="bg-purple-400 p-2 rounded-lg mr-3 group-hover:bg-purple-500 transition duration-200">
                    <FaHeart className="text-white" />
                  </div>
                  <div>
                    <p className="font-semibold text-gray-800">Хадгалсан бараа</p>
                    <p className="text-sm text-gray-500">Таалагдсан бүтээгдэхүүн</p>
                  </div>
                </Link>
              </div>
            </div>

            {/* Account Actions Card */}
            <div className="bg-white rounded-2xl shadow-sm p-6">
              <h3 className="text-xl font-bold text-gray-800 mb-4">Аккаунт</h3>
              <div className="space-y-3">
                <button className="w-full flex items-center justify-center p-4 bg-gradient-to-r from-gray-50 to-gray-100 rounded-xl hover:from-gray-100 hover:to-gray-200 transition duration-200">
                  <FaCog className="mr-3 text-gray-600" />
                  <span className="font-semibold text-gray-700">Тохиргоо</span>
                </button>
                <button
                  onClick={() => {
                    logout();
                    router.replace("/");
                  }}
                  className="w-full flex items-center justify-center p-4 bg-gradient-to-r from-red-500 to-red-600 text-white rounded-xl hover:from-red-600 hover:to-red-700 transition duration-200 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-red-500 shadow-lg"
                >
                  <FaSignOutAlt className="mr-3" />
                  <span className="font-semibold">Гарах</span>
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}