import { CryptoSelector } from "@/components/crypto/crypto-selector";
import { PageTransition } from "@/components/layout/page-transition";

export function CryptoPage() {
  return (
    <PageTransition>
      <div className="container space-y-8 p-8">
        <div className="flex items-center justify-between">
          <h1 className="text-3xl font-bold tracking-tight">
            Buy / Sell Crypto
          </h1>
          <CryptoSelector />
        </div>
      </div>
    </PageTransition>
  );
}
