
import { Branch, Account, User } from './types';

export const mockBranches: Branch[] = [
  {
    id: 'b1',
    name: 'Headquarters',
    rate: 5.0,
    parentId: null,
    level: 0,
    childrenIds: ['b2', 'b3']
  },
  {
    id: 'b2',
    name: 'East Region',
    rate: 5.0,
    parentId: 'b1',
    level: 1,
    childrenIds: ['b4', 'b5']
  },
  {
    id: 'b3',
    name: 'West Region',
    rate: 5.0,
    parentId: 'b1',
    level: 1,
    childrenIds: ['b6']
  },
  {
    id: 'b4',
    name: 'New York Branch',
    rate: 5.0,
    parentId: 'b2',
    level: 2,
    childrenIds: []
  },
  {
    id: 'b5',
    name: 'Boston Branch',
    rate: 5.0,
    parentId: 'b2',
    level: 2,
    childrenIds: []
  },
  {
    id: 'b6',
    name: 'San Francisco Branch',
    rate: 5.0,
    parentId: 'b3',
    level: 2,
    childrenIds: ['b7']
  },
  {
    id: 'b7',
    name: 'Silicon Valley Office',
    rate: 5.0,
    parentId: 'b6',
    level: 3,
    childrenIds: []
  }
];

export const mockAccounts: Account[] = [
  {
    id: 'a1',
    name: 'Corporate Account A',
    branchId: 'b1',
    effectiveRate: 5.0,
    balance: 1000000
  },
  {
    id: 'a2',
    name: 'East Operations',
    branchId: 'b2',
    effectiveRate: 5.0,
    balance: 500000
  },
  {
    id: 'a3',
    name: 'West Operations',
    branchId: 'b3',
    effectiveRate: 5.0,
    balance: 450000
  },
  {
    id: 'a4',
    name: 'NYC Client 1',
    branchId: 'b4',
    effectiveRate: 5.0,
    balance: 120000
  },
  {
    id: 'a5',
    name: 'NYC Client 2',
    branchId: 'b4',
    effectiveRate: 5.0,
    balance: 85000
  },
  {
    id: 'a6',
    name: 'Boston Client',
    branchId: 'b5',
    effectiveRate: 5.0,
    balance: 95000
  },
  {
    id: 'a7',
    name: 'SF Client 1',
    branchId: 'b6',
    effectiveRate: 5.0,
    balance: 150000
  },
  {
    id: 'a8',
    name: 'Tech Startup',
    branchId: 'b7',
    effectiveRate: 5.0,
    balance: 75000
  }
];

export const mockUsers: User[] = [
  {
    id: 'u1',
    name: 'Admin',
    role: 'admin',
    branchId: null
  },
  {
    id: 'u2',
    name: 'East Manager',
    role: 'branch_manager',
    branchId: 'b2'
  },
  {
    id: 'u3',
    name: 'West Manager',
    role: 'branch_manager',
    branchId: 'b3'
  },
  {
    id: 'u4',
    name: 'NY User',
    role: 'user',
    branchId: 'b4'
  }
];
