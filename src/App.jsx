import { BrowserRouter, Route, Routes } from "react-router-dom";
import { ToastContainer } from "react-toastify";
import React from "react";
import ApperIcon from "@/components/ApperIcon";
import DashboardPage from "@/components/pages/DashboardPage";
import ContactsPage from "@/components/pages/ContactsPage";
import Layout from "@/components/organisms/Layout";
function App() {
  return (
    <BrowserRouter>
      <div className="min-h-screen bg-gray-50">
        <Routes>
          <Route path="/" element={<Layout />}>
<Route index element={<DashboardPage />} />
            <Route path="contacts" element={<ContactsPage />} />
          </Route>
        </Routes>
        
        <ToastContainer
          position="top-right"
          autoClose={3000}
          hideProgressBar={false}
          newestOnTop={false}
          closeOnClick
          rtl={false}
          pauseOnFocusLoss
          draggable
          pauseOnHover
          style={{ zIndex: 9999 }}
        />
      </div>
    </BrowserRouter>
  );
}

export default App;