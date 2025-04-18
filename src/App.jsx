// import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
// import Sidebar from "./components/Sidebar";
// import Dashboard from "./pages/Dashboard";
// import BookSlot from "./pages/BookSlot";
// import Transactions from "./pages/Transactions";
// import Profile from "./pages/Profile";
// import PrivateRoute from "./components/PrivateRoute"; // Import PrivateRoute
// import AdminPayouts from "./pages/AdminPayout";
// import Login from "./pages/Login";
// import Register from "./pages/Register";
// import AdminCreateTimeSlot from "./pages/AdminCreateTimeSlot";
// import AdminManageTimeSlots from "./pages/AdminManageTimeSlots";

// import AdminSlotDetails from "./pages/AdminSlotDetails";
// import AddMoney from "./pages/AddMoney";
// import AdminDeposits from "./pages/AdminDeposits";
// import RequestPayout from "./pages/RequestPayout";

// // Inside your <Routes> component:
// function App() {
//   return (
//     <Router>
//       <div className="flex">
//         <Sidebar />
//         <div className="ml-64 w-[calc(100%-16rem)] h-screen bg-gray-900 overflow-auto p-6">
//           <Routes>
//             <Route
//               path="/"
//               element={
//                 <PrivateRoute>
//                   <Dashboard />
//                 </PrivateRoute>
//               }
//             />
//             <Route
//               path="/request-payout"
//               element={
//                 <PrivateRoute>
//                   <RequestPayout />
//                 </PrivateRoute>
//               }
//             />
//             <Route
//               path="/admin/deposits"
//               element={
//                 <PrivateRoute>
//                   <AdminDeposits />
//                 </PrivateRoute>
//               }
//             />
//             <Route
//               path="/add-money"
//               element={
//                 <PrivateRoute>
//                   <AddMoney />
//                 </PrivateRoute>
//               }
//             />
//             <Route
//               path="/book"
//               element={
//                 <PrivateRoute>
//                   <BookSlot />
//                 </PrivateRoute>
//               }
//             />
//             // Inside routes:
//             <Route
//               path="/admin/slots/:slotId"
//               element={
//                 <PrivateRoute>
//                   <AdminSlotDetails />
//                 </PrivateRoute>
//               }
//             />
//             <Route
//               path="/add-money"
//               element={
//                 <PrivateRoute>
//                   <AddMoney />
//                 </PrivateRoute>
//               }
//             />
//             <Route
//               path="/transactions"
//               element={
//                 <PrivateRoute>
//                   <Transactions />
//                 </PrivateRoute>
//               }
//             />
//             <Route
//               path="/profile"
//               element={
//                 <PrivateRoute>
//                   <Profile />
//                 </PrivateRoute>
//               }
//             />
//             <Route
//               path="/admin/payouts"
//               element={
//                 <PrivateRoute>
//                   <AdminPayouts />
//                 </PrivateRoute>
//               }
//             />
//             <Route
//               path="/admin/create-slot"
//               element={
//                 <PrivateRoute>
//                   <AdminCreateTimeSlot />
//                 </PrivateRoute>
//               }
//             />
//             <Route
//               path="/admin/manage-slots"
//               element={
//                 <PrivateRoute>
//                   <AdminManageTimeSlots />
//                 </PrivateRoute>
//               }
//             />
//             <Route path="/login" element={<Login />} />
//             <Route path="/register" element={<Register />} />
//           </Routes>
//         </div>
//       </div>
//     </Router>
//   );
// }

// export default App;
// import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
// import { useState } from "react";
// import Sidebar from "./components/Sidebar";
// import Dashboard from "./pages/Dashboard";
// import BookSlot from "./pages/BookSlot";
// import Transactions from "./pages/Transactions";
// import Profile from "./pages/Profile";
// import PrivateRoute from "./components/PrivateRoute";
// import AdminPayouts from "./pages/AdminPayout";
// import Login from "./pages/Login";
// import Register from "./pages/Register";
// import AdminCreateTimeSlot from "./pages/AdminCreateTimeSlot";
// import AdminManageTimeSlots from "./pages/AdminManageTimeSlots";
// import AdminSlotDetails from "./pages/AdminSlotDetails";
// import AddMoney from "./pages/AddMoney";
// import AdminDeposits from "./pages/AdminDeposits";
// import RequestPayout from "./pages/RequestPayout";

// function App() {
//   const [sidebarOpen, setSidebarOpen] = useState(false);

//   return (
//     <Router>
//       <div className="flex h-screen overflow-hidden">
//         <Sidebar open={sidebarOpen} setOpen={setSidebarOpen} />

//         <div className="flex-1 flex flex-col">
//           {/* <div className="md:hidden flex items-center justify-between bg-gray-800 ">
//             <h2 className="text-white text-xl font-semibold">Valo Play</h2>
//             <button
//               onClick={() => setSidebarOpen(!sidebarOpen)}
//               className="text-white focus:outline-none"
//             >
//               ☰
//             </button>
//           </div> */}

//           <div className="flex-1 bg-gray-900 overflow-auto p-4">
//             <Routes>
//               <Route
//                 path="/"
//                 element={
//                   <PrivateRoute>
//                     <Dashboard />
//                   </PrivateRoute>
//                 }
//               />
//               <Route
//                 path="/request-payout"
//                 element={
//                   <PrivateRoute>
//                     <RequestPayout />
//                   </PrivateRoute>
//                 }
//               />
//               <Route
//                 path="/admin/deposits"
//                 element={
//                   <PrivateRoute>
//                     <AdminDeposits />
//                   </PrivateRoute>
//                 }
//               />
//               <Route
//                 path="/add-money"
//                 element={
//                   <PrivateRoute>
//                     <AddMoney />
//                   </PrivateRoute>
//                 }
//               />
//               <Route
//                 path="/book"
//                 element={
//                   <PrivateRoute>
//                     <BookSlot />
//                   </PrivateRoute>
//                 }
//               />
//               <Route
//                 path="/admin/slots/:slotId"
//                 element={
//                   <PrivateRoute>
//                     <AdminSlotDetails />
//                   </PrivateRoute>
//                 }
//               />
//               <Route
//                 path="/transactions"
//                 element={
//                   <PrivateRoute>
//                     <Transactions />
//                   </PrivateRoute>
//                 }
//               />
//               <Route
//                 path="/profile"
//                 element={
//                   <PrivateRoute>
//                     <Profile />
//                   </PrivateRoute>
//                 }
//               />
//               <Route
//                 path="/admin/payouts"
//                 element={
//                   <PrivateRoute>
//                     <AdminPayouts />
//                   </PrivateRoute>
//                 }
//               />
//               <Route
//                 path="/admin/create-slot"
//                 element={
//                   <PrivateRoute>
//                     <AdminCreateTimeSlot />
//                   </PrivateRoute>
//                 }
//               />
//               <Route
//                 path="/admin/manage-slots"
//                 element={
//                   <PrivateRoute>
//                     <AdminManageTimeSlots />
//                   </PrivateRoute>
//                 }
//               />
//               <Route path="/login" element={<Login />} />
//               <Route path="/register" element={<Register />} />
//             </Routes>
//           </div>
//         </div>
//       </div>
//     </Router>
//   );
// }

// export default App;
// import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
// import { useState } from "react";
// import Sidebar from "./components/Sidebar";
// import { FaBars } from "react-icons/fa";

// import Dashboard from "./pages/Dashboard";
// import BookSlot from "./pages/BookSlot";
// import Transactions from "./pages/Transactions";
// import Profile from "./pages/Profile";
// import PrivateRoute from "./components/PrivateRoute";
// import AdminPayouts from "./pages/AdminPayout";
// import Login from "./pages/Login";
// import Register from "./pages/Register";
// import AdminCreateTimeSlot from "./pages/AdminCreateTimeSlot";
// import AdminManageTimeSlots from "./pages/AdminManageTimeSlots";
// import AdminSlotDetails from "./pages/AdminSlotDetails";
// import AddMoney from "./pages/AddMoney";
// import AdminDeposits from "./pages/AdminDeposits";
// import RequestPayout from "./pages/RequestPayout";

// function App() {
//   const [menuOpen, setMenuOpen] = useState(false);

//   // Function to handle sidebar toggle
//   const toggleSidebar = () => {
//     setMenuOpen(!menuOpen);
//   };

//   // Close sidebar when clicked outside on mobile
//   const handleContentClick = () => {
//     if (menuOpen && window.innerWidth < 768) {
//       setMenuOpen(false);
//     }
//   };

//   return (
//     <Router>
//       <div className="flex h-screen overflow-hidden bg-gray-900">
//         {/* Sidebar */}
//         <Sidebar menuOpen={menuOpen} setMenuOpen={setMenuOpen} />

//         {/* Main Content Area */}
//         <div
//           className="flex-1 flex flex-col overflow-hidden"
//           onClick={handleContentClick}
//         >
//           {/* Mobile Header with Hamburger */}
//           <div className="md:hidden bg-gray-800 p-4 flex items-center shadow-md">
//             <button
//               onClick={toggleSidebar}
//               className="p-2 bg-gray-700 rounded text-white"
//               aria-label="Toggle menu"
//             >
//               <FaBars size={20} />
//             </button>
//             <h1 className="text-white font-semibold text-xl ml-4">ValoPlay</h1>
//           </div>

//           {/* Content Area */}
//           <div className="flex-1 overflow-y-auto p-4 md:p-6">
//             <Routes>
//               <Route
//                 path="/"
//                 element={
//                   <PrivateRoute>
//                     <Dashboard />
//                   </PrivateRoute>
//                 }
//               />
//               <Route
//                 path="/book"
//                 element={
//                   <PrivateRoute>
//                     <BookSlot />
//                   </PrivateRoute>
//                 }
//               />
//               <Route
//                 path="/transactions"
//                 element={
//                   <PrivateRoute>
//                     <Transactions />
//                   </PrivateRoute>
//                 }
//               />
//               <Route
//                 path="/profile"
//                 element={
//                   <PrivateRoute>
//                     <Profile />
//                   </PrivateRoute>
//                 }
//               />
//               <Route
//                 path="/add-money"
//                 element={
//                   <PrivateRoute>
//                     <AddMoney />
//                   </PrivateRoute>
//                 }
//               />
//               <Route
//                 path="/request-payout"
//                 element={
//                   <PrivateRoute>
//                     <RequestPayout />
//                   </PrivateRoute>
//                 }
//               />
//               <Route
//                 path="/admin/payouts"
//                 element={
//                   <PrivateRoute>
//                     <AdminPayouts />
//                   </PrivateRoute>
//                 }
//               />
//               <Route
//                 path="/admin/deposits"
//                 element={
//                   <PrivateRoute>
//                     <AdminDeposits />
//                   </PrivateRoute>
//                 }
//               />
//               <Route
//                 path="/admin/create-slot"
//                 element={
//                   <PrivateRoute>
//                     <AdminCreateTimeSlot />
//                   </PrivateRoute>
//                 }
//               />
//               <Route
//                 path="/admin/manage-slots"
//                 element={
//                   <PrivateRoute>
//                     <AdminManageTimeSlots />
//                   </PrivateRoute>
//                 }
//               />
//               <Route
//                 path="/admin/slots/:slotId"
//                 element={
//                   <PrivateRoute>
//                     <AdminSlotDetails />
//                   </PrivateRoute>
//                 }
//               />
//               <Route path="/login" element={<Login />} />
//               <Route path="/register" element={<Register />} />
//             </Routes>
//           </div>
//         </div>
//       </div>
//     </Router>
//   );
// }

// export default App;
import {
  BrowserRouter as Router,
  Routes,
  Route,
  Navigate,
} from "react-router-dom";
import { useState, useContext } from "react";
import Sidebar from "./components/Sidebar";
import { FaBars } from "react-icons/fa";
import Dashboard from "./pages/Dashboard";
import BookSlot from "./pages/BookSlot";
import Transactions from "./pages/Transactions";
import Profile from "./pages/Profile";
import PrivateRoute from "./components/PrivateRoute";
import AdminPayouts from "./pages/AdminPayout";
import Login from "./pages/Login";
import Register from "./pages/Register";
import AdminCreateTimeSlot from "./pages/AdminCreateTimeSlot";
import AdminManageTimeSlots from "./pages/AdminManageTimeSlots";
import AdminSlotDetails from "./pages/AdminSlotDetails";
import AddMoney from "./pages/AddMoney";
import AdminDeposits from "./pages/AdminDeposits";
import RequestPayout from "./pages/RequestPayout";
import { AuthContext } from "./context/AuthContext";
function App() {
  const [menuOpen, setMenuOpen] = useState(false);
  const { user } = useContext(AuthContext);

  const toggleSidebar = () => setMenuOpen(!menuOpen);
  const handleContentClick = () => {
    if (menuOpen && window.innerWidth < 768) {
      setMenuOpen(false);
    }
  };

  const AdminRoute = ({ children }) => {
    return user?.isAdmin ? children : <Navigate to="/" />;
  };

  return (
    <Router>
      <div className="flex h-screen overflow-hidden bg-black">
        <Sidebar menuOpen={menuOpen} setMenuOpen={setMenuOpen} />

        <div
          className="flex-1 flex flex-col overflow-hidden"
          onClick={handleContentClick}
        >
          <div className="md:hidden bg-slate-900 p-4 flex items-center shadow-md">
            <button
              onClick={toggleSidebar}
              className="p-2 bg-slate-900 rounded text-white"
              aria-label="Toggle menu"
            >
              <FaBars size={20} />
            </button>
            <h1 className="text-white font-semibold text-xl ml-4">ValoPlay</h1>
          </div>

          <div className="flex-1 overflow-y-auto ">
            <Routes>
              <Route
                path="/"
                element={
                  <PrivateRoute>
                    <Dashboard />
                  </PrivateRoute>
                }
              />
              <Route
                path="/book"
                element={
                  <PrivateRoute>
                    <BookSlot />
                  </PrivateRoute>
                }
              />
              <Route
                path="/transactions"
                element={
                  <PrivateRoute>
                    <Transactions />
                  </PrivateRoute>
                }
              />
              <Route
                path="/profile"
                element={
                  <PrivateRoute>
                    <Profile />
                  </PrivateRoute>
                }
              />
              <Route
                path="/add-money"
                element={
                  <PrivateRoute>
                    <AddMoney />
                  </PrivateRoute>
                }
              />
              <Route
                path="/request-payout"
                element={
                  <PrivateRoute>
                    <RequestPayout />
                  </PrivateRoute>
                }
              />

              {/* Admin routes safely wrapped */}
              <Route
                path="/admin/payouts"
                element={
                  <PrivateRoute>
                    <AdminRoute>
                      <AdminPayouts />
                    </AdminRoute>
                  </PrivateRoute>
                }
              />
              <Route
                path="/admin/deposits"
                element={
                  <PrivateRoute>
                    <AdminRoute>
                      <AdminDeposits />
                    </AdminRoute>
                  </PrivateRoute>
                }
              />
              <Route
                path="/admin/create-slot"
                element={
                  <PrivateRoute>
                    <AdminRoute>
                      <AdminCreateTimeSlot />
                    </AdminRoute>
                  </PrivateRoute>
                }
              />
              <Route
                path="/admin/manage-slots"
                element={
                  <PrivateRoute>
                    <AdminRoute>
                      <AdminManageTimeSlots />
                    </AdminRoute>
                  </PrivateRoute>
                }
              />
              <Route
                path="/admin/slots/:slotId"
                element={
                  <PrivateRoute>
                    <AdminRoute>
                      <AdminSlotDetails />
                    </AdminRoute>
                  </PrivateRoute>
                }
              />

              <Route path="/login" element={<Login />} />
              <Route path="/register" element={<Register />} />
            </Routes>
          </div>
        </div>
      </div>
    </Router>
  );
}

export default App;
