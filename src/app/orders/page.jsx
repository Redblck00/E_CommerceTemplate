"use client";

import { useEffect } from "react";
import { useRouter } from "next/navigation";
import { useService } from "@/context/ServerContext";
import { FaShoppingBag, FaSpinner, FaBox } from "react-icons/fa";

export default function OrdersPage() {
  const router = useRouter();
  const { user, orderHistory, orderLoading, fetchOrderHistory } = useService();

  useEffect(() => {
    if (!user) {
      router.replace("/user/login");
    }
  }, [user, router]);

  useEffect(() => {
    fetchOrderHistory();
  }, [fetchOrderHistory]);

  const handleOrderClick = (orderId) => {
    router.push(`/orders/${orderId}`);
  };

  // if (!user) return null;

  if (orderLoading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <FaSpinner className="animate-spin text-4xl text-orange-500" />
      </div>
    );
  }

  if (!orderHistory || orderHistory.length === 0) {
    return (
      <div className="min-h-screen flex flex-col items-center justify-center space-y-4">
        <FaShoppingBag className="text-6xl text-gray-300" />
        <p className="text-xl text-gray-600 font-medium">
          Одоогоор захиалгын түүх хоосон байна.
        </p> 
        <button
          onClick={() => router.push("/shop")}
          className="px-6 py-2 bg-indigo-500 text-white rounded-lg hover:bg-indigo-600 transition-colors flex items-center gap-2"
        >
          <FaBox />
          Дэлгүүрлэх
        </button>
      </div>
    );
  }

  return (
    <div className="container mx-auto px-4 py-8 min-h-screen">
      <div className="bg-white rounded-xl shadow-sm p-6 bg-gradient-to-r from-indigo-400 via-indigo-500 to-purple-500 px-6 py-6 relative font-serif">
        <div className="flex items-center gap-3 mb-8">
          <FaShoppingBag className="text-2xl text-indigo-600" />
          <h1 className="text-2xl font-semibold text-gray-800">Миний захиалгууд</h1>
        </div>

        <div className="overflow-x-auto ">
          <table className="min-w-full text-sm bg-white">
            <thead>
              <tr className="bg-gray-100 text-left text-gray-800">
                <th className="px-6 py-4 rounded-l-md">#</th>
                <th className="px-6 py-4">Захиалгын ID</th>
                <th className="px-6 py-4">Огноо</th>
                <th className="px-6 py-4">Нийт дүн</th>
                <th className="px-6 py-4 rounded-r-lg">Төлөв</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-100 text-gray-800">
              {orderHistory.map((order, idx) => (
                <tr
                  key={order._id || order.id}
                  onClick={() => handleOrderClick(order._id || order.id)}
                  className=" hover:bg-gray-50 transition-colors cursor-pointer"
                >
                  <td className="px-6 py-4">{idx + 1}</td>
                  <td className="px-6 py-4 font-medium">
                    {order.orderNumber || order._id}
                  </td>
                  <td className="px-6 py-4">
                    {new Date(order.createdAt).toLocaleDateString()}
                  </td>
                  <td className="px-6 py-4 font-medium text-orange-500">
                    {Intl.NumberFormat("mn-MN").format(order.price)}₮
                  </td>
                  <td className="px-6 py-4">
                    <span
                      className={`px-3 py-1 rounded-full text-xs font-medium ${
                        order.status === "paid"
                          ? "bg-green-100 text-green-700"
                          : order.status === "pending"
                          ? "bg-yellow-100 text-yellow-700"
                          : "bg-gray-100 text-gray-700"
                      }`}
                    >
                      {order.status}
                    </span>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}
