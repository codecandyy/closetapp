import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { DollarSign, ArrowRight, ArrowLeft, AlertCircle } from "lucide-react";

interface BudgetProps {
  onNext: () => void;
  onBack: () => void;
}

export const Budget = ({ onNext, onBack }: BudgetProps) => {
  const [budget, setBudget] = useState<string>("");
  const [error, setError] = useState<string>("");

  const handleBudgetChange = (value: string) => {
    setBudget(value);
    setError("");
    
    const numValue = parseFloat(value);
    if (value && (isNaN(numValue) || numValue < 0)) {
      setError("Please enter a valid amount (0 or higher)");
    }
  };

  const handleNext = () => {
    const numValue = parseFloat(budget);
    if (!budget || isNaN(numValue) || numValue < 0) {
      setError("Please enter a valid amount (0 or higher)");
      return;
    }
    onNext();
  };

  const canProceed = budget && !error && parseFloat(budget) >= 0;

  return (
    <div className="min-h-screen flex items-center justify-center p-4">
      <div className="max-w-md w-full space-y-6">
        {/* Header */}
        <div className="text-center space-y-2">
          <div className="flex items-center justify-center gap-2 mb-4">
            <DollarSign className="w-6 h-6 text-primary" />
            <h1 className="text-2xl font-bold bg-gradient-primary bg-clip-text text-transparent">
              Set Your Fashion Budget 💸
            </h1>
          </div>
          <p className="text-muted-foreground">
            Track your clothing expenses like the smart It-girl you are
          </p>
        </div>

        {/* Budget Input */}
        <Card className="p-6 shadow-soft">
          <div className="space-y-4">
            <div className="space-y-2">
              <Label htmlFor="budget" className="text-sm font-medium">
                Monthly Clothing Budget
              </Label>
              <div className="relative">
                <DollarSign className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground w-4 h-4" />
                <Input
                  id="budget"
                  type="number"
                  min="0"
                  step="0.01"
                  placeholder="300"
                  value={budget}
                  onChange={(e) => handleBudgetChange(e.target.value)}
                  className="pl-10"
                />
              </div>
              {error && (
                <div className="flex items-center gap-2 text-sm text-destructive">
                  <AlertCircle className="w-4 h-4" />
                  {error}
                </div>
              )}
            </div>

            {/* Budget Tips */}
            <Card className="p-4 bg-gradient-secondary border-none">
              <div className="space-y-2">
                <div className="text-sm font-medium text-primary">💡 Budget Tips</div>
                <ul className="text-xs text-muted-foreground space-y-1">
                  <li>• Start with 5-10% of your monthly income</li>
                  <li>• Consider seasonal shopping patterns</li>
                  <li>• Include accessories and shoes</li>
                  <li>• You can always adjust later!</li>
                </ul>
              </div>
            </Card>
          </div>
        </Card>

        {/* Navigation */}
        <div className="flex justify-between">
          <Button variant="outline" onClick={onBack}>
            <ArrowLeft className="w-4 h-4 mr-2" />
            Back
          </Button>
          <Button 
            variant="hero" 
            onClick={handleNext}
            disabled={!canProceed}
            className="gap-2"
          >
            Next
            <ArrowRight className="w-4 h-4" />
          </Button>
        </div>
      </div>
    </div>
  );
};
