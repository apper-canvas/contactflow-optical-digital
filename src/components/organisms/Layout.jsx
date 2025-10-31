import React, { useState } from "react";
import { Outlet } from "react-router-dom";
import Sidebar from "@/components/organisms/Sidebar";
import Header from "@/components/organisms/Header";

const Layout = () => {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  // Create outlet context to pass to child routes
  const outletContext = {
    isMobileMenuOpen,
    setIsMobileMenuOpen
  };

  return (
    <div className="h-screen flex overflow-hidden bg-gray-50">
      {/* Sidebar */}
      <Sidebar 
        isMobileMenuOpen={isMobileMenuOpen} 
        setIsMobileMenuOpen={setIsMobileMenuOpen}
      />

      {/* Main Content */}
      <div className="flex flex-col w-0 flex-1 overflow-hidden lg:pl-72">
        <Header 
          title="ContactFlow"
          onMobileMenuToggle={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
        />
        
        <main className="flex-1 relative overflow-y-auto focus:outline-none">
          <Outlet context={outletContext} />
        </main>
      </div>
    </div>
  );
};

export default Layout;