"use client";

import { useEffect } from "react";
import { useParams, useRouter } from "next/navigation";
import { useService } from "@/context/ServerContext";
import { FaSpinner, FaArrowLeft } from "react-icons/fa";

export default function OrderDetailPage() {
  const router = useRouter();
  const params = useParams();
  const { user, orderDetails, orderDetailsLoading, fetchOrderDetails } =
    useService();
  console.log("order details:",orderDetails);


  useEffect(() => {
    if (!user) {
      router.replace("/user/login");
      return;
    }
  }, [user, router]);

  // FIX: Remove fetchOrderDetails from dependencies to prevent infinite loop
  useEffect(() => {
    if (params.id && user) {
      fetchOrderDetails(params.id);
    }
  }, [params.id, user]); // Only depend on params.id and user


  if (!user) return null;

  if (orderDetailsLoading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <FaSpinner className="animate-spin text-4xl text-orange-500" />
      </div>
    );
  }

  if (!orderDetails) {
    return (
      <div className="min-h-screen flex flex-col items-center justify-center space-y-4">
        <p className="text-xl text-gray-600 font-medium">Захиалга олдсонгүй.</p>
        <button
          onClick={() => router.back()}
          className="px-6 py-2 bg-indigo-400 text-white rounded-lg hover:bg-orange-600 transition-colors flex items-center gap-2"
        >
          <FaArrowLeft />
          Буцах
        </button>
      </div>
    );
  }
  
 
  return (
    <div className="container mx-auto px-4 py-8 min-h-screen ">
      <div className="bg-gradient-to-r from-indigo-400 via-indigo-500 to-purple-500  rounded-xl shadow-sm p-6 font-serif">
        <div className="flex max-[640px]:flex-col gap-2 min-[641px]:flex-row  items-center justify-between mb-8">
          {/* title */}
          <div className="flex items-center gap-4">
            <button
              onClick={() => router.back()}
              className="p-2 hover:bg-gray-100 rounded-full transition-colors"
            >
              <FaArrowLeft className="text-gray-600" />
            </button>
            <h1 className="text-2xl font-semibold">Захиалгын дэлгэрэнгүй</h1>
          </div>
          {/* idevhtei eseh */}
          <div className="flex items-center gap-3">
            <span
              className={`px-4 py-2 rounded-full text-sm font-medium ${
                orderDetails.isPaid
                  ? "bg-green-100 text-green-700"
                  : orderDetails.status === "pending"
                  ? "bg-yellow-100 text-yellow-700"
                  : "bg-gray-100 text-gray-700"
              }`}
            >
              {orderDetails.isPaid ? "Төлөгдсөн" : orderDetails.status}
            </span>
            {orderDetails.isActive && (
              <span className="px-4 py-2 rounded-full text-sm font-medium bg-blue-100 text-blue-700">
                Идэвхтэй
              </span>
            )}
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          <div>
            <h2 className="text-lg font-semibold mb-4">Захиалгын мэдээлэл</h2>
            <div className="space-y-3">
              <p className="text-gray-600">
                <span className="font-medium">Захиалгын ID:</span>{" "}
                {orderDetails._id}
              </p>
              <p className="text-gray-600">
                <span className="font-medium">Огноо:</span>{" "}
                {new Date(orderDetails.createdAt).toLocaleDateString()}
              </p>
              <p className="text-gray-600">
                <span className="font-medium">Нийт дүн:</span>{" "}
                <span className="text-orange-500 font-medium">
                  {Intl.NumberFormat("mn-MN").format(orderDetails.price)}₮
                </span>
              </p>
            </div>
          </div>

          <div>
            <h2 className="text-lg font-semibold mb-4">
              Захиалагчийн мэдээлэл
            </h2>
            <div className="space-y-3">
              <p className="text-gray-600">
                <span className="font-medium">Нэр:</span>{" "}
                {orderDetails.username}
              </p>
              <p className="text-gray-600">
                <span className="font-medium">Имэйл:</span> {orderDetails.email}
              </p>
              <p className="text-gray-600">
                <span className="font-medium">Утас:</span> {orderDetails.phone}
              </p>
              <p className="text-gray-600">
                <span className="font-medium">Хаяг:</span>{" "}
                {orderDetails.address}
              </p>
            </div>
          </div>
        </div>

        <div className="mt-8">
          <h2 className="text-lg font-semibold mb-4">
            Захиалсан бүтээгдэхүүнүүд
          </h2>
          <div className="overflow-x-auto">
            <table className="min-w-full text-sm bg-white text-gray-700 ">
              <thead>
                <tr className="bg-gray-50 text-left">
                  <th className="px-6 py-4 rounded-l-lg">Бүтээгдэхүүн</th>
                  <th className="px-6 py-4">Тоо ширхэг</th>
                  <th className="px-6 py-4">Нэгж үнэ</th>
                  <th className="px-6 py-4 rounded-r-lg">Нийт</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-100 ">
                {orderDetails.products.map((item) => (
                  <tr key={item.id}>
                    <td className="px-6 py-4">
                      <div className="flex items-center gap-4">
                        <span className="font-medium">{item.name || 'Unknown Product'}</span>
                      </div>
                    </td>
                    <td className="px-6 py-4">{item.quantity}</td>
                    <td className="px-6 py-4">
                      {Intl.NumberFormat("mn-MN").format(item.price)}₮
                    </td>
                    <td className="px-6 py-4 font-medium">
                      {Intl.NumberFormat("mn-MN").format(
                        item.price * item.quantity
                      )}
                      ₮
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </div>
  );
}
