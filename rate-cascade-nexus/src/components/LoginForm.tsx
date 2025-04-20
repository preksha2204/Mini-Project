
import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Label } from "@/components/ui/label";
import { useAuth } from "@/contexts/AuthContext";
import { useBranch } from "@/contexts/BranchContext";

const LoginForm = () => {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [selectedBranchId, setSelectedBranchId] = useState("");
  const [loginAs, setLoginAs] = useState<"parent" | "child">("parent");
  
  const { login } = useAuth();
  const { branches } = useBranch();
  
  // Get top-level branches (no parent)
  const parentBranches = branches.filter(branch => branch.parentId === null);
  
  // Get non-top-level branches (has parent)
  const childBranches = branches.filter(branch => branch.parentId !== null);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    await login(username, password, selectedBranchId);
  };

  const availableBranches = loginAs === "parent" ? parentBranches : childBranches;

  return (
    <Card className="w-full max-w-md mx-auto">
      <CardHeader>
        <CardTitle className="text-2xl">Login</CardTitle>
        <CardDescription>
          Sign in to your account to manage branch rates
        </CardDescription>
      </CardHeader>
      <CardContent>
        <form onSubmit={handleSubmit} className="space-y-4">
          <div className="space-y-2">
            <Label htmlFor="username">Username</Label>
            <Input
              id="username"
              placeholder="Username"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
              required
            />
          </div>
          
          <div className="space-y-2">
            <Label htmlFor="password">Password</Label>
            <Input
              id="password"
              type="password"
              placeholder="Password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
            />
          </div>

          <div className="space-y-2">
            <Label>Login as</Label>
            <div className="flex space-x-2">
              <Button 
                type="button"
                variant={loginAs === "parent" ? "default" : "outline"}
                onClick={() => setLoginAs("parent")}
                className="flex-1"
              >
                Parent Branch
              </Button>
              <Button 
                type="button"
                variant={loginAs === "child" ? "default" : "outline"}
                onClick={() => setLoginAs("child")}
                className="flex-1"
              >
                Child Branch
              </Button>
            </div>
          </div>

          <div className="space-y-2">
            <Label htmlFor="branch">Branch</Label>
            <Select onValueChange={setSelectedBranchId} value={selectedBranchId}>
              <SelectTrigger>
                <SelectValue placeholder="Select a branch" />
              </SelectTrigger>
              <SelectContent>
                {availableBranches.map((branch) => (
                  <SelectItem key={branch.id} value={branch.id}>
                    {branch.name}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>

          <Button type="submit" className="w-full">Login</Button>
        </form>
      </CardContent>
      <CardFooter className="flex justify-center text-sm text-muted-foreground">
        For demo purposes: try username "Admin", "East Manager" or "NY User"
      </CardFooter>
    </Card>
  );
};

export default LoginForm;
