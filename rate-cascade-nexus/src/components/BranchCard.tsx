
import React from 'react';
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { Branch } from '@/lib/types';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { useBranch } from '@/contexts/BranchContext';
import { useNavigate } from 'react-router-dom';

interface BranchCardProps {
  branch: Branch;
}

const BranchCard: React.FC<BranchCardProps> = ({ branch }) => {
  const { setCurrentBranch, getChildBranches, getBranchAccounts } = useBranch();
  const navigate = useNavigate();
  
  const childBranches = getChildBranches(branch.id);
  const accounts = getBranchAccounts(branch.id);
  
  const handleViewDetails = () => {
    setCurrentBranch(branch);
    navigate(`/branches`);
  };
  
  const handleUpdateRate = () => {
    setCurrentBranch(branch);
    navigate('/rate-management');
  };

  return (
    <Card className="h-full flex flex-col">
      <CardHeader>
        <div className="flex justify-between items-start">
          <CardTitle>{branch.name}</CardTitle>
          <Badge variant="outline" className="bg-sky-100 text-sky-800 whitespace-nowrap">
            Rate: {branch.rate.toFixed(2)}%
          </Badge>
        </div>
      </CardHeader>
      <CardContent className="flex-grow">
        <div className="space-y-2">
          <p className="text-sm flex justify-between">
            <span className="text-muted-foreground">Child branches:</span> 
            <span className="font-medium">{childBranches.length}</span>
          </p>
          <p className="text-sm flex justify-between">
            <span className="text-muted-foreground">Accounts:</span> 
            <span className="font-medium">{accounts.length}</span>
          </p>
          {branch.parentId && (
            <p className="text-sm flex justify-between">
              <span className="text-muted-foreground">Parent branch:</span>
              <span className="font-medium">Yes</span>
            </p>
          )}
        </div>
      </CardContent>
      <CardFooter className="flex space-x-2">
        <Button variant="outline" onClick={handleViewDetails} className="flex-1">
          View Details
        </Button>
        <Button onClick={handleUpdateRate} className="flex-1">
          Update Rate
        </Button>
      </CardFooter>
    </Card>
  );
};

export default BranchCard;
