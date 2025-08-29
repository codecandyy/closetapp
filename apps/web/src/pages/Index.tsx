import { useState } from "react";
import { AppLayout } from "@/components/AppLayout";
import { Dashboard } from "@/components/Dashboard";
import { StyleAssessment } from "@/components/StyleAssessment";
import { ClosetManager } from "@/components/ClosetManager";
import { BudgetTracker } from "@/components/BudgetTracker";
import { BuyOrSkip } from "@/components/BuyOrSkip";
import { Rewards } from "@/screens/Rewards";
import { Settings } from "@/screens/Settings";

const Index = () => {
  const [currentSection, setCurrentSection] = useState('dashboard');

  const renderCurrentSection = () => {
    switch (currentSection) {
      case 'dashboard':
        return <Dashboard onNavigate={setCurrentSection} />;
      case 'style':
        return <StyleAssessment />;
      case 'closet':
        return <ClosetManager />;
      case 'budget':
        return <BudgetTracker />;
      case 'buy-skip':
        return <BuyOrSkip />;
      case 'rewards':
        return <Rewards />;
      case 'settings':
        return <Settings />;
      default:
        return <Dashboard onNavigate={setCurrentSection} />;
    }
  };

  return (
    <AppLayout currentSection={currentSection} onNavigate={setCurrentSection}>
      {renderCurrentSection()}
    </AppLayout>
  );
};

export default Index;
