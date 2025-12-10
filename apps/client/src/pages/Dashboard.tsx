import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { apiListWorkflows, type Workflow } from '@/lib/http';
import { Button } from "@/components/ui/button";

export default function Dashboard() {
    const [workflows, setWorkflows] = useState<Workflow[]>([]);
    const [loading, setLoading] = useState(true);
    const navigate = useNavigate();

    useEffect(() => {
        apiListWorkflows()
            .then(data => {
                setWorkflows(data);
                setLoading(false);
            })
            .catch(err => {
                console.error("Failed to fetch workflows", err);
                setLoading(false);
            });
    }, []);

    return (
        <div className="min-h-screen bg-white p-8">
            <div className="max-w-6xl mx-auto">
                <div className="flex justify-between items-center mb-8 border-b pb-4">
                    <h1 className="text-3xl font-bold text-black">Your Workflows</h1>
                    <Button
                        onClick={() => navigate('/create-workflow')}
                        className="underline"
                        variant="link"
                    >
                        Create new
                    </Button>
                </div>

                {loading ? (
                    <div className="text-center text-gray-600">Loading...</div>
                ) : workflows.length === 0 ? (
                    <div className="text-center py-12 bg-gray-50 rounded-lg border border-gray-200">
                        <p className="text-gray-600 mb-4">You haven't created any workflows yet.</p>
                        <Button
                            onClick={() => navigate('/create-workflow')}
                            variant="link"
                        >
                            Get started by creating one!
                        </Button>
                    </div>
                ) : (
                    <div className="space-y-4">
                        {workflows.map((workflow) => (
                            <div
                                key={workflow._id}
                                className="bg-white rounded-lg border border-gray-200 p-4 flex justify-between items-center"
                            >
                                <div>
                                    <h3 className="text-lg font-semibold text-gray-800">
                                        Workflow {workflow._id}
                                    </h3>
                                    <p className="text-sm text-gray-500">
                                        {workflow.nodes.length} nodes • {workflow.edges.length} edges
                                    </p>
                                </div>
                                <div className="flex gap-2">
                                    <Button
                                        variant="outline"
                                        onClick={() => navigate(`/workflow/${workflow._id}`)}
                                    >
                                        Open
                                    </Button>
                                    <Button
                                        variant="secondary"
                                        onClick={() => navigate(`/workflow/${workflow._id}/executions`)}
                                    >
                                        Executions
                                    </Button>
                                </div>
                            </div>
                        ))}
                    </div>
                )}
            </div>
        </div>
    );
}
