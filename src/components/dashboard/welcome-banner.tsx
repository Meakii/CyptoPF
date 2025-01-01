import { Button } from "@/components/ui/button";

export const WelcomeBanner = () => {
  return (
    <div className="w-full flex items-center justify-between mb-8">
      <div className="space-y-1">
        <h1 className="text-3xl font-bold tracking-tight">Welcome back Johnny</h1>
        <p className="text-muted-foreground">
          Here's what's been happening
        </p>
      </div>
      
      <div className="flex items-center gap-4">
        <Button variant="outline">
          Deposit AUD
        </Button>
        <Button>
          Trade
        </Button>
      </div>
    </div>
  );
};

export default WelcomeBanner;