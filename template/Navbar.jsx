import React, { useState } from "react";
import { Link } from "react-router-dom";
import { useMediaQuery } from "react-responsive";
import { BorderButton, PrimaryButton } from "../components/Buttons";
import LoginSignup from "../pages/LoginSignup";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { useRecoilValue } from "recoil";
import { userAtom } from "../store/atoms/User";
import { Avatar } from "@mui/material";
import Avatar1 from "../assets/avatar-22.png";
import logo from "../assets/logo.png";
import { motion, AnimatePresence } from "framer-motion";

const navLinks = [
  { name: "Home", path: "/" },
  { name: "Alumni", path: "/alumni" },
  { name: "Jobs", path: "/jobs" },
  { name: "NewsHub", path: "/news" },
  { name: "Polls", path: "/polls" },
  { name: "About Us", path: "/about" },
];

const Navbar = () => {
  const [navOpen, setNavOpen] = useState(false);
  const [dialogOpen, setDialogOpen] = useState("");
  const [profileDropdown, setProfileDropdown] = useState(false);
  const user = useRecoilValue(userAtom);
  const isLaptop = useMediaQuery({ minWidth: 780 });
  const currentPage = window.location.pathname;

  const notify = (msg) => {
    toast.info(msg, {
      position: "top-right",
      autoClose: 4000,
      hideProgressBar: false,
      closeOnClick: true,
      pauseOnHover: false,
      draggable: false,
      progress: undefined,
      theme: "colored",
    });
  };

  // Animation variants for mobile menu
  const menuVariants = {
    hidden: { x: "100%", opacity: 0 },
    visible: { x: 0, opacity: 1, transition: { type: "spring", stiffness: 300, damping: 30 } },
    exit: { x: "100%", opacity: 0, transition: { duration: 0.2 } },
  };

  return (
    <>
      <nav className="fixed top-0 left-0 right-0 z-50 bg-gradient-to-br from-pink-50 via-purple-100/80 to-pink-200/90 backdrop-blur-lg shadow-lg rounded-b-2xl px-4 py-2 flex items-center justify-between">
        {/* Logo */}
        <Link to="/" className="flex items-center gap-2 group">
          <motion.img
            src={logo}
            alt="logo"
            className="w-12 h-12 drop-shadow-lg group-hover:scale-110 transition-transform"
            transition={{ type: "spring", stiffness: 200 }}
          />
          <span className="text-lg sm:text-xl md:text-2xl font-bold text-gray-800 group-hover:text-pink-600 transition-colors select-none">
            ACPCE Alumni Portal
          </span>
        </Link>
        {/* Desktop Nav Links */}
        <ul className="hidden min-[1050px]:flex gap-2 items-center">
          {navLinks.map((link) => (
            <li key={link.path}>
              <Link
                to={link.path}
                className={`px-4 py-2 rounded-full font-medium transition-all duration-200 hover:bg-pink-100 hover:text-pink-600 focus:outline-none focus:ring-2 focus:ring-pink-300 ${
                  currentPage === link.path ? "bg-pink-500 text-white shadow-md" : "text-gray-700"
                }`}
              >
                {link.name}
            </Link>
              </li>
          ))}
        </ul>
        {/* Desktop Auth/Profile */}
        {isLaptop && (
          <div className="flex items-center gap-2 relative">
            {!user.basic.isLoggedIn ? (
              <>
                <div onClick={() => setDialogOpen("login")}> <PrimaryButton name="Login" /> </div>
                <div onClick={() => setDialogOpen("signup")}> <BorderButton name="Signup" /> </div>
              </>
            ) : (
              <div className="relative">
                <button
                  className="focus:outline-none"
                  onClick={() => setProfileDropdown((prev) => !prev)}
                  onBlur={() => setTimeout(() => setProfileDropdown(false), 150)}
                >
                  <Avatar alt="profile" src={user?.profilePic || Avatar1} className="cursor-pointer border-2 border-pink-400" />
                </button>
                <AnimatePresence>
                  {profileDropdown && (
                    <motion.div
                      initial={{ opacity: 0, y: -10 }}
                      animate={{ opacity: 1, y: 0 }}
                      exit={{ opacity: 0, y: -10 }}
                      className="absolute right-0 mt-2 w-40 bg-white/90 rounded-xl shadow-lg py-2 z-50 border border-pink-100"
                    >
                      <Link
                        to="/profile"
                        className="block px-4 py-2 text-gray-700 hover:bg-pink-50 hover:text-pink-600 rounded-lg transition"
                        onClick={() => setProfileDropdown(false)}
                      >
                        Profile
                      </Link>
                      {/* Add more dropdown items here if needed */}
                    </motion.div>
                  )}
                </AnimatePresence>
            </div>
            )}
          </div>
        )}
        {/* Hamburger Icon */}
        <button
          className="block min-[1050px]:hidden items-center justify-center p-2 rounded-full hover:bg-pink-100 transition"
          onClick={() => setNavOpen((prev) => !prev)}
          aria-label="Open menu"
        >
          <svg
            className={`w-7 h-7 text-pink-600 transition-transform ${navOpen ? "rotate-90" : "rotate-0"}`}
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d={
                navOpen
                  ? "M6 18L18 6M6 6l12 12" // X icon
                  : "M4 6h16M4 12h16M4 18h16" // Hamburger
              }
            />
          </svg>
        </button>
        {/* Mobile Menu Overlay */}
        <AnimatePresence>
          {navOpen && (
            <motion.div
              key="mobile-menu"
              initial="hidden"
              animate="visible"
              exit="exit"
              variants={menuVariants}
              className="fixed top-0 right-0 w-4/5 max-w-xs h-screen bg-white/80 backdrop-blur-2xl shadow-2xl z-[100] flex flex-col p-6 gap-4 rounded-l-3xl border-l border-pink-100"
            >
              <div className="flex justify-between items-center mb-6">
                <Link to="/" onClick={() => setNavOpen(false)} className="flex items-center gap-2">
                  <img src={logo} alt="logo" className="w-10 h-10" />
                  <span className="font-bold text-lg text-pink-600">ACPCE Alumni Portal</span>
                </Link>
                <button
                  onClick={() => setNavOpen(false)}
                  className="p-2 rounded-full hover:bg-pink-100 transition"
                  aria-label="Close menu"
                >
                  <svg className="w-7 h-7 text-pink-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                  </svg>
                </button>
            </div>
              <ul className="flex flex-col gap-2">
                {navLinks.map((link) => (
                  <li key={link.path}>
                    <Link
                      to={link.path}
                      className={`block px-4 py-3 rounded-xl font-medium text-lg transition-all duration-200 hover:bg-pink-100 hover:text-pink-600 ${
                        currentPage === link.path ? "bg-pink-500 text-white shadow-md" : "text-gray-700"
                      }`}
                      onClick={() => setNavOpen(false)}
                    >
                      {link.name}
                    </Link>
            </li>
                ))}
            {user.basic.isLoggedIn && (
                  <li>
                    <Link
                      to="/profile"
                      className="block px-4 py-3 rounded-xl font-medium text-lg transition-all duration-200 hover:bg-pink-100 hover:text-pink-600 text-gray-700"
                      onClick={() => setNavOpen(false)}
                    >
                      Profile
                    </Link>
              </li>
            )}
            {!user.basic.isLoggedIn && (
                  <li className="flex gap-2 mt-2">
                    <button
                      className="flex-1 bg-pink-500 text-white rounded-xl py-2 font-semibold shadow hover:bg-pink-600 transition"
                      onClick={() => {
                        setDialogOpen("login");
                        setNavOpen(false);
                      }}
                    >
                      Login
                    </button>
                    <button
                      className="flex-1 border-2 border-pink-500 text-pink-600 rounded-xl py-2 font-semibold hover:bg-pink-50 transition"
                      onClick={() => {
                        setDialogOpen("signup");
                        setNavOpen(false);
                      }}
                >
                      Signup
                    </button>
              </li>
            )}
        </ul>
            </motion.div>
          )}
        </AnimatePresence>
      </nav>
      {/* Login/Signup Dialog */}
      {dialogOpen !== "" && (
        <LoginSignup
          type={dialogOpen}
          handleClose={() => setDialogOpen("")}
          callToast={notify}
        />
      )}
      {/* Toast Notifications */}
      <ToastContainer
        position="top-right"
        autoClose={3000}
        hideProgressBar={false}
        newestOnTop={false}
        closeOnClick
        rtl={false}
        pauseOnFocusLoss
        draggable={false}
        pauseOnHover={false}
        theme="light"
      />
    </>
  );
};

export default Navbar;
