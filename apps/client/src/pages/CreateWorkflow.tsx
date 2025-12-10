import { useNavigate } from "react-router-dom";
import { WorkflowEditor, type NodeType, type Edge } from "@/components/WorkflowEditor";
import { apiCreateWorkflow } from "@/lib/http";

export default function CreateWorkflow() {
    const navigate = useNavigate();

    const handleSave = async (nodes: NodeType[], edges: Edge[]) => {
        try {
            const res = await apiCreateWorkflow({
                nodes,
                edges,
            });
            navigate(`/workflow/${res.id}`);
        } catch (e) {
            console.error("Failed to create workflow", e);
            alert("Failed to create workflow");
        }
    };

    return (
        <div className="flex flex-col h-screen w-full">
            <div className="flex justify-between items-center bg-background border-b px-6 py-3">
                <h1 className="text-xl font-bold">Create workflow</h1>
                <div className="flex items-center gap-2">
                    <button className="bg-primary hover:bg-primary/90 text-primary-foreground font-medium py-2 px-4 rounded-md text-sm transition-colors" onClick={() => document.getElementById('save-workflow-trigger')?.click()}>
                        Publish
                    </button>
                </div>
            </div>
            <div className="flex-1 w-full h-full">
                <WorkflowEditor onSave={handleSave} />
            </div>
        </div>
    );
}
