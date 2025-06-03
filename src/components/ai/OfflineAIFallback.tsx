
import { FC } from 'react';
import { Bot, Wifi } from 'lucide-react';
import { Card, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';

interface OfflineAIFallbackProps {
  userMessage: string;
  onRetry: () => void;
}

const OfflineAIFallback: FC<OfflineAIFallbackProps> = ({ userMessage, onRetry }) => {
  // Basic offline responses for common queries
  const generateOfflineResponse = (message: string): string => {
    const lowerMessage = message.toLowerCase();
    
    // Business-related queries
    if (lowerMessage.includes('business') || lowerMessage.includes('start')) {
      return `I'd love to help you with business advice! For detailed guidance on starting a business in Zimbabwe, I recommend connecting to the internet so I can provide current regulations, market insights, and specific resources. In the meantime, consider researching your target market and creating a basic business plan.`;
    }
    
    // Platform usage queries
    if (lowerMessage.includes('platform') || lowerMessage.includes('how to use')) {
      return `Great question about using Harare Zone Connect! While offline, you can still browse cached content, view your saved items, and prepare posts. When you're back online, I can provide detailed tutorials and current features. The platform is designed to help you connect with local businesses and opportunities in Harare.`;
    }
    
    // Learning queries
    if (lowerMessage.includes('learn') || lowerMessage.includes('education')) {
      return `I'm here to support your learning journey! While offline, I have limited resources, but I can help with basic concepts. For comprehensive educational content, real-time examples, and interactive learning experiences, please connect to the internet. Education is key to success in Zimbabwe's growing economy.`;
    }
    
    // Location/Zimbabwe specific
    if (lowerMessage.includes('zimbabwe') || lowerMessage.includes('harare')) {
      return `Zimbabwe and Harare offer incredible opportunities! While I can't access current market data offline, I can tell you that Harare is a vibrant business hub with growing tech and service sectors. For current trends, regulations, and specific opportunities, I'll need an internet connection to provide accurate information.`;
    }
    
    // Greeting or general
    if (lowerMessage.includes('hello') || lowerMessage.includes('hi') || lowerMessage.includes('help')) {
      return `Hello! I'm your AI Professor for Harare Zone Connect. I'm currently in offline mode, so my responses are limited. I can still help with basic questions, but for detailed guidance on business, current market information, and interactive learning, please connect to the internet. How can I assist you today?`;
    }
    
    // Default response
    return `Thank you for your question! I'm currently in offline mode, which limits my ability to provide detailed, current information. Your message has been saved and I'll give you a comprehensive answer once you're back online. For immediate help, you can browse cached content or check previously saved conversations.`;
  };

  const response = generateOfflineResponse(userMessage);

  return (
    <Card className="border-orange-200 bg-orange-50">
      <CardContent className="p-4">
        <div className="flex items-start gap-3">
          <div className="flex items-center gap-2 text-orange-600">
            <Bot className="h-5 w-5" />
            <Wifi className="h-4 w-4" strokeWidth={1} opacity={0.5} />
          </div>
          <div className="flex-1">
            <div className="text-sm font-medium text-orange-800 mb-2">
              AI Professor (Offline Mode)
            </div>
            <p className="text-sm text-orange-700 leading-relaxed mb-3">
              {response}
            </p>
            <div className="flex items-center gap-2">
              <Button
                variant="outline"
                size="sm"
                onClick={onRetry}
                className="border-orange-300 text-orange-700 hover:bg-orange-100"
              >
                Try Online Mode
              </Button>
              <span className="text-xs text-orange-600">
                Your message will be sent when you reconnect
              </span>
            </div>
          </div>
        </div>
      </CardContent>
    </Card>
  );
};

export default OfflineAIFallback;
