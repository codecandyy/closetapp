import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Progress } from "@/components/ui/progress";
import { Badge } from "@/components/ui/badge";
import { 
  Sparkles, 
  ShoppingBag, 
  Target, 
  Award,
  TrendingUp,
  Heart,
  Star
} from "lucide-react";
import heroImage from "@/assets/hero-bg.jpg";

interface DashboardProps {
  onNavigate: (section: string) => void;
}

export const Dashboard = ({ onNavigate }: DashboardProps) => {
  const currentStyle = {
    y2k: 40,
    chic: 30,
    girly: 20,
    classy: 10
  };

  const goalStyle = {
    y2k: 50,
    chic: 30,
    girly: 20,
    classy: 0
  };

  const budgetData = {
    monthly: 300,
    spent: 120,
    remaining: 180
  };

  const achievements = [
    { name: "Style Explorer", icon: "✨", unlocked: true },
    { name: "Budget Queen", icon: "👑", unlocked: true },
    { name: "Closet Curator", icon: "🎀", unlocked: false },
    { name: "It-Girl Status", icon: "💎", unlocked: false }
  ];

  return (
    <div className="space-y-6">
      {/* Hero Section */}
      <div 
        className="relative overflow-hidden rounded-2xl p-8 text-white shadow-glow"
        style={{
          backgroundImage: `linear-gradient(135deg, rgba(232, 20, 128, 0.9), rgba(232, 20, 128, 0.7)), url(${heroImage})`,
          backgroundSize: 'cover',
          backgroundPosition: 'center'
        }}
      >
        <div className="relative z-10 space-y-4">
          <div className="flex items-center gap-2">
            <Sparkles className="w-6 h-6 animate-float" />
            <span className="text-xl font-bold">Hey It-Girl! ✨</span>
          </div>
          <h1 className="text-3xl font-bold leading-tight">
            Ready to slay your<br />
            <span className="text-yellow-accent">style goals</span> today?
          </h1>
          <p className="text-white/80 text-sm">
            Your AI bestie is here to help you look amazing & save money 💕
          </p>
        </div>
      </div>

      {/* Quick Stats */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
        <Card className="p-4 shadow-soft text-center">
          <div className="space-y-2">
            <ShoppingBag className="w-6 h-6 text-primary mx-auto" />
            <div className="text-2xl font-bold text-primary">23</div>
            <div className="text-xs text-muted-foreground">Closet Items</div>
          </div>
        </Card>
        
        <Card className="p-4 shadow-soft text-center">
          <div className="space-y-2">
            <Target className="w-6 h-6 text-accent mx-auto" />
            <div className="text-2xl font-bold text-accent">${budgetData.remaining}</div>
            <div className="text-xs text-muted-foreground">Left to Spend</div>
          </div>
        </Card>
        
        <Card className="p-4 shadow-soft text-center">
          <div className="space-y-2">
            <TrendingUp className="w-6 h-6 text-green-500 mx-auto" />
            <div className="text-2xl font-bold text-green-500">85%</div>
            <div className="text-xs text-muted-foreground">Style Match</div>
          </div>
        </Card>
        
        <Card className="p-4 shadow-soft text-center">
          <div className="space-y-2">
            <Award className="w-6 h-6 text-yellow-500 mx-auto" />
            <div className="text-2xl font-bold text-yellow-500">2</div>
            <div className="text-xs text-muted-foreground">Badges Earned</div>
          </div>
        </Card>
      </div>

      {/* Style Progress */}
      <Card className="p-6 shadow-soft">
        <div className="space-y-4">
          <div className="flex items-center justify-between">
            <h3 className="font-semibold text-lg flex items-center gap-2">
              <Heart className="w-5 h-5 text-primary" />
              Your Style Journey
            </h3>
            <Button variant="outline" size="sm" onClick={() => onNavigate('style')}>
              View Details
            </Button>
          </div>
          
          <div className="space-y-3">
            {Object.entries(currentStyle).map(([style, current]) => {
              const goal = goalStyle[style as keyof typeof goalStyle];
              const isOnTrack = current >= goal * 0.8;
              
              return (
                <div key={style} className="space-y-2">
                  <div className="flex justify-between items-center">
                    <span className="capitalize font-medium text-sm">{style}</span>
                    <div className="flex items-center gap-2">
                      <span className="text-xs text-muted-foreground">
                        {current}% / {goal}%
                      </span>
                      {isOnTrack && <Star className="w-3 h-3 text-yellow-500" />}
                    </div>
                  </div>
                  <Progress value={(current / goal) * 100} className="h-2" />
                </div>
              );
            })}
          </div>
        </div>
      </Card>

      {/* Quick Actions */}
      <div className="grid md:grid-cols-2 gap-4">
        <Card className="p-6 shadow-soft">
          <div className="space-y-4">
            <h3 className="font-semibold text-lg">Quick Actions</h3>
            <div className="space-y-2">
              <Button 
                variant="hero" 
                className="w-full justify-start gap-3"
                onClick={() => onNavigate('closet')}
              >
                <ShoppingBag className="w-4 h-4" />
                Add Closet Item
              </Button>
              <Button 
                variant="girly" 
                className="w-full justify-start gap-3"
                onClick={() => onNavigate('buy-skip')}
              >
                <Sparkles className="w-4 h-4" />
                Buy or Skip Decision
              </Button>
              <Button 
                variant="accent" 
                className="w-full justify-start gap-3"
                onClick={() => onNavigate('budget')}
              >
                <Target className="w-4 h-4" />
                Track Purchase
              </Button>
            </div>
          </div>
        </Card>

        <Card className="p-6 shadow-soft">
          <div className="space-y-4">
            <h3 className="font-semibold text-lg flex items-center gap-2">
              <Award className="w-5 h-5 text-yellow-500" />
              Achievements
            </h3>
            <div className="grid grid-cols-2 gap-2">
              {achievements.map((achievement, i) => (
                <div 
                  key={i} 
                  className={`p-3 rounded-lg text-center ${
                    achievement.unlocked 
                      ? 'bg-gradient-secondary border border-primary/20' 
                      : 'bg-muted/50'
                  }`}
                >
                  <div className={`text-lg mb-1 ${achievement.unlocked ? '' : 'grayscale'}`}>
                    {achievement.icon}
                  </div>
                  <div className="text-xs font-medium">
                    {achievement.name}
                  </div>
                  {achievement.unlocked && (
                    <Badge variant="default" className="mt-1 text-xs">
                      Unlocked
                    </Badge>
                  )}
                </div>
              ))}
            </div>
          </div>
        </Card>
      </div>

      {/* Daily Tip */}
      <Card className="p-4 bg-gradient-secondary border-none">
        <div className="text-center space-y-2">
          <div className="text-sm font-medium text-primary">💡 Daily It-Girl Tip</div>
          <p className="text-xs text-muted-foreground">
            "Invest in pieces that make you feel confident - your style should reflect your inner boss babe energy! ✨"
          </p>
        </div>
      </Card>
    </div>
  );
};