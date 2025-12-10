import { useState, useCallback, useEffect } from "react";
import { ReactFlow, applyNodeChanges, applyEdgeChanges, addEdge, Background, Controls } from "@xyflow/react";
import { TriggerSheet } from "../component/TriggerSheet";
import { PriceTrigger } from "@/nodes/triggers/PriceTrigger";
import { Timer } from "@/nodes/triggers/Timer";
import { Lighter } from "@/nodes/actions/Lighter";
import { type TradingMetadata, type TimerNodeMetadata, type PriceTriggerMetadata } from "common/types";
import { ActionSheet } from "../component/ActionSheet";
import { Hyperliquid } from "@/nodes/actions/Hyperliquid";
import { Backpack } from "@/nodes/actions/Backpack";

const nodeTypes = {
    "price-trigger": PriceTrigger,
    "timer": Timer,
    "lighter": Lighter,
    "hyperliquid": Hyperliquid,
    "backpack": Backpack,
};

export type NodeKind = "price-trigger" | "timer" | "hyperliquid" | "backpack" | "lighter";

export interface NodeType {
    type: NodeKind,
    data: {
        kind: "action" | "trigger",
        metadata: NodeMetadata,
    },
    id: string,
    position: { x: number; y: number },
}
export type NodeMetadata = TradingMetadata | PriceTriggerMetadata | TimerNodeMetadata;
export interface Edge {
    id: string,
    source: string,
    target: string,
}

interface WorkflowEditorProps {
    initialNodes?: NodeType[];
    initialEdges?: Edge[];
    onSave: (nodes: NodeType[], edges: Edge[]) => void;
}

export function WorkflowEditor({ initialNodes = [], initialEdges = [], onSave }: WorkflowEditorProps) {
    const [nodes, setNodes] = useState<NodeType[]>(initialNodes);
    const [edges, setEdges] = useState<Edge[]>(initialEdges);
    const [selectAction, setSelectAction] = useState<{
        position: {
            x: number,
            y: number,
        },
        startingNodeId: string,
    } | null>(null);

    useEffect(() => {
        if (initialNodes.length > 0) setNodes(initialNodes);
        if (initialEdges.length > 0) setEdges(initialEdges);
    }, [initialNodes, initialEdges]);

    const onNodesChange = useCallback(
        (changes: any) =>
            setNodes((nodesSnapshot) => applyNodeChanges(changes, nodesSnapshot)),
        []
    );
    const onEdgesChange = useCallback(
        (changes: any) =>
            setEdges((edgesSnapshot) => applyEdgeChanges(changes, edgesSnapshot)),
        []
    );
    const onConnect = useCallback(
        (params: any) =>
            setEdges((edgesSnapshot) => addEdge(params, edgesSnapshot)),
        []
    );

    const POSITION_OFFSET = 50;
    const onConnectEnd = useCallback(
        (_: any, connectionInfo: any) => {
            if (!connectionInfo.isValid && connectionInfo.fromNode) {
                setSelectAction({
                    startingNodeId: connectionInfo.fromNode.id,
                    position: {
                        x: connectionInfo.from.x + POSITION_OFFSET,
                        y: connectionInfo.from.y + POSITION_OFFSET,
                    }
                })
            }
        },
        []
    )

    return (
        <div style={{ width: "100%", height: "100%" }} className="relative">
            <button
                id="save-workflow-trigger"
                className="hidden"
                onClick={() => onSave(nodes, edges)}
            >
                Save Workflow
            </button>

            {!nodes.length && <TriggerSheet onSelect={(type, metadata) => {
                // @ts-ignore
                setNodes([...nodes, {
                    id: Math.random().toString(),
                    type,
                    data: {
                        kind: "trigger",
                        metadata,
                    },
                    position: { x: 0, y: 0 },
                }])
            }} />}

            {selectAction && <ActionSheet onSelect={(type, metadata) => {
                const nodeId = Math.random().toString();
                // @ts-ignore
                setNodes([...nodes, {
                    id: nodeId,
                    type,
                    data: {
                        kind: "action",
                        metadata,
                    },
                    position: selectAction.position,
                }]);
                setEdges([...edges, {
                    source: selectAction.startingNodeId,
                    target: nodeId,
                    id: `${selectAction.startingNodeId}-${nodeId}`,
                }])
                setSelectAction(null);
            }} />}
            <ReactFlow
                nodeTypes={nodeTypes}
                nodes={nodes}
                edges={edges}
                onNodesChange={onNodesChange}
                onEdgesChange={onEdgesChange}
                onConnect={onConnect}
                onConnectEnd={onConnectEnd}
                fitView
            >
                <Background />
                <Controls />
            </ReactFlow>
        </div>
    );
}
