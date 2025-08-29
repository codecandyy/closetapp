import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Switch } from "@/components/ui/switch";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Settings as SettingsIcon, Bell, DollarSign, Heart, Save } from "lucide-react";

export const Settings = () => {
  const [monthlyBudget, setMonthlyBudget] = useState("300");
  const [primaryStyle, setPrimaryStyle] = useState("girly");
  const [secondaryStyle, setSecondaryStyle] = useState("chic");
  const [notifications, setNotifications] = useState({
    budgetAlerts: true,
    styleTips: true,
    newFeatures: false,
    weeklyReport: true
  });

  const styleOptions = [
    { value: "y2k", label: "Y2K" },
    { value: "chic", label: "Chic" },
    { value: "girly", label: "Girly" },
    { value: "classy", label: "Classy" },
    { value: "edgy", label: "Edgy" },
    { value: "minimalist", label: "Minimalist" },
    { value: "vintage", label: "Vintage" },
    { value: "streetwear", label: "Streetwear" }
  ];

  const handleSave = () => {
    // TODO: Implement save functionality
    console.log("Settings saved", { monthlyBudget, primaryStyle, secondaryStyle, notifications });
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="text-center space-y-2">
        <h2 className="text-2xl font-bold bg-gradient-primary bg-clip-text text-transparent">
          Settings ⚙️
        </h2>
        <p className="text-muted-foreground">
          Customize your AI style assistant
        </p>
      </div>

      {/* Style Goals */}
      <Card className="p-6 shadow-soft">
        <div className="space-y-4">
          <h3 className="font-semibold text-lg flex items-center gap-2">
            <Heart className="w-5 h-5 text-primary" />
            Style Goals
          </h3>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="space-y-2">
              <Label htmlFor="primary-style">Primary Style</Label>
              <Select value={primaryStyle} onValueChange={setPrimaryStyle}>
                <SelectTrigger>
                  <SelectValue placeholder="Select primary style" />
                </SelectTrigger>
                <SelectContent>
                  {styleOptions.map((style) => (
                    <SelectItem key={style.value} value={style.value}>
                      {style.label}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>
            
            <div className="space-y-2">
              <Label htmlFor="secondary-style">Secondary Style</Label>
              <Select value={secondaryStyle} onValueChange={setSecondaryStyle}>
                <SelectTrigger>
                  <SelectValue placeholder="Select secondary style" />
                </SelectTrigger>
                <SelectContent>
                  {styleOptions
                    .filter(style => style.value !== primaryStyle)
                    .map((style) => (
                      <SelectItem key={style.value} value={style.value}>
                        {style.label}
                      </SelectItem>
                    ))}
                </SelectContent>
              </Select>
            </div>
          </div>
        </div>
      </Card>

      {/* Budget Settings */}
      <Card className="p-6 shadow-soft">
        <div className="space-y-4">
          <h3 className="font-semibold text-lg flex items-center gap-2">
            <DollarSign className="w-5 h-5 text-primary" />
            Budget Settings
          </h3>
          
          <div className="space-y-2">
            <Label htmlFor="monthly-budget">Monthly Clothing Budget</Label>
            <Input
              id="monthly-budget"
              type="number"
              min="0"
              step="0.01"
              value={monthlyBudget}
              onChange={(e) => setMonthlyBudget(e.target.value)}
              placeholder="300"
            />
            <p className="text-xs text-muted-foreground">
              Set your monthly budget for clothing and accessories
            </p>
          </div>
        </div>
      </Card>

      {/* Notifications */}
      <Card className="p-6 shadow-soft">
        <div className="space-y-4">
          <h3 className="font-semibold text-lg flex items-center gap-2">
            <Bell className="w-5 h-5 text-primary" />
            Notifications
          </h3>
          
          <div className="space-y-4">
            <div className="flex items-center justify-between">
              <div className="space-y-1">
                <Label className="text-sm font-medium">Budget Alerts</Label>
                <p className="text-xs text-muted-foreground">
                  Get notified when you're close to your budget limit
                </p>
              </div>
              <Switch
                checked={notifications.budgetAlerts}
                onCheckedChange={(checked) => 
                  setNotifications(prev => ({ ...prev, budgetAlerts: checked }))
                }
              />
            </div>
            
            <div className="flex items-center justify-between">
              <div className="space-y-1">
                <Label className="text-sm font-medium">Style Tips</Label>
                <p className="text-xs text-muted-foreground">
                  Receive daily style advice and outfit suggestions
                </p>
              </div>
              <Switch
                checked={notifications.styleTips}
                onCheckedChange={(checked) => 
                  setNotifications(prev => ({ ...prev, styleTips: checked }))
                }
              />
            </div>
            
            <div className="flex items-center justify-between">
              <div className="space-y-1">
                <Label className="text-sm font-medium">New Features</Label>
                <p className="text-xs text-muted-foreground">
                  Learn about new app features and updates
                </p>
              </div>
              <Switch
                checked={notifications.newFeatures}
                onCheckedChange={(checked) => 
                  setNotifications(prev => ({ ...prev, newFeatures: checked }))
                }
              />
            </div>
            
            <div className="flex items-center justify-between">
              <div className="space-y-1">
                <Label className="text-sm font-medium">Weekly Report</Label>
                <p className="text-xs text-muted-foreground">
                  Get a summary of your style journey progress
                </p>
              </div>
              <Switch
                checked={notifications.weeklyReport}
                onCheckedChange={(checked) => 
                  setNotifications(prev => ({ ...prev, weeklyReport: checked }))
                }
              />
            </div>
          </div>
        </div>
      </Card>

      {/* Save Button */}
      <div className="flex justify-center">
        <Button 
          variant="hero" 
          onClick={handleSave}
          className="gap-2"
        >
          <Save className="w-4 h-4" />
          Save Settings
        </Button>
      </div>

      {/* App Info */}
      <Card className="p-4 bg-gradient-secondary border-none">
        <div className="text-center space-y-2">
          <div className="text-sm font-medium text-primary">AI Girly Assistant</div>
          <p className="text-xs text-muted-foreground">
            Version 1.0.0 • Your AI bestie for style & budget management
          </p>
        </div>
      </Card>
    </div>
  );
};
