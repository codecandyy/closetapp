import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Progress } from "@/components/ui/progress";
import { Award, Share2, Star, Heart, Sparkles, Crown } from "lucide-react";

export const Rewards = () => {
  const badges = [
    { 
      id: 1, 
      name: "Style Explorer", 
      icon: "✨", 
      description: "Added 10+ items to closet",
      unlocked: true,
      progress: 100 
    },
    { 
      id: 2, 
      name: "Budget Queen", 
      icon: "👑", 
      description: "Stayed under budget for 3 months",
      unlocked: true,
      progress: 100 
    },
    { 
      id: 3, 
      name: "Closet Curator", 
      icon: "🎀", 
      description: "Organized 50+ items",
      unlocked: false,
      progress: 65 
    },
    { 
      id: 4, 
      name: "It-Girl Status", 
      icon: "💎", 
      description: "Achieved 90% style match",
      unlocked: false,
      progress: 45 
    },
    { 
      id: 5, 
      name: "Smart Shopper", 
      icon: "🛍️", 
      description: "Made 20 smart buy/skip decisions",
      unlocked: false,
      progress: 30 
    },
    { 
      id: 6, 
      name: "Trend Setter", 
      icon: "⭐", 
      description: "Created 5+ outfit combinations",
      unlocked: false,
      progress: 20 
    }
  ];

  const totalPoints = 1250;
  const nextMilestone = 2000;

  const handleShare = () => {
    // TODO: Implement share functionality
    console.log("Share achievements");
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="text-center space-y-2">
        <h2 className="text-2xl font-bold bg-gradient-primary bg-clip-text text-transparent">
          Your Achievements 🏆
        </h2>
        <p className="text-muted-foreground">
          Track your style journey progress
        </p>
      </div>

      {/* Points Summary */}
      <Card className="p-6 shadow-soft">
        <div className="space-y-4">
          <div className="flex items-center justify-between">
            <h3 className="font-semibold text-lg flex items-center gap-2">
              <Award className="w-5 h-5 text-primary" />
              Style Points
            </h3>
            <Button variant="outline" size="sm" onClick={handleShare}>
              <Share2 className="w-4 h-4 mr-2" />
              Share
            </Button>
          </div>
          
          <div className="text-center space-y-2">
            <div className="text-3xl font-bold text-primary">{totalPoints}</div>
            <div className="text-sm text-muted-foreground">
              Next milestone: {nextMilestone} points
            </div>
            <Progress value={(totalPoints / nextMilestone) * 100} className="h-2" />
          </div>
        </div>
      </Card>

      {/* Badges Grid */}
      <div className="space-y-4">
        <h3 className="font-semibold text-lg flex items-center gap-2">
          <Star className="w-5 h-5 text-primary" />
          Badges Earned
        </h3>
        
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {badges.map((badge) => (
            <Card 
              key={badge.id} 
              className={`p-4 shadow-soft transition-all ${
                badge.unlocked 
                  ? 'border-primary/20 bg-gradient-secondary' 
                  : 'border-border'
              }`}
            >
              <div className="space-y-3">
                <div className="flex items-center gap-3">
                  <div className={`text-2xl ${badge.unlocked ? '' : 'grayscale opacity-50'}`}>
                    {badge.icon}
                  </div>
                  <div className="flex-1">
                    <h4 className="font-medium text-sm">{badge.name}</h4>
                    <p className="text-xs text-muted-foreground">{badge.description}</p>
                  </div>
                  {badge.unlocked && (
                    <Badge variant="default" className="text-xs">
                      Unlocked
                    </Badge>
                  )}
                </div>
                
                {!badge.unlocked && (
                  <div className="space-y-1">
                    <div className="flex justify-between text-xs">
                      <span>Progress</span>
                      <span>{badge.progress}%</span>
                    </div>
                    <Progress value={badge.progress} className="h-1" />
                  </div>
                )}
              </div>
            </Card>
          ))}
        </div>
      </div>

      {/* Stats */}
      <Card className="p-6 shadow-soft">
        <div className="space-y-4">
          <h3 className="font-semibold text-lg flex items-center gap-2">
            <Heart className="w-5 h-5 text-primary" />
            Your Stats
          </h3>
          
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            <div className="text-center">
              <div className="text-2xl font-bold text-primary">23</div>
              <div className="text-xs text-muted-foreground">Closet Items</div>
            </div>
            <div className="text-center">
              <div className="text-2xl font-bold text-accent">85%</div>
              <div className="text-xs text-muted-foreground">Style Match</div>
            </div>
            <div className="text-center">
              <div className="text-2xl font-bold text-green-500">$180</div>
              <div className="text-xs text-muted-foreground">Budget Left</div>
            </div>
            <div className="text-center">
              <div className="text-2xl font-bold text-yellow-500">2</div>
              <div className="text-xs text-muted-foreground">Badges Earned</div>
            </div>
          </div>
        </div>
      </Card>

      {/* Motivation */}
      <Card className="p-4 bg-gradient-secondary border-none">
        <div className="text-center space-y-2">
          <div className="text-sm font-medium text-primary">💫 Keep Going!</div>
          <p className="text-xs text-muted-foreground">
            You're doing amazing! Keep building your perfect closet and making smart style choices.
          </p>
        </div>
      </Card>
    </div>
  );
};
