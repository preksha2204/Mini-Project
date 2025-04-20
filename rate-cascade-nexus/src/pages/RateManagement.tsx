
import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { useAuth } from "@/contexts/AuthContext";
import { Button } from "@/components/ui/button";
import { ArrowLeft } from "lucide-react";
import RateForm from "@/components/RateForm";
import { useBranch } from "@/contexts/BranchContext";
import AccountList from "@/components/AccountList";

const RateManagement = () => {
  const { isAuthenticated } = useAuth();
  const { currentBranch } = useBranch();
  const navigate = useNavigate();
  
  useEffect(() => {
    if (!isAuthenticated) {
      navigate("/");
    }
  }, [isAuthenticated, navigate]);

  return (
    <div className="min-h-screen bg-gray-50">
      <header className="bg-white shadow">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4 flex justify-between items-center">
          <div className="flex items-center">
            <Button variant="ghost" size="icon" onClick={() => navigate("/dashboard")} className="mr-2">
              <ArrowLeft size={20} />
            </Button>
            <h1 className="text-2xl font-bold text-gray-900">Rate Management</h1>
          </div>
          <Button onClick={() => navigate("/branches")}>View All Branches</Button>
        </div>
      </header>

      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="grid grid-cols-1 gap-8">
          <RateForm />
          
          {currentBranch && (
            <AccountList branchId={currentBranch.id} />
          )}
        </div>
      </main>
    </div>
  );
};

export default RateManagement;
