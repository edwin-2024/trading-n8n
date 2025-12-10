import { type TradingMetadata } from "common/types";
import { Handle, Position } from "@xyflow/react"

export function Lighter({ data }: {
  data: {
    metadata: TradingMetadata,
  }
}) {
  return <div className="bg-white rounded-xl border-stone-400 border-2 shadow-sm p-4 min-w-[200px]">
    <div className="font-bold mb-2 text-lg">Lighter Trade</div>
    <div className="text-gray-500 space-y-1">
      <div>Type: <span className="text-black font-bold">{data.metadata.type}</span></div>
      <div>Qty: <span className="text-black font-bold">{data.metadata.qty}</span></div>
      <div>Symbol: <span className="text-black font-bold">{data.metadata.symbol}</span></div>
    </div>
    <Handle type="source" position={Position.Right} className="!bg-black w-3 h-3" />
    <Handle type="target" position={Position.Left} className="!bg-black w-3 h-3" />
  </div>
}