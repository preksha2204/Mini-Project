
import React, { createContext, useState, useContext } from 'react';
import { User, AuthContextType } from '@/lib/types';
import { mockUsers } from '@/lib/mockData';
import { useToast } from "@/components/ui/use-toast";

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const AuthProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [user, setUser] = useState<User | null>(null);
  const { toast } = useToast();

  const login = async (username: string, password: string, branchId: string) => {
    // In a real app, this would be an API call
    try {
      // Simple mock authentication
      const foundUser = mockUsers.find(u => u.name.toLowerCase() === username.toLowerCase());
      
      if (!foundUser) {
        toast({
          title: "Authentication failed",
          description: "User not found",
          variant: "destructive"
        });
        return;
      }
      
      // In a real app, we would check the password here
      
      // If branch selection is required, update the user's branchId
      const userToSet = {
        ...foundUser,
        branchId: branchId || foundUser.branchId
      };
      
      setUser(userToSet);
      
      toast({
        title: "Authentication successful",
        description: `Welcome, ${userToSet.name}!`
      });
    } catch (error) {
      toast({
        title: "Authentication failed",
        description: "An error occurred during login",
        variant: "destructive"
      });
    }
  };

  const logout = () => {
    setUser(null);
    toast({
      title: "Logged out",
      description: "You have been logged out successfully"
    });
  };

  const value = {
    user,
    login,
    logout,
    isAuthenticated: !!user,
  };

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
};

export const useAuth = (): AuthContextType => {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
};
