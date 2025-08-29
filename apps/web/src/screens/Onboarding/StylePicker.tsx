import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Chip } from "@/components/ui/chip";
import { Sparkles, ArrowRight } from "lucide-react";

interface StylePickerProps {
  onNext: () => void;
  onBack: () => void;
}

const styleOptions = [
  { id: "y2k", name: "Y2K", emoji: "✨", description: "Retro vibes" },
  { id: "chic", name: "Chic", emoji: "🖤", description: "Sophisticated" },
  { id: "girly", name: "Girly", emoji: "🎀", description: "Feminine & cute" },
  { id: "classy", name: "Classy", emoji: "💎", description: "Elegant" },
  { id: "edgy", name: "Edgy", emoji: "⚡", description: "Bold & daring" },
  { id: "minimalist", name: "Minimalist", emoji: "🤍", description: "Clean & simple" },
  { id: "vintage", name: "Vintage", emoji: "📷", description: "Timeless" },
  { id: "streetwear", name: "Streetwear", emoji: "🏃‍♀️", description: "Urban cool" },
];

export const StylePicker = ({ onNext, onBack }: StylePickerProps) => {
  const [primaryStyle, setPrimaryStyle] = useState<string>("");
  const [secondaryStyle, setSecondaryStyle] = useState<string>("");

  const handleStyleSelect = (styleId: string) => {
    if (primaryStyle === styleId) {
      setPrimaryStyle("");
    } else if (secondaryStyle === styleId) {
      setSecondaryStyle("");
    } else if (!primaryStyle) {
      setPrimaryStyle(styleId);
    } else if (!secondaryStyle && styleId !== primaryStyle) {
      setSecondaryStyle(styleId);
    }
  };

  const canProceed = primaryStyle && secondaryStyle;

  return (
    <div className="min-h-screen flex items-center justify-center p-4">
      <div className="max-w-2xl w-full space-y-6">
        {/* Header */}
        <div className="text-center space-y-2">
          <div className="flex items-center justify-center gap-2 mb-4">
            <Sparkles className="w-6 h-6 text-primary" />
            <h1 className="text-2xl font-bold bg-gradient-primary bg-clip-text text-transparent">
              Define Your Style Identity ✨
            </h1>
          </div>
          <p className="text-muted-foreground">
            Pick your vibe keywords to create your "추구미" (style goal)
          </p>
        </div>

        {/* Style Selection */}
        <Card className="p-6 shadow-soft">
          <div className="space-y-6">
            <div className="space-y-4">
              <h3 className="font-semibold text-lg">Primary Style</h3>
              <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
                {styleOptions.map((style) => (
                  <Chip
                    key={style.id}
                    selected={primaryStyle === style.id}
                    onClick={() => handleStyleSelect(style.id)}
                    className="h-auto py-3 px-4 flex flex-col items-center gap-1 cursor-pointer"
                  >
                    <span className="text-lg">{style.emoji}</span>
                    <span className="text-sm font-medium">{style.name}</span>
                    <span className="text-xs text-muted-foreground">{style.description}</span>
                  </Chip>
                ))}
              </div>
            </div>

            {primaryStyle && (
              <div className="space-y-4">
                <h3 className="font-semibold text-lg">Secondary Style</h3>
                <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
                  {styleOptions
                    .filter((style) => style.id !== primaryStyle)
                    .map((style) => (
                      <Chip
                        key={style.id}
                        selected={secondaryStyle === style.id}
                        onClick={() => handleStyleSelect(style.id)}
                        className="h-auto py-3 px-4 flex flex-col items-center gap-1 cursor-pointer"
                      >
                        <span className="text-lg">{style.emoji}</span>
                        <span className="text-sm font-medium">{style.name}</span>
                        <span className="text-xs text-muted-foreground">{style.description}</span>
                      </Chip>
                    ))}
                </div>
              </div>
            )}

            {/* Selection Summary */}
            {(primaryStyle || secondaryStyle) && (
              <Card className="p-4 bg-gradient-secondary border-none">
                <div className="text-center space-y-2">
                  <div className="text-sm font-medium text-primary">Your Style Mix</div>
                  <div className="flex justify-center gap-2">
                    {primaryStyle && (
                      <Chip variant="selected" size="sm">
                        {styleOptions.find(s => s.id === primaryStyle)?.emoji} {styleOptions.find(s => s.id === primaryStyle)?.name}
                      </Chip>
                    )}
                    {secondaryStyle && (
                      <Chip variant="secondary" size="sm">
                        {styleOptions.find(s => s.id === secondaryStyle)?.emoji} {styleOptions.find(s => s.id === secondaryStyle)?.name}
                      </Chip>
                    )}
                  </div>
                </div>
              </Card>
            )}
          </div>
        </Card>

        {/* Navigation */}
        <div className="flex justify-between">
          <Button variant="outline" onClick={onBack}>
            Back
          </Button>
          <Button 
            variant="hero" 
            onClick={onNext}
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
