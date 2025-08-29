import { useState } from "react";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Progress } from "@/components/ui/progress";
import { Sparkles, Heart, Star } from "lucide-react";

interface StyleMix {
  y2k: number;
  chic: number;
  girly: number;
  classy: number;
}

const styleKeywords = [
  { name: "Y2K", emoji: "✨", color: "pink-glow" },
  { name: "Chic", emoji: "🖤", color: "foreground" },
  { name: "Girly", emoji: "🎀", color: "pink-medium" },
  { name: "Classy", emoji: "💎", color: "accent" },
  { name: "Edgy", emoji: "⚡", color: "destructive" },
  { name: "Minimalist", emoji: "🤍", color: "muted-foreground" },
];

export const StyleAssessment = () => {
  const [selectedStyles, setSelectedStyles] = useState<string[]>([]);
  const [styleMix, setStyleMix] = useState<StyleMix>({
    y2k: 40,
    chic: 30,
    girly: 20,
    classy: 10,
  });

  const toggleStyle = (style: string) => {
    setSelectedStyles(prev =>
      prev.includes(style)
        ? prev.filter(s => s !== style)
        : [...prev, style]
    );
  };

  return (
    <div className="max-w-2xl mx-auto space-y-6">
      <div className="text-center space-y-2">
        <h2 className="text-2xl font-bold bg-gradient-primary bg-clip-text text-transparent">
          Define Your Style Identity ✨
        </h2>
        <p className="text-muted-foreground">
          Pick your vibe keywords to create your "추구미" (style goal)
        </p>
      </div>

      <Card className="p-6 shadow-soft">
        <div className="space-y-4">
          <h3 className="font-semibold text-lg flex items-center gap-2">
            <Sparkles className="w-5 h-5 text-primary" />
            Pick Your Style Keywords
          </h3>
          
          <div className="grid grid-cols-2 md:grid-cols-3 gap-3">
            {styleKeywords.map((style) => (
              <Button
                key={style.name}
                variant={selectedStyles.includes(style.name) ? "default" : "girly"}
                className="h-auto py-3 px-4 flex flex-col items-center gap-1"
                onClick={() => toggleStyle(style.name)}
              >
                <span className="text-lg">{style.emoji}</span>
                <span className="text-sm">{style.name}</span>
              </Button>
            ))}
          </div>
        </div>
      </Card>

      <Card className="p-6 shadow-soft">
        <div className="space-y-4">
          <h3 className="font-semibold text-lg flex items-center gap-2">
            <Heart className="w-5 h-5 text-primary" />
            Your Style Mix Analysis
          </h3>
          
          <div className="space-y-3">
            {Object.entries(styleMix).map(([style, percentage]) => (
              <div key={style} className="space-y-2">
                <div className="flex justify-between text-sm">
                  <span className="capitalize font-medium">{style}</span>
                  <span className="text-primary font-semibold">{percentage}%</span>
                </div>
                <Progress value={percentage} className="h-2" />
              </div>
            ))}
          </div>
        </div>
      </Card>

      <div className="flex justify-center">
        <Button variant="hero" size="lg" className="px-8">
          <Star className="w-4 h-4" />
          Complete Style Setup
        </Button>
      </div>
    </div>
  );
};