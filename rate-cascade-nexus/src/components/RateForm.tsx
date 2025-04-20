
import { useState } from 'react';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Alert, AlertDescription, AlertTitle } from '@/components/ui/alert';
import { useBranch } from '@/contexts/BranchContext';
import { AlertCircle } from 'lucide-react';

const RateForm = () => {
  const { branches, currentBranch, updateBranchRate } = useBranch();
  const [selectedBranchId, setSelectedBranchId] = useState(currentBranch?.id || '');
  const [newRate, setNewRate] = useState('');
  const [previewMode, setPreviewMode] = useState(false);
  
  const selectedBranch = branches.find(branch => branch.id === selectedBranchId);
  
  // Get all affected branches if a branch is selected
  const getAffectedBranches = (branchId: string): string[] => {
    const result: string[] = [branchId];
    
    const branch = branches.find(b => b.id === branchId);
    if (!branch) return result;
    
    branch.childrenIds.forEach(childId => {
      result.push(...getAffectedBranches(childId));
    });
    
    return result;
  };
  
  const affectedBranchIds = selectedBranchId ? getAffectedBranches(selectedBranchId) : [];
  const affectedBranches = branches.filter(branch => affectedBranchIds.includes(branch.id));
  
  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!selectedBranchId || !newRate || isNaN(Number(newRate))) return;
    
    const rateValue = Number(newRate);
    
    if (previewMode) {
      // Apply the rate change
      updateBranchRate(selectedBranchId, rateValue);
      // Reset form
      setNewRate('');
      setPreviewMode(false);
    } else {
      // Show preview
      setPreviewMode(true);
    }
  };
  
  return (
    <Card className="w-full max-w-xl mx-auto">
      <CardHeader>
        <CardTitle>Update Rate</CardTitle>
        <CardDescription>
          Change the rate for a branch and all its child branches
        </CardDescription>
      </CardHeader>
      <CardContent>
        <form onSubmit={handleSubmit} className="space-y-4">
          <div className="space-y-2">
            <Label htmlFor="branch-select">Select Branch</Label>
            <Select 
              value={selectedBranchId} 
              onValueChange={value => {
                setSelectedBranchId(value);
                setPreviewMode(false);
              }}
              disabled={previewMode}
            >
              <SelectTrigger id="branch-select">
                <SelectValue placeholder="Select a branch" />
              </SelectTrigger>
              <SelectContent>
                {branches.map((branch) => (
                  <SelectItem key={branch.id} value={branch.id}>
                    {branch.name} (Current: {branch.rate.toFixed(2)}%)
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>
          
          <div className="space-y-2">
            <Label htmlFor="rate-input">New Rate (%)</Label>
            <Input
              id="rate-input"
              type="number"
              step="0.01"
              min="0"
              max="100"
              placeholder="Enter new rate..."
              value={newRate}
              onChange={(e) => setNewRate(e.target.value)}
              disabled={previewMode || !selectedBranchId}
            />
          </div>

          {previewMode && selectedBranch && (
            <Alert className="bg-amber-50 text-amber-900 border-amber-200">
              <AlertCircle className="h-4 w-4 text-amber-600" />
              <AlertTitle>Rate Change Preview</AlertTitle>
              <AlertDescription>
                <p>Changing rate for <strong>{selectedBranch.name}</strong> from <strong>{selectedBranch.rate.toFixed(2)}%</strong> to <strong>{parseFloat(newRate).toFixed(2)}%</strong></p>
                <p className="mt-2">This change will affect {affectedBranches.length} branch(es) and all accounts under them.</p>
                <ul className="mt-1 ml-4 text-sm list-disc">
                  {affectedBranches.slice(0, 5).map((branch) => (
                    <li key={branch.id}>{branch.name}</li>
                  ))}
                  {affectedBranches.length > 5 && <li>And {affectedBranches.length - 5} more...</li>}
                </ul>
              </AlertDescription>
            </Alert>
          )}
        </form>
      </CardContent>
      <CardFooter>
        {previewMode ? (
          <div className="flex space-x-2 w-full">
            <Button 
              variant="outline" 
              onClick={() => setPreviewMode(false)} 
              className="flex-1"
            >
              Cancel
            </Button>
            <Button 
              type="submit"
              onClick={handleSubmit}
              className="flex-1"
            >
              Confirm Rate Change
            </Button>
          </div>
        ) : (
          <Button 
            type="submit"
            onClick={handleSubmit}
            disabled={!selectedBranchId || !newRate || isNaN(Number(newRate))}
            className="w-full"
          >
            Preview Rate Change
          </Button>
        )}
      </CardFooter>
    </Card>
  );
};

export default RateForm;
