import { useState } from "react";
import { Button } from "@/components/ui/button";
import { 
  Home, 
  Sparkles, 
  ShoppingBag, 
  DollarSign, 
  Heart,
  User,
  Menu,
  X,
  Award,
  Settings
} from "lucide-react";
import { cn } from "@/lib/utils";

interface AppLayoutProps {
  children: React.ReactNode;
  currentSection: string;
  onNavigate: (section: string) => void;
}

const navigationItems = [
  { id: 'dashboard', label: 'Dashboard', icon: Home },
  { id: 'style', label: 'Style Setup', icon: Sparkles },
  { id: 'closet', label: 'My Closet', icon: ShoppingBag },
  { id: 'budget', label: 'Budget', icon: DollarSign },
  { id: 'buy-skip', label: 'Buy or Skip', icon: Heart },
  { id: 'rewards', label: 'Rewards', icon: Award },
  { id: 'settings', label: 'Settings', icon: Settings },
];

export const AppLayout = ({ children, currentSection, onNavigate }: AppLayoutProps) => {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  return (
    <div className="min-h-screen bg-background">
      {/* Header */}
      <header className="border-b border-border bg-card shadow-soft">
        <div className="container mx-auto px-4 py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-3">
              <div className="w-8 h-8 bg-gradient-primary rounded-full flex items-center justify-center">
                <Sparkles className="w-5 h-5 text-white" />
              </div>
              <div>
                <h1 className="text-xl font-bold bg-gradient-primary bg-clip-text text-transparent">
                  AI Girly Assistant
                </h1>
                <p className="text-xs text-muted-foreground">Your style BFF ✨</p>
              </div>
            </div>
            
            <div className="flex items-center gap-3">
              <Button variant="ghost" size="sm" className="hidden md:flex gap-2">
                <User className="w-4 h-4" />
                Profile
              </Button>
              
              <Button 
                variant="ghost" 
                size="sm"
                className="md:hidden"
                onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
              >
                {isMobileMenuOpen ? <X className="w-4 h-4" /> : <Menu className="w-4 h-4" />}
              </Button>
            </div>
          </div>
        </div>
      </header>

      <div className="container mx-auto px-4 py-6">
        <div className="flex flex-col md:flex-row gap-6">
          {/* Sidebar */}
          <aside className={cn(
            "w-full md:w-64 space-y-2",
            isMobileMenuOpen ? "block" : "hidden md:block"
          )}>
            <div className="space-y-1">
              {navigationItems.map((item) => {
                const Icon = item.icon;
                const isActive = currentSection === item.id;
                
                return (
                  <Button
                    key={item.id}
                    variant={isActive ? "default" : "ghost"}
                    className={cn(
                      "w-full justify-start gap-3 text-left",
                      isActive && "shadow-pink"
                    )}
                    onClick={() => {
                      onNavigate(item.id);
                      setIsMobileMenuOpen(false);
                    }}
                  >
                    <Icon className="w-4 h-4" />
                    {item.label}
                  </Button>
                );
              })}
            </div>
            
            {/* Points Display */}
            <div className="mt-6 p-4 bg-gradient-secondary rounded-lg border border-primary/20">
              <div className="text-center space-y-2">
                <div className="text-sm font-medium text-primary">Your Points</div>
                <div className="text-2xl font-bold text-primary">247</div>
                <div className="text-xs text-muted-foreground">
                  Keep adding items to earn more! 🎀
                </div>
              </div>
            </div>
          </aside>

          {/* Main Content */}
          <main className="flex-1 min-h-[calc(100vh-200px)]">
            {children}
          </main>
        </div>
      </div>
    </div>
  );
};