
import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { useAuth } from "@/contexts/AuthContext";

const Index = () => {
  const { isAuthenticated } = useAuth();
  const navigate = useNavigate();
  
  useEffect(() => {
    if (isAuthenticated) {
      navigate("/dashboard");
    }
  }, [isAuthenticated, navigate]);

  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-gradient-to-b from-sky-50 to-white p-4">
      <div className="text-center max-w-3xl">
        <h1 className="text-5xl font-bold text-sky-700 mb-4">Branch Rate Management System</h1>
        
        <p className="text-xl text-gray-600 mb-8">
          Manage rates across your organization with our hierarchical cascading system. 
          Update rates at any level and automatically propagate changes to all child branches and accounts.
        </p>
        
        <div className="max-w-md mx-auto bg-white/50 backdrop-blur-sm p-6 rounded-xl shadow-md border border-sky-100 mb-8">
          <h2 className="text-xl font-semibold mb-3 text-sky-900">Key Features</h2>
          <ul className="space-y-2 text-left">
            <li className="flex items-center">
              <span className="h-2 w-2 rounded-full bg-sky-500 mr-2"></span>
              Hierarchical branch visualization
            </li>
            <li className="flex items-center">
              <span className="h-2 w-2 rounded-full bg-sky-500 mr-2"></span>
              Automatic rate cascading to child elements
            </li>
            <li className="flex items-center">
              <span className="h-2 w-2 rounded-full bg-sky-500 mr-2"></span>
              Role-based access control
            </li>
            <li className="flex items-center">
              <span className="h-2 w-2 rounded-full bg-sky-500 mr-2"></span>
              Rate change preview and confirmation
            </li>
          </ul>
        </div>
        
        <Button
          onClick={() => navigate("/login")}
          size="lg"
          className="text-lg px-8 py-6 h-auto bg-sky-600 hover:bg-sky-700"
        >
          Login to Get Started
        </Button>
      </div>
      
      <div className="mt-8 text-center text-sm text-gray-500">
        <p>For demo login, use one of these usernames: Admin, East Manager, or NY User</p>
      </div>
    </div>
  );
};

export default Index;
