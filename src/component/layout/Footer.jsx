"use client";
import Link from "next/link";
import Image from "next/image";
import { useState } from "react";
import { FaChevronDown, FaChevronUp, FaFacebook, FaInstagram, FaTwitter, FaMapMarkerAlt, FaPhoneAlt, FaEnvelope } from "react-icons/fa";
import { useService } from "@/context/ServerContext";
import { api } from "@/data/api";

const Footer = () => {
  const [expandedSection, setExpandedSection] = useState(null);
  const { systemInfo, categories, isLoading } = useService();

  if (isLoading) {
    return <div>Loading...</div>;
  }

  const toggleSection = (section) => {
    if (expandedSection === section) {
      setExpandedSection(null);
    } else {
      setExpandedSection(section);
    }
  };

  return (
    <footer className="bg-gradient-to-br from-slate-900 via-indigo-900 to-slate-800 font-serif text-gray-200 pt-12">
      {/* Newsletter Section */}
      <div className="container mx-auto px-4">
       

        {/* Main Footer Content */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8 py-8 ">
          {/* About & Contact */}
          <div>
            <div className="flex items-center gap-3 mb-4">
              {systemInfo?.logo && (
                <img
                  src={`${api.file_url}${systemInfo?.logo}`}
                  alt={systemInfo?.name}
                  width={40}
                  height={40}
                  className="rounded-full bg-white p-1"
                />
              )}
              <h3 className="text-xl font-bold text-white">{systemInfo?.name}</h3>
            </div>
            <p className="text-gray-400 text-sm mb-2">Электрон бараа</p>
            <div className="flex items-center text-gray-400 text-sm mb-2">
              <FaMapMarkerAlt className="mr-2 text-indigo-400" />
              <span>{systemInfo?.address}</span>
            </div>
            <div className="flex items-center text-gray-400 text-sm mb-2">
              <FaPhoneAlt className="mr-2 text-indigo-400" />
              <a href={`tel:${systemInfo?.phone}`} className="hover:text-indigo-300">{systemInfo?.phone}</a>
            </div>
            <div className="flex items-center text-gray-400 text-sm mb-4">
              <FaEnvelope className="mr-2 text-indigo-400" />
              <a href={`mailto:${systemInfo?.email}`} className="hover:text-indigo-300">{systemInfo?.email}</a>
            </div>
            {/* Social Media */}
            <div className="flex gap-4 mt-4">
              <a href="#" className="hover:text-indigo-400"><FaFacebook size={20} /></a>
              <a href="#" className="hover:text-indigo-400"><FaInstagram size={20} /></a>
              <a href="#" className="hover:text-indigo-400"><FaTwitter size={20} /></a>
            </div>
          </div>

          {/* Products */}
          <div>
            <h3 className="text-lg font-semibold mb-4 flex items-center gap-2"><span className="text-indigo-400">•</span> Бүтээгдэхүүн</h3>
            <ul className="space-y-2">
              {categories && categories.slice(0, 5).map((category) => (
                <li key={category._id}>
                  <Link
                    href={`/shop?category=${category._id}`}
                    className="text-gray-300 hover:text-indigo-400"
                  >
                    {category.name}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Quick Links */}
          <div>
            <h3 className="text-lg font-semibold mb-4 flex items-center gap-2"><span className="text-indigo-400">•</span> Шуурхай холбоос</h3>
            <ul className="space-y-2">
              <li>
                <Link href="/" className="text-gray-300 hover:text-indigo-400">Таны бүртгэл</Link>
              </li>
              <li>
                <Link href="/" className="text-gray-300 hover:text-indigo-400">Худалдан авалтын түүх</Link>
              </li>
              <li>
                <Link href="/" className="text-gray-300 hover:text-indigo-400">Сүүлийн үеийн мэдээ блог</Link>
              </li>
              <li>
                <Link href="/" className="text-gray-300 hover:text-indigo-400">Хүргэлт & Хадгалалт</Link>
              </li>
            </ul>
          </div>

          {/* Services */}
          <div>
            <h3 className="text-lg font-semibold mb-4 flex items-center gap-2"><span className="text-indigo-400">•</span> Үйлчилгээ</h3>
            <ul className="space-y-2">
              <li><Link href="/" className="text-gray-300 hover:text-indigo-400">Тусламжийн төв</Link></li>
              <li><Link href="/" className="text-gray-300 hover:text-indigo-400">Үйлчилгээний нөхцөл</Link></li>
              <li><Link href="/" className="text-gray-300 hover:text-indigo-400">Нууцлалын бодлого</Link></li>
              <li><Link href="/" className="text-gray-300 hover:text-indigo-400">Тусламж</Link></li>
              <li><Link href="/" className="text-gray-300 hover:text-indigo-400">Бараа буцаалт</Link></li>
              <li><Link href="/" className="text-gray-300 hover:text-indigo-400">Түгээмэл асуултууд</Link></li>
            </ul>
          </div>
        </div>

        {/* Bottom Footer */}
        <div className="border-t border-white py-6 mt-8">
          <div className="flex flex-col md:flex-row justify-between items-center gap-4">
            <p className="text-gray-400 text-sm text-center md:text-left">
              © 2025 {" "}
              <a className="text-indigo-400 hover:underline" href="https://template.mn" target="_blank" rel="noopener noreferrer">
                www.template.mn
              </a>
              . Бүх эрх хуулиар хамгаалагдсан.
            </p>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
