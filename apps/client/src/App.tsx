import { BrowserRouter, Route, Routes } from 'react-router-dom';
import '@xyflow/react/dist/style.css';
import CreateWorkflow from '@/pages/CreateWorkflow';
import Landing from '@/pages/Landing';
import Auth from '@/pages/Auth';
import Dashboard from '@/pages/Dashboard';
import WorkflowDetail from '@/pages/WorkflowDetail';
import WorkflowExecutions from '@/pages/WorkflowExecutions';

export default function App() {

  return <div>
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Landing />} />
        <Route path="/auth" element={<Auth />} />
        <Route path="/dashboard" element={<Dashboard />} />
        <Route path="/workflow/:workflowId" element={<WorkflowDetail />} />
        <Route path="/workflow/:workflowId/executions" element={<WorkflowExecutions />} />
        <Route path="/create-workflow" element={<CreateWorkflow />} />
      </Routes>
    </BrowserRouter>
  </div>
}