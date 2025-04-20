import React from 'react';
import { Branch } from '@/lib/types';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { useBranch } from '@/contexts/BranchContext';

interface BranchNodeProps {
  branch: Branch;
  depth?: number;
  isLastChild?: boolean;
}

const BranchNode: React.FC<BranchNodeProps> = ({ branch, depth = 0, isLastChild = false }) => {
  const { getChildBranches, getBranchAccounts } = useBranch();
  const childBranches = getChildBranches(branch.id);
  const accounts = getBranchAccounts(branch.id);

  return (
    <div className={`ml-${depth * 8} ${depth > 0 ? 'branch-tree-connector' : 'branch-tree-connector-root'}`}>
      <Card className="mb-2 border-l-4" style={{ borderLeftColor: depth === 0 ? '#0ea5e9' : '#64748b' }}>
        <CardHeader className="p-3">
          <div className="flex justify-between items-center">
            <CardTitle className="text-base">{branch.name}</CardTitle>
            <Badge variant="outline" className="bg-sky-100 text-sky-800">
              Rate: {branch.rate.toFixed(2)}%
            </Badge>
          </div>
        </CardHeader>
        <CardContent className="p-3 pt-0">
          <p className="text-sm text-muted-foreground">
            {accounts.length} account{accounts.length !== 1 ? 's' : ''}
          </p>
        </CardContent>
      </Card>
      
      {childBranches.map((childBranch, index) => (
        <BranchNode
          key={childBranch.id}
          branch={childBranch}
          depth={depth + 1}
          isLastChild={index === childBranches.length - 1}
        />
      ))}
    </div>
  );
};

interface BranchTreeProps {
  rootBranchId: string | null;
}

const BranchTree: React.FC<BranchTreeProps> = ({ rootBranchId }) => {
  const { getChildBranches, getBranchById } = useBranch();
  
  // If rootBranchId is provided, show that branch and its children
  if (rootBranchId) {
    const rootBranch = getBranchById(rootBranchId);
    if (!rootBranch) return <div>Branch not found</div>;
    
    return <BranchNode branch={rootBranch} />;
  }
  
  // Otherwise, show all top level branches
  const rootBranches = getChildBranches(null);
  
  return (
    <div className="space-y-4">
      {rootBranches.map(branch => (
        <BranchNode key={branch.id} branch={branch} />
      ))}
    </div>
  );
};

export default BranchTree;
