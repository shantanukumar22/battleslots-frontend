// import { Link, useLocation } from "react-router-dom";
// import { useContext } from "react";
// import { AuthContext } from "../context/AuthContext";
// import {
//   FaHome,
//   FaUser,
//   FaPencilAlt,
//   FaListAlt,
//   FaSignOutAlt,
// } from "react-icons/fa"; // Importing icons

// function Sidebar() {
//   const { pathname } = useLocation();
//   const { user, logout } = useContext(AuthContext);

//   const linkClass = (path) =>
//     pathname === path
//       ? "bg-indigo-600 text-white p-3 rounded-lg flex items-center space-x-3"
//       : "hover:bg-gray-700 p-3 rounded-lg flex items-center space-x-3";

//   return (
//     <div className="w-64 h-screen bg-gray-800 text-white flex flex-col justify-between fixed left-0 top-0 shadow-lg">
//       <div>
//         <div className="flex items-center justify-center py-4 border-b border-gray-700">
//           <h2 className="text-2xl font-semibold">Valo Play</h2>
//         </div>
//         <div className="flex flex-col p-4 space-y-2">
//           {/* Dashboard */}
//           <Link to="/" className={linkClass("/dashboard")}>
//             <FaHome />
//             <span>Dashboard</span>
//           </Link>

//           {/* Book Slot */}
//           <Link to="/book" className={linkClass("/book")}>
//             <FaPencilAlt />
//             <span>Book Slot</span>
//           </Link>

//           {/* Transactions */}
//           <Link to="/transactions" className={linkClass("/transactions")}>
//             <FaListAlt />
//             <span>Transactions</span>
//           </Link>

//           {/* Profile */}
//           <Link to="/profile" className={linkClass("/profile")}>
//             <FaUser />
//             <span>Profile</span>
//           </Link>
//           <Link to="/request-payout" className={linkClass("/request-payout")}>
//             Request Payout
//           </Link>
//           <Link to="/add-money" className={linkClass("/add-money")}>
//             Add Money
//           </Link>

//           {/* Admin Links */}
//           {user?.isAdmin && (
//             <div>
//               <div className="mt-4 text-lg font-semibold">Admin Panel</div>

//               {/* Admin Payouts */}
//               <Link to="/admin/payouts" className={linkClass("/admin/payouts")}>
//                 <FaListAlt />
//                 <span>Admin Payouts</span>
//               </Link>
//               {user?.isAdmin && (
//                 <Link
//                   to="/admin/deposits"
//                   className={linkClass("/admin/deposits")}
//                 >
//                   Manual Deposits
//                 </Link>
//               )}

//               {/* Time Slot Management */}
//               <div className="mt-2 space-y-2">
//                 <Link
//                   to="/admin/create-slot"
//                   className={linkClass("/admin/create-slot")}
//                 >
//                   <FaPencilAlt />
//                   <span>Create Time Slot</span>
//                 </Link>
//                 <Link
//                   to="/admin/manage-slots"
//                   className={linkClass("/admin/manage-slots")}
//                 >
//                   <FaListAlt />
//                   <span>Manage Time Slots</span>
//                 </Link>
//               </div>
//               <Link to="/admin" className={linkClass("/admin")}>
//                 <FaListAlt />
//                 <span>Admin Dashboard</span>
//               </Link>
//             </div>
//           )}
//         </div>
//       </div>

//       {/* Logout */}
//       <div className="p-4 border-t border-gray-700">
//         <button
//           onClick={logout}
//           className="bg-red-600 hover:bg-red-700 p-3 w-full rounded-lg text-white font-semibold flex items-center space-x-3"
//         >
//           <FaSignOutAlt />
//           <span>Logout</span>
//         </button>
//       </div>
//     </div>
//   );
// }

// export default Sidebar;
// import { Link, useLocation } from "react-router-dom";
// import { useContext } from "react";
// import { AuthContext } from "../context/authContext";
// import {
//   FaHome,
//   FaUser,
//   FaPencilAlt,
//   FaListAlt,
//   FaSignOutAlt,
//   FaMoneyBillWave,
//   FaCreditCard,
//   FaShieldAlt,
//   FaClipboardList,
//   FaCalendarPlus,
//   FaCalendarCheck,
//   FaTachometerAlt,
//   FaTimes,
//   FaArrowAltCircleRight,
// } from "react-icons/fa";

// function Sidebar({ menuOpen, setMenuOpen }) {
//   const { pathname } = useLocation();
//   const { user, logout } = useContext(AuthContext);

//   const handleLinkClick = () => {
//     if (window.innerWidth < 768) {
//       setMenuOpen(false);
//     }
//   };

//   const linkClass = (path) =>
//     pathname === path
//       ? "bg-red-600 text-white p-3 rounded-lg flex items-center space-x-3"
//       : "hover:bg-gray-700 text-gray-300 p-3 rounded-lg flex items-center space-x-3 transition-colors duration-200";

//   return (
//     <>
//       {/* Dark overlay for mobile when sidebar is open */}
//       {menuOpen && (
//         <div
//           className="md:hidden fixed inset-0 bg-black bg-opacity-50 z-30"
//           onClick={() => setMenuOpen(false)}
//         />
//       )}

//       {/* Sidebar */}
//       <div
//         className={`fixed md:static h-full w-64 bg-slate-900 text-white z-40 shadow-lg transition-transform duration-300
//           ${menuOpen ? "translate-x-0" : "-translate-x-full md:translate-x-0"}
//           flex flex-col overflow-hidden`}
//       >
//         {/* Header with Logo and Close Button */}
//         <div className="flex items-center justify-between p-4 border-b border-slate-900">
//           <h2 className="text-2xl font-semibold">ValoPlay</h2>
//           <button
//             className="md:hidden text-gray-400 hover:text-white"
//             onClick={() => setMenuOpen(false)}
//           >
//             <FaTimes size={20} />
//           </button>
//         </div>

//         {/* Scrollable Navigation Area */}
//         <div className="flex-1 overflow-y-auto py-2 px-3">
//           <nav className="space-y-1 mb-6">
//             <Link to="/" onClick={handleLinkClick} className={linkClass("/")}>
//               <FaHome size={18} />
//               <span>Dashboard</span>
//             </Link>
//             <Link
//               to="/book"
//               onClick={handleLinkClick}
//               className={linkClass("/book")}
//             >
//               <FaPencilAlt size={18} />
//               <span>Book Slot</span>
//             </Link>
//             <Link
//               to="/transactions"
//               onClick={handleLinkClick}
//               className={linkClass("/transactions")}
//             >
//               <FaListAlt size={18} />
//               <span>Transactions</span>
//             </Link>
//             <Link
//               to="/profile"
//               onClick={handleLinkClick}
//               className={linkClass("/profile")}
//             >
//               <FaUser size={18} />
//               <span>Profile</span>
//             </Link>
//             <Link
//               to="/request-payout"
//               onClick={handleLinkClick}
//               className={linkClass("/request-payout")}
//             >
//               <FaMoneyBillWave size={18} />
//               <span>Request Payout</span>
//             </Link>
//             <Link
//               to="/add-money"
//               onClick={handleLinkClick}
//               className={linkClass("/add-money")}
//             >
//               <FaCreditCard size={18} />
//               <span>Add Money</span>
//             </Link>
//             {/* <Link
//               to="/leaderboard"
//               className="flex items-center justify-between bg-gradient-to-r from-purple-600 to-purple-700 hover:from-purple-500 hover:to-purple-600 p-4 rounded-xl transition-all duration-300 group"
//             >
//               <div className="flex items-center">
//                 🏆
//                 <span className="ml-3 font-medium">Leaderboard</span>
//               </div>
//               <FaArrowAltCircleRight className="transform group-hover:translate-x-1 transition-transform" />
//             </Link> */}
//           </nav>

//           {/* Admin Section */}
//           {user?.isAdmin && (
//             <div className="mt-8">
//               <div className="text-xs font-semibold text-gray-400 uppercase tracking-wider mb-3 px-3">
//                 Admin Panel
//               </div>
//               <nav className="space-y-1">
//                 <Link
//                   to="/admin/payouts"
//                   onClick={handleLinkClick}
//                   className={linkClass("/admin/payouts")}
//                 >
//                   <FaMoneyBillWave size={18} />
//                   <span>Payout Requests</span>
//                 </Link>
//                 <Link
//                   to="/admin/deposits"
//                   onClick={handleLinkClick}
//                   className={linkClass("/admin/deposits")}
//                 >
//                   <FaCreditCard size={18} />
//                   <span>Manual Deposits</span>
//                 </Link>
//                 <Link
//                   to="/admin/create-slot"
//                   onClick={handleLinkClick}
//                   className={linkClass("/admin/create-slot")}
//                 >
//                   <FaCalendarPlus size={18} />
//                   <span>Create Time Slot</span>
//                 </Link>
//                 <Link
//                   to="/admin/manage-slots"
//                   onClick={handleLinkClick}
//                   className={linkClass("/admin/manage-slots")}
//                 >
//                   <FaCalendarCheck size={18} />
//                   <span>Manage Time Slots</span>
//                 </Link>
//                 <Link
//                   to="/admin"
//                   onClick={handleLinkClick}
//                   className={linkClass("/admin")}
//                 >
//                   <FaTachometerAlt size={18} />
//                   <span>Admin Dashboard</span>
//                 </Link>
//               </nav>
//             </div>
//           )}
//         </div>

//         {/* Fixed Logout Button at Bottom */}
//         <div className="p-4 border-t border-gray-700 mt-auto">
//           <button
//             onClick={() => {
//               logout();
//               setMenuOpen(false);
//             }}
//             className="bg-red-600 hover:bg-red-700 p-3 w-full rounded-lg text-white font-semibold flex items-center justify-center space-x-2 transition-colors duration-200"
//           >
//             <FaSignOutAlt size={18} />
//             <span>Logout</span>
//           </button>
//         </div>
//       </div>
//     </>
//   );
// }

// export default Sidebar;

import { Link, useLocation } from "react-router-dom";
import { useContext, useState, useEffect } from "react";
import { AuthContext } from "../context/authContext";
import {
  FaHome,
  FaUser,
  FaPencilAlt,
  FaListAlt,
  FaSignOutAlt,
  FaMoneyBillWave,
  FaCreditCard,
  FaCalendarPlus,
  FaCalendarCheck,
  FaTachometerAlt,
  FaTimes,
  FaArrowAltCircleRight,
  FaChevronRight,
} from "react-icons/fa";

function Sidebar({ menuOpen, setMenuOpen }) {
  const { pathname } = useLocation();
  const { user, logout } = useContext(AuthContext);
  const [collapsed, setCollapsed] = useState({});

  // Handle responsive behavior
  useEffect(() => {
    const handleResize = () => {
      if (window.innerWidth >= 768) {
        setMenuOpen(true);
      }
    };

    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, [setMenuOpen]);

  const handleLinkClick = () => {
    if (window.innerWidth < 768) {
      setMenuOpen(false);
    }
  };

  const toggleSection = (section) => {
    setCollapsed({
      ...collapsed,
      [section]: !collapsed[section],
    });
  };

  const linkClass = (path) =>
    pathname === path
      ? "bg-red-600 text-white p-2.5 rounded-lg flex items-center space-x-3"
      : "hover:bg-slate-800 text-gray-300 p-2.5 rounded-lg flex items-center space-x-3 transition-colors duration-200";

  return (
    <>
      {/* Dark overlay for mobile when sidebar is open */}
      {menuOpen && (
        <div
          className="md:hidden fixed inset-0 bg-black bg-opacity-50 z-30"
          onClick={() => setMenuOpen(false)}
        />
      )}

      {/* Sidebar - reduced width from w-72 to w-60 */}
      <div
        className={`fixed md:static h-full w-60 bg-slate-900 text-white z-40 shadow-lg transition-transform duration-300 
          ${menuOpen ? "translate-x-0" : "-translate-x-full md:translate-x-0"} 
          flex flex-col overflow-hidden border-r border-slate-800/30`}
      >
        {/* Header with Logo and Close Button */}
        <div className="flex items-center justify-between p-3 border-b border-slate-800/50">
          <div className="flex items-center justify-start w-full">
            {/* Logo with Battle Slots text */}
            <div className="flex items-center">
              <img
                src="/logo1.png"
                alt="ValoPlay Logo"
                className="h-12 w-auto"
              />
              <div className="ml-2 font-bold text-2xl">
                <span className="text-purple-400">B</span>attle
                <span className="text-white">
                  <span className="text-purple-400">S</span>lots
                </span>
              </div>
            </div>
          </div>
          <button
            className="md:hidden text-gray-400 hover:text-white absolute right-2"
            onClick={() => setMenuOpen(false)}
          >
            <FaTimes size={16} />
          </button>
        </div>

        {/* Scrollable Navigation Area */}
        <div className="flex-1 overflow-y-auto py-3 px-2 space-y-3">
          {/* Main Navigation */}
          <nav className="space-y-1">
            <Link to="/" onClick={handleLinkClick} className={linkClass("/")}>
              <FaHome size={16} />
              <span>Dashboard</span>
            </Link>
            <Link
              to="/book"
              onClick={handleLinkClick}
              className={linkClass("/book")}
            >
              <FaPencilAlt size={16} />
              <span>Book Slot</span>
            </Link>
            <Link
              to="/transactions"
              onClick={handleLinkClick}
              className={linkClass("/transactions")}
            >
              <FaListAlt size={16} />
              <span>Transactions</span>
            </Link>
            <Link
              to="/profile"
              onClick={handleLinkClick}
              className={linkClass("/profile")}
            >
              <FaUser size={16} />
              <span>Profile</span>
            </Link>
          </nav>

          {/* Financial Section - removed header for minimalism */}
          <nav className="space-y-1 pt-1 border-t border-slate-800/30">
            <Link
              to="/request-payout"
              onClick={handleLinkClick}
              className={linkClass("/request-payout")}
            >
              <FaMoneyBillWave size={16} />
              <span>Request Payout</span>
            </Link>

            <Link
              to="/add-money"
              onClick={handleLinkClick}
              className={linkClass("/add-money")}
            >
              <FaCreditCard size={16} />
              <span>Add Money</span>
            </Link>
            <Link
              to="/help-policies"
              onClick={handleLinkClick}
              className={linkClass("/help-policies")}
            >
              <FaMoneyBillWave size={16} />
              <span>help</span>
            </Link>
          </nav>

          {/* Leaderboard Promo Card */}
          {/* <div className="py-1">
            <Link
              to="/leaderboard"
              className="flex items-center justify-between bg-gradient-to-r from-purple-600 to-purple-700 hover:from-purple-500 hover:to-purple-600 p-3 rounded-lg transition-all duration-300 group"
            >
              <div className="flex items-center">
                <span className="text-lg">🏆</span>
                <span className="ml-2 font-medium">Leaderboard</span>
              </div>
              <FaArrowAltCircleRight
                size={16}
                className="transform group-hover:translate-x-1 transition-transform"
              />
            </Link>
          </div> */}

          {/* Admin Section */}
          {user?.isAdmin && (
            <div className="pt-1 border-t border-slate-800/30">
              <button
                onClick={() => toggleSection("admin")}
                className="flex items-center justify-between w-full text-xs font-medium text-red-400 px-2 py-1 mb-1 hover:bg-slate-800/50 rounded"
              >
                <span>ADMIN PANEL</span>
                <FaChevronRight
                  size={12}
                  className={`transition-transform ${
                    collapsed.admin ? "rotate-90" : ""
                  }`}
                />
              </button>

              {(!collapsed.admin || collapsed.admin === undefined) && (
                <nav className="space-y-1">
                  <Link
                    to="/admin/payouts"
                    onClick={handleLinkClick}
                    className={linkClass("/admin/payouts")}
                  >
                    <FaMoneyBillWave size={16} />
                    <span>Payout Requests</span>
                  </Link>
                  {/* <Link
                    to="/admin/deposits"
                    onClick={handleLinkClick}
                    className={linkClass("/admin/deposits")}
                  >
                    <FaCreditCard size={16} />
                    <span>Manual Deposits</span>
                  </Link> */}
                  <Link
                    to="/admin/create-slot"
                    onClick={handleLinkClick}
                    className={linkClass("/admin/create-slot")}
                  >
                    <FaCalendarPlus size={16} />
                    <span>Create Slot</span>
                  </Link>
                  <Link
                    to="/admin/manage-slots"
                    onClick={handleLinkClick}
                    className={linkClass("/admin/manage-slots")}
                  >
                    <FaCalendarCheck size={16} />
                    <span>Manage Slots</span>
                  </Link>
                  <Link
                    to="/admin"
                    onClick={handleLinkClick}
                    className={linkClass("/admin")}
                  >
                    <FaTachometerAlt size={16} />
                    <span>Admin Dashboard</span>
                  </Link>
                </nav>
              )}
            </div>
          )}
        </div>
        {/* Fixed Logout Button at Bottom */}
        <div className="p-3 border-t border-slate-800/50 mt-auto">
          <button
            onClick={() => {
              logout();
              setMenuOpen(false);
            }}
            className="bg-red-600 hover:bg-red-700 p-2 w-full rounded-lg text-white font-medium flex items-center justify-center space-x-2 transition-colors duration-200"
          >
            <FaSignOutAlt size={16} />
            <span>Logout</span>
          </button>
        </div>
      </div>
    </>
  );
}

export default Sidebar;
