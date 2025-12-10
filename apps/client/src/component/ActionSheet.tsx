import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

import type { NodeKind, NodeMetadata } from "@/components/WorkflowEditor";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import {
  Sheet,
  SheetContent,
  SheetDescription,
  SheetFooter,
  SheetHeader,
  SheetTitle,
} from "@/components/ui/sheet";
import { useState } from "react";
import type { TradingMetadata } from "common/types";
import { SUPPORTED_ASSETS } from "common/types";

const SUPPORTED_ACTIONS = [
  {
    id: "hyperliquid",
    title: "HyperLiquid",
    description: "Place trade on HyperLiquid",
  },
  {
    id: "lighter",
    title: "Lighter",
    description:
      "Place a tarde on Lighter",
  },
  {
    id: "backpack",
    title: "Backpack",
    description:
      "Place a tarde on Backpack",
  },
];


export const ActionSheet = ({
  onSelect
}: {
  onSelect: (kind: NodeKind, metadata: NodeMetadata) => void;
}) => {
  const [metadata, setMetadata] = useState<TradingMetadata | {}>({});
  const [selectedAction, setSelectedAction] = useState(SUPPORTED_ACTIONS[0].id);

  return (
    <Sheet open={true}>
      <SheetContent>
        <SheetHeader>
          <SheetTitle>Select action</SheetTitle>
          <SheetDescription asChild>
            <div className="text-muted-foreground text-sm">
              Select the type of action you want to add to your workflow.
              {selectedAction}
              <Select
                value={selectedAction}
                onValueChange={(value) => setSelectedAction(value)}
              >
                <SelectTrigger className="w-full">
                  <SelectValue placeholder="Select a trigger" />
                </SelectTrigger>
                <SelectContent>
                  <SelectGroup>
                    {SUPPORTED_ACTIONS.map(({ id, title }) => (
                      <SelectItem key={id} value={id}>
                        {title}
                      </SelectItem>
                    ))}
                  </SelectGroup>
                </SelectContent>
              </Select>
              {(selectedAction === "hyperliquid" || selectedAction === "lighter" || selectedAction === "backpack") && <div>
                <div className="pt-4">
                  Type
                </div>
                <Select value={(metadata as TradingMetadata).type || ''} onValueChange={(value) => setMetadata(metadata => ({
                  ...metadata,
                  type: value
                }))}>
                  <SelectTrigger className="w-full">
                    <SelectValue placeholder="Weather it is a long or a short" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectGroup>
                      <SelectItem value={"long"}>LONG</SelectItem>
                      <SelectItem value={"short"}>SHORT</SelectItem>
                    </SelectGroup>
                  </SelectContent>
                </Select>
                <div className="pt-4">
                  Asset
                </div>
                <Select value={(metadata as TradingMetadata).symbol || ''} onValueChange={(value) => setMetadata(metadata => ({
                  ...metadata,
                  symbol: value
                }))}>
                  <SelectTrigger className="w-full">
                    <SelectValue placeholder="Which asset to long or short" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectGroup>
                      {SUPPORTED_ASSETS.map(asset => <SelectItem key={asset} value={asset}>
                        {asset}
                      </SelectItem>
                      )}
                    </SelectGroup>
                  </SelectContent>
                </Select>

                <div className="pt-4">
                  Qty
                </div>
                <Input
                  value={(metadata as TradingMetadata).qty || ''}
                  onChange={(e) => setMetadata(metadata => ({
                    ...metadata,
                    qty: Number(e.target.value)
                  }))}
                  placeholder="How much to long or short"
                ></Input>
                <div className="pt-4">
                  API_KEY *
                </div>
                <Input
                  value={(metadata as any).apiKey || ''}
                  onChange={(e) => setMetadata(metadata => ({
                    ...metadata,
                    apiKey: e.target.value
                  }))}
                  placeholder="Enter API_KEY"
                ></Input>
              </div>}
            </div>
          </SheetDescription>
        </SheetHeader>
        <SheetFooter>
          <Button
            onClick={() => {
              onSelect(selectedAction as NodeKind, metadata as unknown as NodeMetadata);
            }}
            type="submit"
          >
            Create Action
          </Button>
        </SheetFooter>
      </SheetContent>
    </Sheet>
  );
};
