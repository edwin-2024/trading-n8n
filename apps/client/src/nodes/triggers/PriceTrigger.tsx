import { Handle, Position } from "@xyflow/react";
import { type PriceTriggerMetadata } from "common/types";

export function PriceTrigger({ data, isConnectable }: {
  data: {
    metadata: PriceTriggerMetadata
  },
  isConnectable: boolean
}) {
  return <div className="bg-white rounded-xl border-stone-400 border-2 shadow-sm p-4 min-w-[200px]">
    <div className="font-bold mb-2 text-lg">Price Trigger</div>
    <div className="text-gray-500 space-y-1">
      <div>Asset: <span className="text-black font-bold">{data.metadata.asset}</span></div>
      <div>Price: <span className="text-black font-bold">{data.metadata.price}</span></div>
    </div>
    <Handle type="source" position={Position.Right} className="!bg-black w-3 h-3" />
  </div>
}