import { Bell, PlusCircle, User } from "lucide-react";
import { Link } from "react-router-dom";

export const Navigation = () => {
  return (
    <nav className="bg-white border-b border-gray-100">
      <div className="container mx-auto px-4">
        <div className="flex items-center justify-between h-14">
          <Link to="/" className="text-2xl font-bold text-pink-500">
            游记攻略
          </Link>
          <div className="flex items-center gap-6">
            <Link 
              to="/notifications" 
              className="text-gray-600 hover:text-gray-900 transition-colors"
            >
              <Bell className="h-6 w-6" />
            </Link>
            <Link 
              to="/create" 
              className="text-gray-600 hover:text-gray-900 transition-colors"
            >
              <PlusCircle className="h-6 w-6" />
            </Link>
            <Link 
              to="/profile" 
              className="text-gray-600 hover:text-gray-900 transition-colors"
            >
              <User className="h-6 w-6" />
            </Link>
          </div>
        </div>
      </div>
    </nav>
  );
};