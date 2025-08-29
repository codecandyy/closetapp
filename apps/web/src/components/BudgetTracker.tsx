import { useState } from "react";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Progress } from "@/components/ui/progress";
import { DollarSign, TrendingDown, TrendingUp, Plus, Target } from "lucide-react";

interface BudgetData {
  monthly: number;
  spent: number;
  remaining: number;
}

export const BudgetTracker = () => {
  const [budget, setBudget] = useState<BudgetData>({
    monthly: 300,
    spent: 120,
    remaining: 180
  });
  const [newExpense, setNewExpense] = useState("");
  const [showAddExpense, setShowAddExpense] = useState(false);

  const spentPercentage = (budget.spent / budget.monthly) * 100;
  const isOverBudget = spentPercentage > 100;

  const addExpense = () => {
    const amount = parseFloat(newExpense);
    if (amount > 0) {
      setBudget(prev => ({
        ...prev,
        spent: prev.spent + amount,
        remaining: prev.remaining - amount
      }));
      setNewExpense("");
      setShowAddExpense(false);
    }
  };

  return (
    <div className="space-y-6">
      <div className="text-center space-y-2">
        <h2 className="text-2xl font-bold bg-gradient-primary bg-clip-text text-transparent">
          Fashion Budget 💸
        </h2>
        <p className="text-muted-foreground">
          Track your clothing expenses like the smart It-girl you are
        </p>
      </div>

      <div className="grid md:grid-cols-3 gap-4">
        <Card className="p-6 shadow-soft">
          <div className="space-y-2">
            <div className="flex items-center gap-2">
              <Target className="w-5 h-5 text-accent" />
              <span className="text-sm font-medium">Monthly Goal</span>
            </div>
            <div className="text-2xl font-bold text-accent">
              ${budget.monthly}
            </div>
          </div>
        </Card>

        <Card className="p-6 shadow-soft">
          <div className="space-y-2">
            <div className="flex items-center gap-2">
              <TrendingUp className="w-5 h-5 text-primary" />
              <span className="text-sm font-medium">Spent</span>
            </div>
            <div className="text-2xl font-bold text-primary">
              ${budget.spent}
            </div>
          </div>
        </Card>

        <Card className="p-6 shadow-soft">
          <div className="space-y-2">
            <div className="flex items-center gap-2">
              <TrendingDown className={`w-5 h-5 ${isOverBudget ? 'text-destructive' : 'text-green-500'}`} />
              <span className="text-sm font-medium">Remaining</span>
            </div>
            <div className={`text-2xl font-bold ${isOverBudget ? 'text-destructive' : 'text-green-500'}`}>
              ${budget.remaining}
            </div>
          </div>
        </Card>
      </div>

      <Card className="p-6 shadow-soft">
        <div className="space-y-4">
          <div className="flex items-center justify-between">
            <h3 className="font-semibold text-lg">Budget Progress</h3>
            <span className={`text-sm font-medium ${isOverBudget ? 'text-destructive' : 'text-primary'}`}>
              {spentPercentage.toFixed(1)}%
            </span>
          </div>
          
          <Progress 
            value={Math.min(spentPercentage, 100)} 
            className={`h-3 ${isOverBudget ? '[&>*]:bg-destructive' : ''}`}
          />
          
          {isOverBudget && (
            <div className="text-destructive text-sm font-medium">
              ⚠️ Over budget by ${Math.abs(budget.remaining)}
            </div>
          )}
        </div>
      </Card>

      <div className="flex gap-3">
        <Button 
          variant="hero" 
          onClick={() => setShowAddExpense(true)}
          className="flex-1 gap-2"
        >
          <Plus className="w-4 h-4" />
          Add Purchase
        </Button>
        <Button variant="outline" className="gap-2">
          <DollarSign className="w-4 h-4" />
          Set Budget
        </Button>
      </div>

      {showAddExpense && (
        <Card className="p-6 shadow-soft border-2 border-primary/20">
          <div className="space-y-4">
            <h3 className="font-semibold">Add New Purchase</h3>
            <div className="flex gap-3">
              <Input
                type="number"
                placeholder="Amount ($)"
                value={newExpense}
                onChange={(e) => setNewExpense(e.target.value)}
                className="flex-1"
              />
              <Button onClick={addExpense} disabled={!newExpense}>
                Add
              </Button>
              <Button 
                variant="ghost" 
                onClick={() => setShowAddExpense(false)}
              >
                Cancel
              </Button>
            </div>
          </div>
        </Card>
      )}

      <Card className="p-4 bg-gradient-secondary border-none">
        <div className="text-center space-y-2">
          <div className="text-sm font-medium text-primary">💡 Smart Tip</div>
          <p className="text-xs text-muted-foreground">
            Set aside 20% of your fashion budget for investment pieces that match your style goals!
          </p>
        </div>
      </Card>
    </div>
  );
};