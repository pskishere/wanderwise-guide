import { Button } from "@/components/ui/button";
import { Bell, PlusCircle, User } from "lucide-react";
import { Link } from "react-router-dom";

export const Navigation = () => {
  return (
    <nav className="bg-white">
      <div className="container mx-auto px-4">
        <div className="flex items-center justify-between h-14">
          <Link to="/" className="text-xl font-bold text-pink-600">
            游记攻略
          </Link>
          <div className="flex items-center gap-6">
            <Button 
              variant="ghost" 
              size="icon" 
              className="hover:bg-transparent"
            >
              <Bell className="h-6 w-6 text-gray-700" />
            </Button>
            <Button 
              variant="ghost" 
              size="icon"
              className="hover:bg-transparent"
            >
              <PlusCircle className="h-6 w-6 text-gray-700" />
            </Button>
            <Button 
              variant="ghost" 
              size="icon"
              className="hover:bg-transparent"
            >
              <User className="h-6 w-6 text-gray-700" />
            </Button>
          </div>
        </div>
      </div>
    </nav>
  );
};