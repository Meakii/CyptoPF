import { Check, ChevronsUpDown } from "lucide-react";
import { useNavigate, useParams } from "@tanstack/react-router";
import { Button } from "@/components/ui/button";
import {
  Command,
  CommandEmpty,
  CommandGroup,
  CommandInput,
  CommandItem,
} from "@/components/ui/command";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { cn } from "@/lib/utils";
import { useState } from "react";
import { SUPPORTED_CRYPTOCURRENCIES } from "@/lib/constants";

export function CryptoSelector() {
  const [open, setOpen] = useState(false);
  const navigate = useNavigate();
  const { cryptoId } = useParams({ from: "/buy-sell/$cryptoId" });

  const selectedCrypto = SUPPORTED_CRYPTOCURRENCIES.find(
    (crypto) => crypto.id === cryptoId
  );

  const handleSelect = (currentCryptoId: string) => {
    setOpen(false);
    navigate({
      to: "/buy-sell/$cryptoId",
      params: { cryptoId: currentCryptoId },
    });
  };

  return (
    <Popover open={open} onOpenChange={setOpen}>
<PopoverTrigger asChild>
  <Button
    variant="outline"
    role="combobox"
    aria-expanded={open}
    className="w-[280px] justify-between h-10 flex items-center"
  >
    <div className="flex items-center gap-2">
      {selectedCrypto && (
        <div className="shrink-0 w-5 h-5">
          {(() => {
            const Icon = selectedCrypto.icon;
            return <Icon width={20} height={20} />;
          })()}
        </div>
      )}
      {selectedCrypto ? selectedCrypto.name : "Select cryptocurrency..."}
    </div>
    <ChevronsUpDown className="ml-2 h-4 w-4 shrink-0 opacity-50" />
  </Button>
</PopoverTrigger>
      <PopoverContent className="w-[280px] p-0">
        <Command>
          <CommandInput placeholder="Search cryptocurrency..." />
          <CommandEmpty>No cryptocurrency found.</CommandEmpty>
          <CommandGroup>
            {SUPPORTED_CRYPTOCURRENCIES.map((crypto) => (
              <CommandItem
                key={crypto.id}
                value={crypto.id}
                onSelect={handleSelect}
              >
                <Check
                  className={cn(
                    "mr-2 h-4 w-4",
                    cryptoId === crypto.id ? "opacity-100" : "opacity-0"
                  )}
                />
                <div className="flex items-center gap-2">
                  <div className="shrink-0 w-6 h-6">
                    {(() => {
                      const Icon = crypto.icon;
                      return <Icon width={18} height={18} />;
                    })()}
                  </div>
                  {crypto.name}
                </div>
              </CommandItem>
              // <CommandItem
              //   key={crypto.id}
              //   value={crypto.id}
              //   onSelect={handleSelect}
              // >
              //   <Check
              //     className={cn(
              //       "mr-2 h-4 w-4",
              //       cryptoId === crypto.id ? "opacity-100" : "opacity-0"
              //     )}
              //   />
              //   {crypto.name}
              // </CommandItem>
            ))}
          </CommandGroup>
        </Command>
      </PopoverContent>
    </Popover>
  );
}

// import { Check, ChevronsUpDown } from "lucide-react"
// import { useNavigate } from "@tanstack/react-router"
// import { Button } from "@/components/ui/button"
// import {
//   Command,
//   CommandEmpty,
//   CommandGroup,
//   CommandInput,
//   CommandItem,
// } from "@/components/ui/command"
// import {
//   Popover,
//   PopoverContent,
//   PopoverTrigger,
// } from "@/components/ui/popover"
// import { cn } from "@/lib/utils"
// import { useState } from "react"
// import { SUPPORTED_CRYPTOCURRENCIES } from "@/lib/constants"

// export function CryptoSelector() {
//   const [open, setOpen] = useState(false)
//   const navigate = useNavigate()

//   const handleSelect = (cryptoId: string) => {
//     setOpen(false)
//     navigate({ to: '/buy-sell/$cryptoId', params: { cryptoId } })
//   }

//   return (
//     <Popover open={open} onOpenChange={setOpen}>
//       <PopoverTrigger asChild>
//         <Button
//           variant="outline"
//           role="combobox"
//           aria-expanded={open}
//           className="w-[280px] justify-between"
//         >
//           Select cryptocurrency...
//           <ChevronsUpDown className="ml-2 h-4 w-4 shrink-0 opacity-50" />
//         </Button>
//       </PopoverTrigger>
//       <PopoverContent className="w-[280px] p-0">
//         <Command>
//           <CommandInput placeholder="Search cryptocurrency..." />
//           <CommandEmpty>No cryptocurrency found.</CommandEmpty>
//           <CommandGroup>
//             {SUPPORTED_CRYPTOCURRENCIES.map((crypto) => (
//               <CommandItem
//                 key={crypto.id}
//                 value={crypto.id}
//                 onSelect={handleSelect}
//               >
//                 <Check className="mr-2 h-4 w-4 opacity-0" />
//                 {crypto.name}
//               </CommandItem>
//             ))}
//           </CommandGroup>
//         </Command>
//       </PopoverContent>
//     </Popover>
//   )
// }
