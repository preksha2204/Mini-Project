
import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { useAuth } from "@/contexts/AuthContext";
import { useBranch } from "@/contexts/BranchContext";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { ArrowLeft } from "lucide-react";
import BranchCard from "@/components/BranchCard";
import BranchTree from "@/components/BranchTree";

const BranchList = () => {
  const { isAuthenticated, user } = useAuth();
  const { branches, currentBranch, setCurrentBranch } = useBranch();
  const navigate = useNavigate();
  
  useEffect(() => {
    if (!isAuthenticated) {
      navigate("/");
    }
  }, [isAuthenticated, navigate]);

  const handleBack = () => {
    if (currentBranch) {
      // If viewing a specific branch, go back to all branches
      setCurrentBranch(null);
    } else {
      // If viewing all branches, go back to dashboard
      navigate("/dashboard");
    }
  };

  // Filter branches based on current view
  const visibleBranches = currentBranch
    ? branches.filter(branch => branch.parentId === currentBranch.id)
    : branches.filter(branch => {
        // For admins, show top level branches
        if (user?.role === 'admin') return branch.parentId === null;
        
        // For others, show their branch and direct children
        if (user?.branchId === branch.id) return true;
        if (user?.branchId === branch.parentId) return true;
        return false;
      });

  return (
    <div className="min-h-screen bg-gray-50">
      <header className="bg-white shadow">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4 flex justify-between items-center">
          <div className="flex items-center">
            <Button variant="ghost" size="icon" onClick={handleBack} className="mr-2">
              <ArrowLeft size={20} />
            </Button>
            <h1 className="text-2xl font-bold text-gray-900">
              {currentBranch ? `${currentBranch.name}` : 'Branches'}
            </h1>
          </div>
          <Button onClick={() => navigate("/dashboard")}>Back to Dashboard</Button>
        </div>
      </header>

      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Branch Hierarchy Visualization */}
        <Card className="mb-8">
          <CardContent className="p-6">
            <h2 className="text-xl font-semibold mb-4">Branch Hierarchy</h2>
            <BranchTree rootBranchId={currentBranch?.id || null} />
          </CardContent>
        </Card>
        
        {/* Branch Cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {visibleBranches.map((branch) => (
            <BranchCard key={branch.id} branch={branch} />
          ))}
          
          {visibleBranches.length === 0 && (
            <div className="col-span-full text-center py-8">
              <p className="text-gray-500">No branches found</p>
            </div>
          )}
        </div>
      </main>
    </div>
  );
};

export default BranchList;
