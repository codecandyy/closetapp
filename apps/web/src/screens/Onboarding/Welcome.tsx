import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Sparkles, Heart, Star } from "lucide-react";
import heroImage from "@/assets/hero-bg.jpg";

interface WelcomeProps {
  onNext: () => void;
}

export const Welcome = ({ onNext }: WelcomeProps) => {
  return (
    <div className="min-h-screen flex items-center justify-center p-4">
      <div className="max-w-md w-full space-y-6">
        {/* Hero Section */}
        <div 
          className="relative overflow-hidden rounded-2xl p-8 text-white shadow-glow"
          style={{
            backgroundImage: `linear-gradient(135deg, rgba(232, 20, 128, 0.9), rgba(232, 20, 128, 0.7)), url(${heroImage})`,
            backgroundSize: 'cover',
            backgroundPosition: 'center'
          }}
        >
          <div className="relative z-10 space-y-4 text-center">
            <div className="flex items-center justify-center gap-2 mb-4">
              <Sparkles className="w-8 h-8 animate-float" />
              <span className="text-2xl font-bold">AI Girly Assistant</span>
            </div>
            <h1 className="text-3xl font-bold leading-tight">
              Hey It-Girl! ✨<br />
              <span className="text-yellow-accent">Ready to slay</span><br />
              your style goals?
            </h1>
            <p className="text-white/80 text-sm">
              Your AI bestie is here to help you look amazing & save money 💕
            </p>
          </div>
        </div>

        {/* Features */}
        <Card className="p-6 shadow-soft">
          <div className="space-y-4">
            <h3 className="font-semibold text-lg text-center">What you'll get:</h3>
            <div className="space-y-3">
              <div className="flex items-center gap-3">
                <div className="w-8 h-8 bg-gradient-secondary rounded-full flex items-center justify-center">
                  <Heart className="w-4 h-4 text-primary" />
                </div>
                <span className="text-sm">Personalized style advice</span>
              </div>
              <div className="flex items-center gap-3">
                <div className="w-8 h-8 bg-gradient-secondary rounded-full flex items-center justify-center">
                  <Star className="w-4 h-4 text-primary" />
                </div>
                <span className="text-sm">Smart budget tracking</span>
              </div>
              <div className="flex items-center gap-3">
                <div className="w-8 h-8 bg-gradient-secondary rounded-full flex items-center justify-center">
                  <Sparkles className="w-4 h-4 text-primary" />
                </div>
                <span className="text-sm">AI-powered closet organization</span>
              </div>
            </div>
          </div>
        </Card>

        {/* CTA */}
        <Button 
          variant="hero" 
          size="lg" 
          onClick={onNext}
          className="w-full gap-2"
        >
          <Sparkles className="w-4 h-4" />
          Get Started
        </Button>
      </div>
    </div>
  );
};
