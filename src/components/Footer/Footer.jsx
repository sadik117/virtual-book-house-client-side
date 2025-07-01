import { Link } from "react-router-dom";
import bookAnimation from "../../../public/book-footer.json";
import Lottie from "lottie-react";
import { FaEnvelope, FaFacebookF, FaLinkedin, FaTwitter } from "react-icons/fa6";
import { MdDeveloperBoard } from "react-icons/md";

export default function Footer() {
  return (
    <footer className="bg-[#0f172a] text-white py-10">
      <div className="max-w-7xl mx-auto px-4 md:px-6 lg:px-18 ml-0 md:ml-10 grid grid-cols-1 md:grid-cols-3 gap-8">
        {/* Logo & Name */}
        <div className="flex flex-col items-start mt-0 md:-mt-7 ">
          <div className="w-full md:w-1/2">
            <Lottie animationData={bookAnimation} loop={true} />
          </div>
          <h2 className="text-xl font-bold">Virtual Bookshelf</h2>
          <p className="text-sm text-white/70 mt-2">
            Your personal reading companion.
          </p>
        </div>


        {/* Useful Links */}
        <div>
          <h3 className="text-lg font-semibold mb-3">Useful Links</h3>
          <ul className="space-y-2">
            <li>
              <Link to="/terms" className="hover:underline text-white/80">
                Terms & Conditions
              </Link>
            </li>
            <li>
              <Link to="/about-us" className="hover:underline text-white/80">
                About Us
              </Link>
            </li>
            <li>
              <Link to="/contact-us" className="hover:underline text-white/80">
                Contact Us
              </Link>
            </li>
          </ul>
        </div>

        {/* Social Media */}
        <div>
          <h3 className="text-lg font-semibold mb-3">Follow Us</h3>
          <div className="flex gap-4">
            <a href="https://www.facebook.com/sadiksourov11/" target="_blank" className="hover:text-yellow-400 text-2xl"><FaFacebookF /></a>
            <a href="https://x.com/sadiksourov117" target="_blank" className="hover:text-yellow-400 text-2xl"><FaTwitter /></a>
            <a href="https://linkedin.com/in/sadiksourov11" target="_blank" className="hover:text-yellow-400 text-2xl"><FaLinkedin></FaLinkedin></a>
            <a href="mailto:sadiksourov11@gmail.com" className="hover:text-yellow-400 text-2xl"><FaEnvelope /></a>
          </div>
        </div>
      </div>

      <div className="text-start ml-4 md:ml-0 md:text-center text-sm text-white/60 mt-6 md:mt-2">
        © {new Date().getFullYear()} Virtual Bookshelf. All rights reserved.
      </div>
      <div className="text-start ml-4 md:ml-0 md:text-center text-sm text-white/60 mt-6 md:mt-2">
        <MdDeveloperBoard className="inline -mt-0.5"></MdDeveloperBoard> Developed by Sadik Sourov.
      </div>
    </footer>
  );
}
