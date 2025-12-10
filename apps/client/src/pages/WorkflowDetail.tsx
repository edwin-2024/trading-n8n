import { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { WorkflowEditor, type NodeType, type Edge } from "@/components/WorkflowEditor";
import { apiGetWorkflow, apiUpdateWorkflow, type Workflow } from "@/lib/http";

export default function WorkflowDetail() {
    const { workflowId } = useParams();
    const [workflow, setWorkflow] = useState<Workflow | null>(null);
    const [loading, setLoading] = useState(true);
    const navigate = useNavigate();

    useEffect(() => {
        if (workflowId) {
            apiGetWorkflow(workflowId)
                .then((w) => {
                    setWorkflow(w);
                    setLoading(false);
                })
                .catch((e) => {
                    console.error("Failed to fetch workflow", e);
                    setLoading(false);
                });
        }
    }, [workflowId]);

    const handleSave = async (nodes: NodeType[], edges: Edge[]) => {
        if (!workflowId) return;
        try {
            await apiUpdateWorkflow(workflowId, {
                nodes,
                edges,
            });
            alert("Workflow updated!");
        } catch (e) {
            console.error("Failed to update workflow", e);
            alert("Failed to update workflow");
        }
    };

    if (loading) {
        return <div className="flex justify-center items-center h-screen">Loading...</div>;
    }

    if (!workflow) {
        return <div className="flex justify-center items-center h-screen">Workflow not found</div>;
    }

    return (
        <div className="flex flex-col h-screen w-full">
            <div className="flex justify-between items-center bg-background border-b px-6 py-3">
                <div className="flex flex-col">
                    <h1 className="text-lg font-bold">Workflow</h1>
                    <span className="text-xs text-muted-foreground">ID: {workflowId}</span>
                </div>

                <div className="flex items-center gap-2">
                    <button className="bg-white hover:bg-gray-100 border text-black font-medium py-2 px-4 rounded-md text-sm transition-colors" onClick={() => navigate(`/workflow/${workflowId}/executions`)}>
                        View executions
                    </button>
                    <button className="bg-white hover:bg-gray-100 border text-black font-medium py-2 px-4 rounded-md text-sm transition-colors" onClick={() => navigate('/dashboard')}>
                        Back to dashboard
                    </button>
                </div>
            </div>
            <div className="flex-1 w-full h-full">
                <WorkflowEditor
                    // @ts-ignore
                    initialNodes={workflow.nodes}
                    initialEdges={workflow.edges}
                    onSave={handleSave}
                />
            </div>
        </div>
    );
}
