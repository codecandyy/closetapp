import { useState } from "react";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import { ShoppingBag, X, Heart, AlertTriangle, CheckCircle } from "lucide-react";
import { analyzeItem, type AnalysisResult } from "@shared-logic/rules";

export const BuyOrSkip = () => {
  const [itemPrice, setItemPrice] = useState("");
  const [analysis, setAnalysis] = useState<AnalysisResult | null>(null);
  const [isAnalyzing, setIsAnalyzing] = useState(false);

  const handleAnalyzeItem = async () => {
    if (!itemPrice) return;
    
    setIsAnalyzing(true);
    
    try {
      // Mock data for analysis
      const itemData = {
        price: parseFloat(itemPrice),
        category: "dress", // Mock category
        color: "black", // Mock color
        style: "chic", // Mock style
        budget: 300,
        spent: 120,
        closetItems: [
          { category: "dress", color: "black", style: "chic" },
          { category: "top", color: "white", style: "minimalist" }
        ]
      };
      
      const result = await analyzeItem(itemData);
      setAnalysis(result);
    } catch (error) {
      console.error("Analysis failed:", error);
      // Fallback to mock analysis
      const price = parseFloat(itemPrice);
      const remainingBudget = 180;
      
      const mockResult: AnalysisResult = {
        recommendation: price <= remainingBudget && Math.random() > 0.3 ? 'buy' : 'skip',
        confidence: Math.floor(Math.random() * 40) + 60,
        reasons: [
          price > remainingBudget ? 'Over monthly budget' : 'Within budget',
          Math.random() > 0.5 ? 'Good style match' : 'Low style match'
        ],
        factors: {
          budgetStatus: price > remainingBudget ? 'over' : price > remainingBudget * 0.8 ? 'close' : 'under',
          styleMatch: Math.floor(Math.random() * 40) + 60,
          duplicates: Math.random() > 0.7 ? ['Black mini dress'] : [],
          valueScore: Math.floor(Math.random() * 30) + 70
        }
      };
      
      setAnalysis(mockResult);
    } finally {
      setIsAnalyzing(false);
    }
  };

  const reset = () => {
    setItemPrice("");
    setAnalysis(null);
  };

  return (
    <div className="max-w-md mx-auto space-y-6">
      <div className="text-center space-y-2">
        <h2 className="text-2xl font-bold bg-gradient-primary bg-clip-text text-transparent">
          Buy or Skip? 🤔
        </h2>
        <p className="text-muted-foreground text-sm">
          Let your AI BFF help you make smart fashion decisions
        </p>
      </div>

      <Card className="p-6 shadow-soft">
        <div className="space-y-4">
          <div className="w-20 h-20 mx-auto bg-gradient-secondary rounded-full flex items-center justify-center">
            <ShoppingBag className="w-10 h-10 text-primary" />
          </div>
          
          <div className="text-center space-y-2">
            <h3 className="font-semibold">Upload Item Photo</h3>
            <p className="text-xs text-muted-foreground">
              Take a photo or upload from gallery
            </p>
          </div>
          
          <div className="space-y-3">
            <Input
              type="number"
              placeholder="Price ($)"
              value={itemPrice}
              onChange={(e) => setItemPrice(e.target.value)}
            />
            
            <Button 
              variant="hero" 
              onClick={handleAnalyzeItem}
              disabled={!itemPrice || isAnalyzing}
              className="w-full gap-2"
            >
              {isAnalyzing ? (
                <>
                  <div className="w-4 h-4 border-2 border-white/20 border-t-white rounded-full animate-spin" />
                  Analyzing...
                </>
              ) : (
                <>
                  <Heart className="w-4 h-4" />
                  Get AI Advice
                </>
              )}
            </Button>
          </div>
        </div>
      </Card>

      {analysis && (
        <Card className={`p-6 shadow-soft border-2 ${
          analysis.recommendation === 'buy' 
            ? 'border-green-200 bg-green-50/50' 
            : 'border-red-200 bg-red-50/50'
        }`}>
          <div className="space-y-4">
            <div className="text-center">
              <div className={`text-4xl mb-2 ${
                analysis.recommendation === 'buy' ? 'text-green-500' : 'text-red-500'
              }`}>
                {analysis.recommendation === 'buy' ? '💖' : '🚫'}
              </div>
              <h3 className={`text-xl font-bold ${
                analysis.recommendation === 'buy' ? 'text-green-700' : 'text-red-700'
              }`}>
                {analysis.recommendation === 'buy' ? 'BUY IT!' : 'SKIP IT!'}
              </h3>
            </div>

            <div className="space-y-3">
              <div className="flex items-center justify-between">
                <span className="text-sm font-medium">Style Match</span>
                <Badge variant={analysis.factors.styleMatch > 80 ? "default" : "secondary"}>
                  {analysis.factors.styleMatch}%
                </Badge>
              </div>

              <div className="flex items-center justify-between">
                <span className="text-sm font-medium">Budget Status</span>
                <Badge variant={
                  analysis.factors.budgetStatus === 'under' ? "default" : 
                  analysis.factors.budgetStatus === 'close' ? "secondary" : "destructive"
                }>
                  {analysis.factors.budgetStatus === 'under' ? 'Good' : 
                   analysis.factors.budgetStatus === 'close' ? 'Close' : 'Over'}
                </Badge>
              </div>

              <div className="flex items-center justify-between">
                <span className="text-sm font-medium">Confidence</span>
                <Badge variant={analysis.confidence > 80 ? "default" : "secondary"}>
                  {analysis.confidence}%
                </Badge>
              </div>

              {analysis.factors.duplicates.length > 0 && (
                <div className="space-y-1">
                  <span className="text-sm font-medium flex items-center gap-1">
                    <AlertTriangle className="w-3 h-3 text-yellow-500" />
                    Similar Items
                  </span>
                  {analysis.factors.duplicates.map((dup, i) => (
                    <Badge key={i} variant="outline" className="mr-1 text-xs">
                      {dup}
                    </Badge>
                  ))}
                </div>
              )}

              <div className="space-y-1">
                <span className="text-sm font-medium">Reasons</span>
                <ul className="text-xs text-muted-foreground space-y-1">
                  {analysis.reasons.map((reason, i) => (
                    <li key={i} className="flex items-center gap-2">
                      {analysis.recommendation === 'buy' ? (
                        <CheckCircle className="w-3 h-3 text-green-500" />
                      ) : (
                        <X className="w-3 h-3 text-red-500" />
                      )}
                      {reason}
                    </li>
                  ))}
                </ul>
              </div>
            </div>

            <Button variant="outline" onClick={reset} className="w-full">
              Analyze Another Item
            </Button>
          </div>
        </Card>
      )}
    </div>
  );
};