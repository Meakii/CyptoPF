import { Button } from "@/components/ui/button";

export const WelcomeBanner = () => {
  return (
    <div className="mx-10 flex items-center justify-between mb-8 py-5 border-b border-1 border-[var(--muted-border)]">
      <div className="space-y-1">
        <h1 className="btcm-heading-xl text-[var(--foreground)]">Welcome back Johnny</h1>
        <p className="btcm-body-md text-[var(--muted-foreground)]">
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