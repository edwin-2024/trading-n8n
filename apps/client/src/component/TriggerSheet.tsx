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
import { SUPPORTED_ASSETS, type PriceTriggerMetadata, type TimerNodeMetadata } from "common/types";

const SUPPORTED_TRIGGERS = [
  {
    id: "timer",
    title: "Timer",
    description: "Run this trigger every X seconds/minutes",
  },
  {
    id: "price-trigger",
    title: "Price Trigger",
    description:
      "Runs whenever the price goes above/below a certain number for an asset",
  },
];

export const TriggerSheet = ({
  onSelect,
}: {
  onSelect: (kind: NodeKind, metadata: NodeMetadata) => void;
}) => {
  const [metadata, setMetadata] = useState<
    PriceTriggerMetadata | TimerNodeMetadata
  >({
    time: 3600,
  });
  const [selectedTrigger, setSelectedTrigger] = useState(
    SUPPORTED_TRIGGERS[0].id
  );
  return (
    <Sheet open={true}>
      <SheetContent>
        <SheetHeader>
          <SheetTitle>Select trigger</SheetTitle>
          <SheetDescription asChild>
            <div className="text-muted-foreground text-sm">
              Select the type of trigger you want to add to your workflow.
              {selectedTrigger}
              <Select
                value={selectedTrigger}
                onValueChange={(value) => setSelectedTrigger(value)}
              >
                <SelectTrigger className="w-full">
                  <SelectValue placeholder="Select a trigger" />
                </SelectTrigger>
                <SelectContent>
                  <SelectGroup>
                    {SUPPORTED_TRIGGERS.map(({ id, title }) => (
                      <SelectItem key={id} value={id}>
                        {title}
                      </SelectItem>
                    ))}
                  </SelectGroup>
                </SelectContent>
              </Select>
              {selectedTrigger === "timer" && <div>
                <div className="pt-4">
                  Number of seconds after which to run the timer
                </div>
                <Input
                  value={(metadata as TimerNodeMetadata).time || ''}
                  onChange={(e) => setMetadata(metadata => ({
                    ...metadata,
                    time: Number(e.target.value)
                  }))}
                />
              </div>}
              {selectedTrigger === "price-trigger" &&
                <div>
                  Price:
                  <Input type="text" onChange={(e) => setMetadata(m => ({
                    ...m,
                    price: Number(e.target.value)
                  }))} />
                  Asset
                  <Select
                    value={(metadata as PriceTriggerMetadata).asset || ''}
                    onValueChange={(value) => setMetadata(metadata => ({
                      ...metadata,
                      asset: value
                    }))}
                  >
                    <SelectTrigger className="w-full">
                      <SelectValue placeholder="Select an asset" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectGroup>
                        {SUPPORTED_ASSETS.map((id) =>
                          <SelectItem key={id} value={id}>
                            {id}
                          </SelectItem>
                        )}
                      </SelectGroup>
                    </SelectContent>
                  </Select>
                </div>}

            </div>
          </SheetDescription>
        </SheetHeader>
        <SheetFooter>
          <Button
            onClick={() => {
              onSelect(selectedTrigger as NodeKind, metadata);
            }}
            type="submit"
          >
            Create Trigger
          </Button>
        </SheetFooter>
      </SheetContent>
    </Sheet>
  );
};
