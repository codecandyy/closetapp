import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Index from "./pages/Index";
import NotFound from "./pages/NotFound";
import { Welcome } from "./screens/Onboarding/Welcome";
import { StylePicker } from "./screens/Onboarding/StylePicker";
import { Budget } from "./screens/Onboarding/Budget";
import { Finish } from "./screens/Onboarding/Finish";
import { Settings } from "./screens/Settings";

// Import new tab screens and navigation
import { FEATURE_GAME_UI_TABS } from "./constants/FeatureFlags";
import TabsNavigator from "./navigation/Tabs";
import DashboardScreen from "./screens/Dashboard/DashboardScreen";
import ClosetGridScreen from "./screens/ClosetGrid/ClosetGridScreen";
import BuySkipScreen from "./screens/BuySkip/BuySkipScreen";
import BudgetScreen from "./screens/Budget/BudgetScreen";
import RewardsScreen from "./screens/Rewards/RewardsScreen";
import { ClosetProvider } from "./context/ClosetContext";

const queryClient = new QueryClient();

const App = () => (
  <QueryClientProvider client={queryClient}>
    <TooltipProvider>
      <Toaster />
      <Sonner />
      <BrowserRouter
        future={{
          v7_startTransition: true,
          v7_relativeSplatPath: true
        }}
      >
        <Routes>
          {/* Original routes */}
          <Route path="/onboarding" element={<Welcome onNext={() => window.location.href = '/onboarding/style'} />} />
          <Route path="/onboarding/style" element={<StylePicker onNext={() => window.location.href = '/onboarding/budget'} onBack={() => window.location.href = '/onboarding'} />} />
          <Route path="/onboarding/budget" element={<Budget onNext={() => window.location.href = '/onboarding/finish'} onBack={() => window.location.href = '/onboarding/style'} />} />
          <Route path="/onboarding/finish" element={<Finish onComplete={() => window.location.href = '/'} />} />
          <Route path="/settings" element={<Settings />} />
          
          {/* Tab navigation routes */}
          {FEATURE_GAME_UI_TABS ? (
            <Route path="/*" element={
              <ClosetProvider>
                <Routes>
                  <Route path="/" element={<DashboardScreen />} />
                  <Route path="/closet" element={<ClosetGridScreen />} />
                  <Route path="/buy-skip" element={<BuySkipScreen />} />
                  <Route path="/budget" element={<BudgetScreen />} />
                  <Route path="/rewards" element={<RewardsScreen />} />
                </Routes>
                <TabsNavigator />
              </ClosetProvider>
            } />
          ) : (
            <Route path="/" element={<Index />} />
          )}
          
          {/* ADD ALL CUSTOM ROUTES ABOVE THE CATCH-ALL "*" ROUTE */}
          <Route ypath="*" element={<NotFound />} />
        </Routes>
      </BrowserRouter>
    </TooltipProvider>
  </QueryClientProvider>
);

export default App;
