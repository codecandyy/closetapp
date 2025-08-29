import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Sparkles, Heart, Star, CheckCircle } from "lucide-react";

interface FinishProps {
  onComplete: () => void;
}

export const Finish = ({ onComplete }: FinishProps) => {
  return (
    <div className="min-h-screen flex items-center justify-center p-4">
      <div className="max-w-md w-full space-y-6">
        {/* Success Animation */}
        <div className="text-center space-y-4">
          <div className="w-20 h-20 mx-auto bg-gradient-primary rounded-full flex items-center justify-center">
            <CheckCircle className="w-10 h-10 text-white" />
          </div>
          <div className="space-y-2">
            <h1 className="text-2xl font-bold bg-gradient-primary bg-clip-text text-transparent">
              You're All Set! ✨
            </h1>
            <p className="text-muted-foreground">
              Your AI style assistant is ready to help you slay
            </p>
          </div>
        </div>

        {/* Setup Summary */}
        <Card className="p-6 shadow-soft">
          <div className="space-y-4">
            <h3 className="font-semibold text-lg text-center">Your Setup Complete</h3>
            <div className="space-y-3">
              <div className="flex items-center gap-3">
                <div className="w-8 h-8 bg-gradient-secondary rounded-full flex items-center justify-center">
                  <Heart className="w-4 h-4 text-primary" />
                </div>
                <span className="text-sm">Style preferences configured</span>
              </div>
              <div className="flex items-center gap-3">
                <div className="w-8 h-8 bg-gradient-secondary rounded-full flex items-center justify-center">
                  <Star className="w-4 h-4 text-primary" />
                </div>
                <span className="text-sm">Budget tracking enabled</span>
              </div>
              <div className="flex items-center gap-3">
                <div className="w-8 h-8 bg-gradient-secondary rounded-full flex items-center justify-center">
                  <Sparkles className="w-4 h-4 text-primary" />
                </div>
                <span className="text-sm">AI assistant activated</span>
              </div>
            </div>
          </div>
        </Card>

        {/* What's Next */}
        <Card className="p-4 bg-gradient-secondary border-none">
          <div className="text-center space-y-2">
            <div className="text-sm font-medium text-primary">What's Next?</div>
            <p className="text-xs text-muted-foreground">
              Start building your closet, track your budget, and get AI-powered style advice!
            </p>
          </div>
        </Card>

        {/* CTA */}
        <Button 
          variant="hero" 
          size="lg" 
          onClick={onComplete}
          className="w-full gap-2"
        >
          <Sparkles className="w-4 h-4" />
          Start Your Style Journey
        </Button>
      </div>
    </div>
  );
};
