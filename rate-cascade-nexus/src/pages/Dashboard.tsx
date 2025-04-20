import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { useAuth } from "@/contexts/AuthContext";
import { useBranch } from "@/contexts/BranchContext";
import { Button } from "@/components/ui/button";
import DashboardCard from "@/components/DashboardCard";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { ArrowLeft, FolderOpen, ChevronsRight } from "lucide-react";
import AccountList from "@/components/AccountList";

const Dashboard = () => {
  const { isAuthenticated, user, logout } = useAuth();
  const { branches, accounts, getBranchById } = useBranch();
  const navigate = useNavigate();
  
  useEffect(() => {
    if (!isAuthenticated) {
      navigate("/");
    }
  }, [isAuthenticated, navigate]);

  const userBranch = user?.branchId ? getBranchById(user.branchId) : null;
  
  const relevantBranches = user?.role === 'admin'
    ? branches
    : branches.filter(branch => {
        if (!user?.branchId) return false;
        if (branch.id === user.branchId) return true;
        
        let currentBranch = branch;
        while (currentBranch.parentId) {
          if (currentBranch.parentId === user.branchId) return true;
          currentBranch = branches.find(b => b.id === currentBranch.parentId) || currentBranch;
          if (!currentBranch.parentId) break;
        }
        return false;
      });
  
  const relevantAccounts = accounts.filter(account => {
    return relevantBranches.some(branch => branch.id === account.branchId);
  });

  return (
    <div className="min-h-screen bg-gray-50">
      <header className="bg-white shadow">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4 flex justify-between items-center">
          <h1 className="text-2xl font-bold text-gray-900">Dashboard</h1>
          <div className="flex items-center gap-4">
            <p className="text-sm text-gray-600">
              Welcome, <span className="font-medium">{user?.name}</span>
              {userBranch && (
                <span className="ml-2">
                  ({userBranch.name})
                </span>
              )}
            </p>
            <Button variant="outline" onClick={logout}>Logout</Button>
          </div>
        </div>
      </header>

      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
          <DashboardCard
            title="Branches"
            description="Manage your organization's branch hierarchy"
            icon={<FolderOpen size={24} />}
            linkTo="/branches"
            linkText="View All Branches"
            count={relevantBranches.length}
          />
          <DashboardCard
            title="Rate Management"
            description="Update rates across your organization"
            icon={<ChevronsRight size={24} />}
            linkTo="/rate-management"
            linkText="Manage Rates"
          />
          <Card className="h-full flex flex-col">
            <CardHeader>
              <CardTitle>Role</CardTitle>
              <CardDescription>Your role and permissions</CardDescription>
            </CardHeader>
            <CardContent className="flex-grow">
              <div className="space-y-4">
                <div>
                  <p className="text-sm font-medium">Current Role</p>
                  <p className="text-2xl capitalize">{user?.role.replace('_', ' ')}</p>
                </div>
                {userBranch && (
                  <div>
                    <p className="text-sm font-medium">Assigned to</p>
                    <p className="text-lg">{userBranch.name}</p>
                  </div>
                )}
              </div>
            </CardContent>
          </Card>
        </div>

        <AccountList branchId={user?.branchId || undefined} />
      </main>
    </div>
  );
};

export default Dashboard;
