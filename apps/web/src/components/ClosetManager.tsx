import { useState } from "react";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Camera, Upload, Plus, Shirt, Heart } from "lucide-react";

interface ClosetItem {
  id: string;
  image: string;
  tags: string[];
  styleMatch: { [key: string]: number };
  category: string;
  color: string;
}

export const ClosetManager = () => {
  const [items, setItems] = useState<ClosetItem[]>([
    {
      id: "1",
      image: "/placeholder.svg",
      tags: ["black", "dress", "sleeveless", "mini"],
      styleMatch: { chic: 60, y2k: 40 },
      category: "dress",
      color: "black"
    },
    {
      id: "2", 
      image: "/placeholder.svg",
      tags: ["pink", "top", "crop", "girly"],
      styleMatch: { girly: 70, y2k: 30 },
      category: "top",
      color: "pink"
    }
  ]);

  const [showUpload, setShowUpload] = useState(false);

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-2xl font-bold bg-gradient-primary bg-clip-text text-transparent">
            My Closet 👗
          </h2>
          <p className="text-muted-foreground">
            {items.length} items • AI-tagged & organized
          </p>
        </div>
        
        <Button 
          variant="hero" 
          onClick={() => setShowUpload(true)}
          className="gap-2"
        >
          <Plus className="w-4 h-4" />
          Add Item
        </Button>
      </div>

      {showUpload && (
        <Card className="p-6 shadow-soft border-dashed border-2 border-primary/30">
          <div className="text-center space-y-4">
            <div className="w-16 h-16 mx-auto bg-gradient-secondary rounded-full flex items-center justify-center">
              <Upload className="w-8 h-8 text-primary" />
            </div>
            <div>
              <h3 className="font-semibold text-lg">Add New Item</h3>
              <p className="text-muted-foreground text-sm">
                Upload from camera or gallery
              </p>
            </div>
            <div className="flex gap-3 justify-center">
              <Button variant="outline" className="gap-2">
                <Camera className="w-4 h-4" />
                Camera
              </Button>
              <Button variant="girly" className="gap-2">
                <Upload className="w-4 h-4" />
                Gallery
              </Button>
            </div>
          </div>
        </Card>
      )}

      <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
        {items.map((item) => (
          <Card key={item.id} className="p-3 shadow-soft hover:shadow-pink transition-all">
            <div className="space-y-3">
              <div className="aspect-square bg-gradient-secondary rounded-lg flex items-center justify-center">
                <Shirt className="w-8 h-8 text-primary/60" />
              </div>
              
              <div className="space-y-2">
                <div className="flex flex-wrap gap-1">
                  {item.tags.slice(0, 3).map((tag) => (
                    <Badge key={tag} variant="secondary" className="text-xs">
                      {tag}
                    </Badge>
                  ))}
                </div>
                
                <div className="space-y-1">
                  {Object.entries(item.styleMatch).map(([style, match]) => (
                    <div key={style} className="flex justify-between text-xs">
                      <span className="capitalize text-muted-foreground">{style}</span>
                      <span className="text-primary font-medium">{match}%</span>
                    </div>
                  ))}
                </div>
              </div>

              <Button variant="ghost" size="sm" className="w-full text-xs">
                <Heart className="w-3 h-3 mr-1" />
                Edit Tags
              </Button>
            </div>
          </Card>
        ))}
      </div>

      <div className="text-center py-8">
        <div className="w-12 h-12 mx-auto bg-gradient-secondary rounded-full flex items-center justify-center mb-3">
          <Plus className="w-6 h-6 text-primary" />
        </div>
        <p className="text-muted-foreground text-sm">
          Add more items to build your perfect closet
        </p>
      </div>
    </div>
  );
};