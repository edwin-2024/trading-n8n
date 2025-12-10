import { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { apiListExecutions } from '@/lib/http';

export default function WorkflowExecutions() {
    const { workflowId } = useParams();
    const navigate = useNavigate();
    const [executions, setExecutions] = useState<any[]>([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        if (workflowId) {
            apiListExecutions(workflowId)
                .then(data => {
                    setExecutions(data);
                    setLoading(false);
                })
                .catch(err => {
                    console.error("Failed to fetch executions", err);
                    setLoading(false);
                });
        }
    }, [workflowId]);

    return (
        <div className="min-h-screen bg-white dark:bg-gray-900 p-8">
            <div className="max-w-5xl mx-auto">
                <div className="flex justify-between items-start mb-8">
                    <div>
                        <h1 className="text-3xl font-bold text-gray-900 dark:text-white mb-2">
                            Executions
                        </h1>
                        <p className="text-gray-500 dark:text-gray-400">
                            Workflow ID: {workflowId}
                        </p>
                    </div>
                    <div className="flex gap-3">
                        <button
                            onClick={() => navigate(`/workflow/${workflowId}`)}
                            className="px-4 py-2 bg-white border border-gray-300 dark:border-gray-600 rounded-md text-sm font-medium text-gray-700 dark:text-gray-200 hover:bg-gray-50 dark:hover:bg-gray-800 transition-colors"
                        >
                            Open workflow
                        </button>
                        <button
                            onClick={() => navigate('/dashboard')}
                            className="px-4 py-2 bg-white border border-gray-300 dark:border-gray-600 rounded-md text-sm font-medium text-gray-700 dark:text-gray-200 hover:bg-gray-50 dark:hover:bg-gray-800 transition-colors"
                        >
                            Back to dashboard
                        </button>
                    </div>
                </div>

                {loading ? (
                    <div className="text-center py-10">Loading...</div>
                ) : executions.length === 0 ? (
                    <div className="bg-gray-50 dark:bg-gray-800 p-8 rounded-lg text-center text-gray-500 border border-gray-200 dark:border-gray-700">
                        No executions found for this workflow.
                    </div>
                ) : (
                    <div className="space-y-4">
                        {executions.map((exec) => (
                            <div
                                key={exec.id || exec._id}
                                className="bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700 rounded-lg p-6 shadow-sm hover:shadow transition-shadow"
                            >
                                <div className="flex justify-between items-start">
                                    <div className="space-y-1">
                                        <h3 className="font-semibold text-lg text-gray-900 dark:text-white">
                                            Execution {exec.id || exec._id}
                                        </h3>
                                        <div className="text-sm text-gray-500 dark:text-gray-400 space-y-1 mt-2">
                                            <p>Started: {exec.startTime ? new Date(exec.startTime).toLocaleString() : 'N/A'}</p>
                                            <p>Ended: {exec.endTime ? new Date(exec.endTime).toLocaleString() : 'Running...'}</p>
                                        </div>
                                    </div>
                                    <div>
                                        <span className={`inline-flex items-center px-2.5 py-0.5 rounded text-xs font-medium uppercase tracking-wide
                                            ${exec.status === 'SUCCESS' ? 'bg-green-100 text-green-800 dark:bg-green-900/30 dark:text-green-400' :
                                                exec.status === 'PENDING' ? 'bg-yellow-100 text-yellow-800 dark:bg-yellow-900/30 dark:text-yellow-400' :
                                                    'bg-red-100 text-red-800 dark:bg-red-900/30 dark:text-red-400'
                                            }`}>
                                            {exec.status || 'UNKNOWN'}
                                        </span>
                                    </div>
                                </div>
                            </div>
                        ))}
                    </div>
                )}
            </div>
        </div>
    );
}
