import { Handle, Position } from "@xyflow/react";
import { type TimerNodeMetadata } from "common/types"

export function Timer({ data }: {
  data: {
    metadata: TimerNodeMetadata;
  },
  isConnectable: boolean
}) {
  return <div className="bg-white rounded-xl border-2 border-stone-400 shadow-sm p-4 min-w-[200px]">
    <div className="font-bold mb-2 text-lg">Timer</div>
    <div className="text-gray-500">Every <span className="text-black font-bold">{data.metadata?.time}</span> seconds</div>
    <Handle type="source" position={Position.Right} className="!bg-black w-3 h-3" />
  </div>
}