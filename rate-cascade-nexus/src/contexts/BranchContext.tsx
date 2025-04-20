
import React, { createContext, useContext, useState, useEffect } from 'react';
import { Branch, Account, BranchContextType } from '@/lib/types';
import { mockBranches, mockAccounts } from '@/lib/mockData';
import { useToast } from "@/components/ui/use-toast";

const BranchContext = createContext<BranchContextType | undefined>(undefined);

export const BranchProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [branches, setBranches] = useState<Branch[]>([...mockBranches]);
  const [accounts, setAccounts] = useState<Account[]>([...mockAccounts]);
  const [currentBranch, setCurrentBranch] = useState<Branch | null>(null);
  const { toast } = useToast();

  // Function to get a branch by ID
  const getBranchById = (branchId: string): Branch | undefined => {
    return branches.find(branch => branch.id === branchId);
  };

  // Function to get all child branches of a given branch
  const getChildBranches = (branchId: string | null): Branch[] => {
    return branches.filter(branch => branch.parentId === branchId);
  };

  // Function to get all accounts in a branch
  const getBranchAccounts = (branchId: string): Account[] => {
    return accounts.filter(account => account.branchId === branchId);
  };

  // Recursive function to update rates for a branch and all its descendants
  const updateRatesRecursively = (branchId: string, newRate: number, updatedBranches: Branch[], updatedAccounts: Account[]) => {
    // Update the branch itself
    const branchIndex = updatedBranches.findIndex(b => b.id === branchId);
    if (branchIndex !== -1) {
      updatedBranches[branchIndex] = {
        ...updatedBranches[branchIndex],
        rate: newRate
      };

      // Update all accounts in this branch
      updatedAccounts.forEach((account, index) => {
        if (account.branchId === branchId) {
          updatedAccounts[index] = {
            ...account,
            effectiveRate: newRate
          };
        }
      });

      // Find and update all child branches recursively
      const branch = updatedBranches[branchIndex];
      branch.childrenIds.forEach(childId => {
        updateRatesRecursively(childId, newRate, updatedBranches, updatedAccounts);
      });
    }
  };

  // Function to update a branch rate (and cascade the change)
  const updateBranchRate = (branchId: string, newRate: number) => {
    const updatedBranches = [...branches];
    const updatedAccounts = [...accounts];
    
    updateRatesRecursively(branchId, newRate, updatedBranches, updatedAccounts);
    
    setBranches(updatedBranches);
    setAccounts(updatedAccounts);
    
    toast({
      title: "Rate Updated",
      description: `Rate has been updated to ${newRate}% and cascaded to all child branches and accounts.`
    });
  };

  const value = {
    branches,
    accounts,
    currentBranch,
    setCurrentBranch,
    updateBranchRate,
    getChildBranches,
    getBranchAccounts,
    getBranchById,
  };

  return <BranchContext.Provider value={value}>{children}</BranchContext.Provider>;
};

export const useBranch = (): BranchContextType => {
  const context = useContext(BranchContext);
  if (context === undefined) {
    throw new Error('useBranch must be used within a BranchProvider');
  }
  return context;
};
