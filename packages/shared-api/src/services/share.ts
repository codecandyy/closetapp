import { AnalyzeResult } from './analysis';

export interface ShareData {
  decision: 'BUY' | 'SKIP';
  confidence: number;
  reasons: string[];
  price: string;
  imageUrl?: string;
}

export function generateShareText(data: ShareData): string {
  const emoji = data.decision === 'BUY' ? '✅' : '❌';
  const action = data.decision === 'BUY' ? 'buying' : 'skipping';
  
  return `${emoji} AI recommended ${action} this item!\n\nConfidence: ${data.confidence}%\nPrice: ${data.price}\n\nReasons:\n${data.reasons.map(r => `• ${r}`).join('\n')}\n\n#AIStyleAdvisor #FashionAI #SmartShopping`;
}

export async function shareResult(result: AnalyzeResult, priceCents: number): Promise<boolean> {
  try {
    const shareData: ShareData = {
      decision: result.scores.decision,
      confidence: result.scores.total,
      reasons: result.reasons,
      price: `$${(priceCents / 100).toFixed(2)}`,
      imageUrl: result.imageUrl,
    };

    const text = generateShareText(shareData);

    // Web Share API (modern browsers)
    if (typeof navigator !== 'undefined' && navigator.share) {
      await navigator.share({
        title: `AI Fashion Decision: ${shareData.decision}`,
        text,
        url: shareData.imageUrl,
      });
      return true;
    }

    // Fallback: Copy to clipboard
    if (typeof navigator !== 'undefined' && navigator.clipboard) {
      await navigator.clipboard.writeText(text);
      return true;
    }

    // React Native / Expo fallback (mobile only)
    try {
      // Check if we're in a React Native environment
      if (typeof navigator === 'undefined') {
        // We're likely in React Native
        const Share = require('react-native').Share;
        await Share.share({
          message: text,
          title: `AI Fashion Decision: ${shareData.decision}`,
        });
        return true;
      }
    } catch {
      // Continue to fallback
    }

    // Ultimate fallback: return text for manual sharing
    console.log('Share text:', text);
    return false;
  } catch (error) {
    console.warn('Share failed:', error);
    return false;
  }
}