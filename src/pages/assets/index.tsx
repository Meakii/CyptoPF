import { useState } from "react";
import { PageTransition } from "@/components/layout/page-transition";
import { CryptoTable } from "@/components/crypto/crypto-table";
import { Input } from "@/components/ui/input";
import { Search } from "lucide-react";

export function AssetsPage() {
  const [searchQuery, setSearchQuery] = useState("");

  return (
    <PageTransition>
      <div className="container mx-auto p-8">
        <div className="flex flex-col lg:flex-row justify-between mb-8">
          <h1 className="text-3xl font-bold tracking-tight ">Assets</h1>

          <div className="relative">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-muted-foreground" />
            <Input
              placeholder="Search assets..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="pl-9 max-w-sm min-w-[220px]"
            />
          </div>
        </div>
        <CryptoTable searchQuery={searchQuery} />
      </div>
    </PageTransition>
  );
}
