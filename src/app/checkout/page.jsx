"use client";
import { useState, useRef } from "react";
import Link from "next/link";
import { useCart } from "@/context/CartContext";
import { useService } from "@/context/ServerContext";
import { api } from "@/data/api";
import {
  FaCheckCircle,
  FaExclamationCircle,
  FaChevronLeft,
  FaSpinner,
} from "react-icons/fa";

export default function Checkout() {
  const { cartItems, totalAmount, clearCart } = useCart();
  const { createOrder, orderLoading, orderError, merchantId } = useService();

  
  const [form, setForm] = useState({
    username: "",
    email: "",
    phone: "",
    address: "",
  });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [success, setSuccess] = useState(false);
  const [errorMsg, setErrorMsg] = useState("");
  const [touched, setTouched] = useState({});
  const formRef = useRef(null);

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
    setTouched({ ...touched, [e.target.name]: true });
    setErrorMsg("");
  };

  const validate = () => {
    const errors = {};
    if (!form.username.trim()) errors.username = "Нэрээ оруулна уу";
    if (!form.email.trim()) errors.email = "Имэйл хаяг оруулна уу";
    if (!form.phone.trim()) errors.phone = "Утасны дугаар оруулна уу";
    if (!form.address.trim()) errors.address = "Хаяг оруулна уу";
    // Simple email validation
    if (form.email && !/^[\w-.]+@[\w-]+\.[a-zA-Z]{2,}$/.test(form.email))
      errors.email = "Имэйл буруу байна";
    // Simple phone validation
    if (form.phone && !/^(\+?\d{8,12})$/.test(form.phone.replace(/\s/g, "")))
      errors.phone = "Утасны дугаар буруу байна";
    return errors;
  };
const errors=validate();

const handleSubmit = async (e) => {
  e.preventDefault();

  setTouched({
    username: true,
    email: true,
    phone: true,
    address: true,
  });

  if (Object.keys(errors).length > 0) {
    setErrorMsg("Бүх талбарыг зөв бөглөнө үү.");
    if (formRef.current) {
      const firstError = Object.keys(errors)[0];
      const el = formRef.current.querySelector(`[name="${firstError}"]`);
      if (el) el.focus();
    }
    return;
  }

  setIsSubmitting(true);
  setErrorMsg("");

  const orderProducts = cartItems.map((item) => ({
    product: item.id,
    quantity: item.quantity,
  }));

  const orderData = {
    ...form,
    price: totalAmount,
    status: "pending",
    merchant: merchantId,
    products: orderProducts,
  };

  try {
    await createOrder(orderData);
    setSuccess(true);
    clearCart();
  } catch (err) {
    setErrorMsg(
      orderError || "Захиалга үүсгэхэд алдаа гарлаа. Дахин оролдоно уу."
    );
  } finally {
    setIsSubmitting(false);
  }
};
  if (cartItems.length === 0 && !success) {
    return (
      <div className="container mx-auto px-4 py-20 flex flex-col items-center justify-center min-h-[60vh]">
        <FaExclamationCircle className="text-5xl text-orange-500 mb-4" />
        <h2 className="text-2xl font-semibold mb-2">Таны сагс хоосон байна</h2>
        <p className="mb-6 text-gray-500">Та дэлгүүрээс бараа сонгоно уу.</p>
        <Link
          href="/shop"
          className="inline-flex items-center gap-2 bg-orange-500 text-white px-6 py-3 rounded-lg hover:bg-orange-500 transition-colors font-medium shadow"
        >
          <FaChevronLeft /> Дэлгүүр рүү буцах
        </Link>
      </div>
    );
  }

  if (success) {
    return (
      <div className="container mx-auto px-4 py-20 flex flex-col items-center justify-center min-h-[60vh] animate-fade-in font-serif">
        <FaCheckCircle className="text-6xl text-green-500 mb-4 animate-bounce" />
        <h2 className="text-2xl font-bold mb-2 text-green-700">
          Захиалга амжилттай!
        </h2>
        <p className="mb-6 text-gray-600 text-center max-w-md">
          Таны захиалга амжилттай үүслээ. Бид тун удахгүй тантай холбогдох
          болно. Баярлалаа!
        </p>
        <Link
          href="/shop"
          className="inline-block bg-green-200 text-green-900 px-8 py-3 rounded-lg hover:bg-orange-600 transition-colors font-medium shadow"
        >
          Дэлгүүр рүү буцах
        </Link>
      </div>
    );
  }

  const shippingCost = 0; // Free shipping
  const total = totalAmount + shippingCost;

  return (
    <div className="container mx-auto px-4 py-8 bg-gradient-to-br from-slate-50 to-blue-50 min-hscreen  w-full border border-slate-100 font-serif">
    {/* Breadcrumb */}
    <div className="flex items-center gap-2 text-sm mb-6  animate-fade-in">
      <Link
        href="/"
        className="text-slate-500 hover:text-indigo-600 transition-all duration-300 hover:underline"
      >
        Нүүр
      </Link>
      <span className="text-slate-400">/</span>
      <span className="text-indigo-600 font-semibold">Захиалга</span>
    </div>
  
    <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 animate-fade-in-up">
      {/* Billing Form */}
      <div className="lg:col-span-2 bg-white/80 backdrop-blur-sm rounded-2xl shadow-lg hover:shadow-xl transition-all duration-500 p-6 md:p-8 border border-slate-200/50">
      <h2 className="text-2xl font-bold mb-6 text-indigo-600 flex items-center gap-2 animate-slide-in-left">
            <span className="inline-block w-2 h-6 bg-gradient-to-b from-blue-500 to-indigo-600 rounded-full mr-2 animate-pulse" />
            Захиалгын мэдээлэл
          </h2>
          <form className="space-y-5" onClick={handleSubmit} >
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="group">
                <label className="block text-sm font-medium text-slate-700 mb-1 transition-colors duration-300 group-focus-within:text-indigo-600">
                  Нэр <span className="text-indigo-500">*</span>
                </label>
                <input
                 type="text"
                 name="username"
                 id="username"
                 placeholder="Таны нэр"
                  className={`p-3 w-full text-gray-800 border border-slate-200 rounded-lg focus:outline-none focus:ring-1 focus:ring-indigo-500/50 focus:border-indigo-500  bg-white/90 hover:bg-white ${
                    errors.username && touched.username
                      ? "border-red-400 bg-red-50"
                      : "border-gray-300"
                  }`}
                  value={form.username}
                  onChange={handleChange}
                  />
                  {errors.username && touched.username && (
                    <p className="text-xs text-red-500 mt-1">{errors.username}</p>
                  )}
              </div>
              <div className="group">
                <label className="block text-sm font-medium text-slate-700 mb-1 transition-colors duration-300 group-focus-within:text-indigo-600">
                  Имэйл <span className="text-indigo-500">*</span>
                </label>
                <input
                  type="email"
                  name="email"
                  value={form.email}
                  onChange={handleChange}
                  placeholder="Имэйл хаяг"
                  className="p-3 w-full border text-gray-800 border-slate-200 rounded-lg focus:outline-none focus:ring-1 focus:ring-indigo-500/50 focus:border-indigo-500  bg-white/90 hover:bg-white "
                />
                  {errors.username && touched.email && (
                    <p className="text-xs text-red-500 mt-1">{errors.email}</p>
                  )}
              </div>
            </div>
    
            <div className="group">
              <label className="block text-sm  font-medium text-slate-700 mb-1 transition-colors duration-300 group-focus-within:text-indigo-600">
                Хаяг <span className="text-indigo-500">*</span>
              </label>
              <input
                type="text"
                name="address"
                value={form.address}
                onChange={handleChange}
                placeholder="Хүргүүлэх хаяг"
                className="p-3 w-full text-gray-800 border border-slate-200 rounded-lg focus:outline-none focus:ring-1 focus:ring-indigo-500/50 focus:border-indigo-500  bg-white/90 hover:bg-white "
              />
            </div>
    
            <div className="group">
              <label className="block text-sm font-medium text-slate-700 mb-1 transition-colors duration-300 group-focus-within:text-indigo-600">
                Утас <span className="text-indigo-500">*</span>
              </label>
              <input
                type="tel"
                name="phone"
                value={form.phone}
                onChange={handleChange}
                placeholder="Утасны дугаар"
                className="p-3 w-full text-gray-800 border border-slate-100 rounded-lg focus:outline-none focus:ring-1 focus:ring-indigo-500/50 focus:border-indigo-500 hover:bg-white"
              />
            </div>
            <button
              type="submit"
              disabled={isSubmitting || orderLoading}
              className="w-full bg-gradient-to-r bg-indigo-500 text-white px-8 py-3 rounded-lg hover:scale-105 transition-all ease-in-out duration-300
              cursor-pointer font-semibold text-lg shadow disabled:opacity-60 flex items-center justify-center gap-2"
            >
              {(isSubmitting || orderLoading) && (
                <FaSpinner className="animate-spin h-5 w-5 mr-2 text-white" />
              )}
              {isSubmitting || orderLoading
                ? "Захиалга өгч байна..."
                : "Захиалга өгөх"}
            </button>
          </form>

      </div>
  
      {/* Order Summary */}
      <div className="border border-gray-200 rounded-2xl p-6 md:p-8 h-max sticky top-6">
      <h2 className="text-xl font-bold mb-6 text-indigo-600 flex items-center gap-2">
            <span className="inline-block w-2 h-6 bg-gradient-to-b from-blue-500 to-indigo-600 rounded-full mr-2 animate-pulse" />
            Таны захиалга
          </h2>
        <div className="space-y-4 max-h-96 overflow-y-auto scrollbar-hide pr-2">
        {cartItems.map((item, index) => (
              <div
                key={item.id}
                className="flex items-center gap-4 bg-gradient-to-r from-blue-50/60 to-indigo-50/60 rounded-lg p-2 border border-indigo-100/50 hover:shadow-md transition-all duration-300 transform hover:scale-105 animate-fade-in-up"
                style={{ animationDelay: `${index * 100}ms` }}
              >
                <div className="w-16 h-16 flex-shrink-0 overflow-hidden rounded-md border border-indigo-200 bg-white shadow-sm">
                  <img
                    src={item.images?.[0] ? api.file_url + item.images[0] : "/public/images/device1.jpg"}
                    alt={item.name}
                    className="w-full h-full object-cover transition-transform duration-300 hover:scale-110"
                  />
                </div>
                <div className="flex-1 min-w-0">
                  <p className="text-sm font-medium text-slate-800 line-clamp-2">
                    {item.name}
                  </p>
                  <p className="text-xs text-slate-500">Тоо: {item.quantity}</p>
                </div>
                <p className="text-base font-semibold text-indigo-600 whitespace-nowrap">
                  {Intl.NumberFormat("mn-MN").format(item.price * item.quantity)}₮
                </p>
              </div>
            ))}

        </div>
  
        <hr className="my-6 border-orange-100" />
  
        {/* Төлбөрийн дүн (хүсвэл ашиглана) */}
        <div className="space-y-2 text-base">
          <div className="flex items-center justify-between">
            <span className="text-slate-600">Нийт дүн</span>
            <span className="font-semibold text-indigo-200">{Intl.NumberFormat("mn-MN").format(totalAmount)}₮</span>
          </div>
          <div className="flex items-center justify-between">
            <span className="text-slate-600">Хүргэлт</span>
            <span className="font-semibold text-indigo-200">{shippingCost === 0 ? "Үнэгүй" : `${shippingCost}₮`}</span>
          </div>
          <div className="flex items-center justify-between font-bold text-lg pt-3 border-t border-indigo-100">
            <span className="text-slate-400">Нийт төлөх</span>
            <span className="text-indigo-600">{Intl.NumberFormat("mn-MN").format(total)}₮</span>
          </div>
        </div>
      </div>
    </div>
  </div>
  
  );
}
