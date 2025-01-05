import { Button } from "@/components/ui/button";

export const WelcomeBanner = () => {
  return (
    <div className="w-full flex items-center justify-between mb-8 px-10 py-5 border-b border-1 border-(--muted-border)">
      <div className="space-y-1 ">
        <h1 className="btcm-heading-xl text-(--foreground)">Welcome back Johnny</h1>
        <p className="btcm-body-md text-(--muted-foreground)">
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