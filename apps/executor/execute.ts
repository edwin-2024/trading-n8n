import { NodesModel } from "db/client";
import { execute as executeLighter } from "./executors/lighter";

export type NodeDocument = {
    id: string;
    title: string;
    type: string;
    credentials?: any;
    data: {
        metadata?: any;
        kind?: "ACTION" | "TRIGGER" | null | undefined;
    };
    nodeId: string;
};

type EdgeDocument = {
    source: string;
    target: string;
}

export async function execute(nodes: NodeDocument[], edges: EdgeDocument[]) {
    const trigger = nodes.find(x => x.data?.kind?.toLowerCase() === 'trigger');
    if (!trigger) {
        console.log("EXECUTE: No trigger found in nodes");
        return;
    }
    await executeRecursive(trigger?.id, nodes, edges)
}

export async function executeRecursive(sourceId: string, nodes: NodeDocument[], edges: EdgeDocument[]) {
    const nodesToExecute = edges.filter(({ source, target }) => source === sourceId).map(({ target }) => target);

    await Promise.all(nodesToExecute.map(async (nodeClientId) => {
        const node = nodes.find(({ id }) => id === nodeClientId);
        if (!node) {
            return;
        }

        switch (node.type) {
            case "lighter":
                await executeLighter(
                    node.data.metadata.symbol,
                    node.data.metadata.qty,
                    node.data.metadata.type?.toUpperCase(),
                    node.data.metadata.apiKey
                );
        }
    }))

    await Promise.all(nodesToExecute.map(id => executeRecursive(id, nodes, edges)));

}