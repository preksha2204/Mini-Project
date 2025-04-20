
import React from 'react';
import { Account } from '@/lib/types';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { useBranch } from '@/contexts/BranchContext';

interface AccountListProps {
  branchId?: string;
}

const AccountList: React.FC<AccountListProps> = ({ branchId }) => {
  const { accounts, getBranchById } = useBranch();
  
  const filteredAccounts = branchId 
    ? accounts.filter(account => account.branchId === branchId)
    : accounts;

  const branchName = branchId ? getBranchById(branchId)?.name : 'All Branches';

  if (filteredAccounts.length === 0) {
    return (
      <Card>
        <CardHeader>
          <CardTitle>Accounts - {branchName}</CardTitle>
        </CardHeader>
        <CardContent>
          <p className="text-muted-foreground">No accounts found for this branch.</p>
        </CardContent>
      </Card>
    );
  }

  return (
    <Card>
      <CardHeader>
        <CardTitle>Accounts - {branchName}</CardTitle>
      </CardHeader>
      <CardContent>
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>Account Name</TableHead>
              <TableHead>Effective Rate</TableHead>
              <TableHead className="text-right">Balance</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {filteredAccounts.map((account) => (
              <TableRow key={account.id}>
                <TableCell className="font-medium">{account.name}</TableCell>
                <TableCell>{account.effectiveRate.toFixed(2)}%</TableCell>
                <TableCell className="text-right">
                  ${account.balance.toLocaleString()}
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </CardContent>
    </Card>
  );
};

export default AccountList;
