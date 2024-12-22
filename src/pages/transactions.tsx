import { PageTransition } from "@/components/layout/page-transition";

export function TransactionsPage() {
  return (
    <PageTransition>
    <div className="container space-y-8 p-8">
      <div className="flex items-center justify-between">
        <h1 className="text-3xl font-bold tracking-tight">Transactions</h1>
      </div>
    </div>
    </PageTransition>
  );
}