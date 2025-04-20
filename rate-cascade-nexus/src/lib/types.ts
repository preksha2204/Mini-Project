
export type Branch = {
  id: string;
  name: string;
  rate: number;
  parentId: string | null;
  level: number;
  childrenIds: string[];
};

export type Account = {
  id: string;
  name: string;
  branchId: string;
  effectiveRate: number;
  balance: number;
};

export type User = {
  id: string;
  name: string;
  role: 'admin' | 'branch_manager' | 'user';
  branchId: string | null;
};

export type AuthContextType = {
  user: User | null;
  login: (username: string, password: string, branchId: string) => Promise<void>;
  logout: () => void;
  isAuthenticated: boolean;
};

export type BranchContextType = {
  branches: Branch[];
  accounts: Account[];
  currentBranch: Branch | null;
  setCurrentBranch: (branch: Branch | null) => void;
  updateBranchRate: (branchId: string, newRate: number) => void;
  getChildBranches: (branchId: string | null) => Branch[];
  getBranchAccounts: (branchId: string) => Account[];
  getBranchById: (branchId: string) => Branch | undefined;
};
