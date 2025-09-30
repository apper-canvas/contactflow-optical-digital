import { useContext } from "react";
import Button from "@/components/atoms/Button";
import ApperIcon from "@/components/ApperIcon";
import { AuthContext } from "@/App";

const Header = ({ title, onMobileMenuToggle }) => {
  const { logout } = useContext(AuthContext);
  
  return (
    <header className="bg-white border-b border-gray-200 shadow-sm">
      <div className="flex items-center justify-between px-4 sm:px-6 lg:px-8 py-4">
        <div className="flex items-center space-x-4">
          <Button
            variant="ghost"
            size="sm"
            onClick={onMobileMenuToggle}
            className="lg:hidden p-2"
          >
            <ApperIcon name="Menu" className="w-5 h-5" />
          </Button>
          <div>
            <h1 className="text-2xl font-bold text-gray-900">{title}</h1>
            <p className="text-sm text-gray-500">Manage your business contacts</p>
          </div>
        </div>
        
        <div className="flex items-center space-x-4">
          <Button variant="ghost" size="sm" className="hidden sm:flex">
            <ApperIcon name="Bell" className="w-5 h-5" />
          </Button>
          <Button variant="ghost" size="sm" className="hidden sm:flex">
            <ApperIcon name="HelpCircle" className="w-5 h-5" />
          </Button>
          <Button 
            variant="ghost" 
            size="sm" 
            onClick={logout}
            className="flex items-center space-x-2"
            title="Logout"
          >
            <div className="w-8 h-8 bg-gradient-to-br from-primary-500 to-primary-600 rounded-full flex items-center justify-center">
              <ApperIcon name="User" className="w-4 h-4 text-white" />
            </div>
            <ApperIcon name="LogOut" className="w-4 h-4" />
          </Button>
        </div>
      </div>
    </header>
  );
};

export default Header;