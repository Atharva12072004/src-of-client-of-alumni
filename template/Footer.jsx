import logo from '../assets/logo.png';
import React, { useRef } from 'react';
import { Link } from "react-router-dom";
import { FaSquareInstagram, FaSquareXTwitter, FaSquareFacebook } from "react-icons/fa6";
import { AiFillLinkedin } from "react-icons/ai";
import { HiLocationMarker } from "react-icons/hi";
import { FiMapPin, FiLink, FiInfo, FiPhone, FiMail } from "react-icons/fi";

const Footer = () => {
    const bgRef = useRef(null);

    // Mouse move handler for animated background
    const handleMouseMove = (e) => {
        const bg = bgRef.current;
        if (!bg) return;
        const rect = bg.getBoundingClientRect();
        const x = e.clientX - rect.left;
        const y = e.clientY - rect.top;
        bg.style.background = `radial-gradient(600px circle at ${x}px ${y}px, rgba(236,72,153,0.18), rgba(168,85,247,0.13), transparent 80%)`;
    };
    const handleMouseLeave = () => {
        const bg = bgRef.current;
        if (!bg) return;
        bg.style.background = '';
    };

    return (
        <footer
            className="w-full relative overflow-hidden border-t-0 bg-gradient-to-br from-pink-50 via-purple-100/80 to-pink-200/90 shadow-2xl rounded-t-3xl px-2 sm:px-6 py-10 mt-12 font-poppins"
            style={{ boxShadow: '0 8px 32px 0 rgba(168,85,247,0.13), 0 1.5px 8px 0 rgba(236,72,153,0.10)' }}
            onMouseMove={handleMouseMove}
            onMouseLeave={handleMouseLeave}
        >
            {/* Animated Gradient Border */}
            <div className="absolute top-0 left-0 w-full h-1 z-10 animate-gradient-move bg-gradient-to-r from-pink-400 via-purple-300 to-pink-500 rounded-t-3xl" />
            <div className="relative z-20 max-w-7xl mx-auto flex flex-col md:flex-row flex-wrap gap-8 md:gap-6 md:divide-x divide-y-0 md:divide-y-0 divide-pink-200">
                {/* Contact & Location Info */}
                <div className="flex-1 flex flex-col justify-between min-w-[220px] min-h-[220px] max-w-full px-0 md:px-6">
                    <h3 className="flex items-center gap-2 text-lg font-extrabold mb-2 text-pink-600 drop-shadow"> <FiMapPin className="text-pink-400" />Contact & Location</h3>
                    <div className="flex items-center gap-2 text-gray-700 font-medium mb-1">
                        <HiLocationMarker className="text-pink-600 h-20 w-20 text-xl" />
                        <span>Plot No. 17, Sion-Panvel Expressway, Opp. Kharghar Railway Station, Sector 4, Kharghar, Navi Mumbai - 410 210</span>
                    </div>
                    <div className="text-gray-700 text-sm">
                        <p className="flex items-center gap-2"> <FiMail className="text-pink-600 h-5 w-5 text-xl" /> registrar@acpce.ac.in</p>
                        <p className="flex items-center gap-2"> <FiPhone className="text-pink-600 h-5 w-5 text-xl" /> 022-27745722/32</p>
                        <p className="flex items-center gap-2"> <FiPhone className="text-pink-600 h-5 w-5 text-xl" /> +91 9769111241</p>
                    </div>
                </div>
                {/* Map */}
                <div className="flex-1 flex flex-col justify-between min-w-[220px] min-h-[220px] max-w-full px-0 md:px-6">
                    <h3 className="flex items-center gap-2 text-lg font-extrabold mb-2 text-pink-600 drop-shadow"> <FiMapPin className="text-pink-400" />Location Map</h3>
                    <div className="w-full aspect-video overflow-hidden border rounded-lg border-pink-100 flex-1 min-h-[190px] max-h-[240px] relative z-10">
  <iframe
    title="ACPCE Location"
    src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3771.7540385850225!2d73.05895307497623!3d19.03055698216469!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x3be7c24052e100f3%3A0xb6e3e4259b43a898!2sA.%20C.%20Patil%20College%20of%20Engineering!5e0!3m2!1sen!2sin!4v1750861489509!5m2!1sen!2sin"
    width="100%"
    height="100%"
    allowFullScreen=""
    loading="lazy"
    referrerPolicy="no-referrer-when-downgrade"
    className="rounded-lg border"
    style={{ border: '2px solid #ccc', borderRadius: '10px' }}
  ></iframe>
</div>


                </div>
                {/* Quick Links */}
                <div className="flex-1 flex flex-col justify-between min-w-[220px] min-h-[220px] max-w-full px-0 md:px-6">
                    <h3 className="flex items-center gap-2 text-lg font-extrabold mb-2 text-pink-600 drop-shadow"> <FiLink className="text-pink-400" />Quick Links</h3>
                    <div className="flex flex-col gap-3 text-gray-700 text-sm">
                        <Link to="/" className="hover:text-purple-600 hover:bg-purple-50 transition w-fit px-2 py-1 rounded-lg">Home</Link>
                        <Link to="/jobs" className="hover:text-purple-600 hover:bg-purple-50 transition w-fit px-2 py-1 rounded-lg">Jobs</Link>
                        <Link to="/news" className="hover:text-purple-600 hover:bg-purple-50 transition w-fit px-2 py-1 rounded-lg">News</Link>
                        <Link to="/alumni" className="hover:text-purple-600 hover:bg-purple-50 transition w-fit px-2 py-1 rounded-lg">Alumni</Link>
                        <Link to="/about" className="hover:text-purple-600 hover:bg-purple-50 transition w-fit px-2 py-1 rounded-lg">About</Link>
                        <Link to="/admin" className="hover:text-purple-600 hover:bg-purple-50 transition w-fit px-2 py-1 rounded-lg">Console Login</Link>
                    </div>
                </div>
                {/* About & Logo with Social Handles */}
                <div className="flex-1 flex flex-col justify-between min-w-[220px] min-h-[220px] max-w-full px-0 md:px-6">
                    <h3 className="flex items-center gap-2 text-lg font-extrabold mb-2 text-pink-600 drop-shadow"> <FiInfo className="text-pink-400" />About</h3>
                    <Link to="/" className="flex items-center gap-3 mb-2">
                        <img src={logo} alt="logo" width="40" height="40" className="rounded-lg shadow" />
                        <span className="font-bold text-lg text-pink-700">ACPCE Alumni Portal</span>
                    </Link>
                    <p className="text-gray-700 text-sm mb-2">“An alumni network fostering collaboration, bolstering job prospects, solidifying support structures, and keeping members informed about ongoing institute activities.”</p>
                    <div className="flex gap-3 mt-2">
                        <a href="https://www.instagram.com/acpceofficial" target="_blank" rel="noopener noreferrer" className="text-pink-500 hover:text-pink-600 transition-transform transform hover:scale-110 hover:drop-shadow-[0_0_8px_rgba(236,72,153,0.5)] hover:animate-pulse">
                            <FaSquareInstagram size={32} />
                        </a>
                        <a href="https://in.linkedin.com/in/acpce-alumni-portal-official" target="_blank" rel="noopener noreferrer" className="text-blue-700 hover:text-blue-800 transition-transform transform hover:scale-110 hover:drop-shadow-[0_0_8px_rgba(37,99,235,0.5)] hover:animate-pulse">
                            <AiFillLinkedin size={36} />
                        </a>
                        <a href="https://www.facebook.com/profile.php?id=100085571713331" target="_blank" rel="noopener noreferrer" className="text-blue-600 hover:text-blue-700 transition-transform transform hover:scale-110 hover:drop-shadow-[0_0_8px_rgba(59,130,246,0.5)] hover:animate-pulse">
                            <FaSquareFacebook size={32} />
                        </a>
                        <a href="https://x.com/acpceofficial" target="_blank" rel="noopener noreferrer" className="text-black hover:text-gray-700 transition-transform transform hover:scale-110 hover:drop-shadow-[0_0_8px_rgba(0,0,0,0.4)] hover:animate-pulse">
                            <FaSquareXTwitter size={32} />
                        </a>
                    </div>
                </div>
            </div>
            <div className="border-t border-pink-100 mt-8 pt-4 text-center text-gray-400 text-xs relative z-10">
                ©{new Date().getFullYear()} ACPCE Alumni Portal. All Rights Reserved
            </div>
            {/* Keyframes for animated gradient */}
            <style>{`
                @keyframes gradient-move {
                    0%, 100% { background-position: 0% 50%; }
                    50% { background-position: 100% 50%; }
                }
                .animate-gradient-move {
                    background-size: 200% 200%;
                    animation: gradient-move 8s ease-in-out infinite;
                }
            `}</style>
        </footer>
    );
};

export default Footer;