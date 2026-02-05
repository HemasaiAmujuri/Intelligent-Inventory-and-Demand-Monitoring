import React from "react";

const Footer = () => {
  return (
    <footer className="bg-blue-500 text-white py-6 mt-5 border-t border-blue-500">
      <div className="container mx-auto flex flex-col md:flex-row justify-between items-center px-4">
        
        <div className="mb-4 md:mb-0 text-center md:text-left">
          <h1 className="font-bold text-lg">Intelligent Inventory System</h1>
          <p className="text-sm text-gray-200">© 2026 Warehouse Solutions. All rights reserved.</p>
        </div>

        <div className="flex gap-6 mb-4 md:mb-0 text-sm">
          <a href="#inventory" className="hover:text-gray-300 transition-colors">Inventory List</a>
          <a href="#stock-movement" className="hover:text-gray-300 transition-colors">Stock Movement</a>
          <a href="#alerts" className="hover:text-gray-300 transition-colors">Alerts Dashboard</a>
        </div>

        <div className="text-sm text-center md:text-right">
          <p>Contact: <a href="mailto:logistics@warehouse.com" className="hover:text-gray-300">logistics@warehouse.com</a></p>
          <p>Version 1.0.0</p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
