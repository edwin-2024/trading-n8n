import { useNavigate } from "react-router-dom"
import { Button } from "@/components/ui/button"

export default function Landing() {
    const navigate = useNavigate()

    return (
        <div className="flex flex-col items-center justify-center min-h-screen bg-white">
            <div className="text-center space-y-4">
                <h1 className="text-4xl font-bold tracking-tight">Welcome to Trading N8N</h1>
                <p className="text-muted-foreground text-lg">
                    Automate your trading workflows with triggers and actions.
                </p>
                <div className="flex items-center justify-center gap-4 pt-4">
                    <Button variant="link" className="underline" onClick={() => navigate('/auth')}>
                        Get started
                    </Button>
                    <Button variant="link" className="underline" onClick={() => navigate('/dashboard')}>
                        Go to dashboard
                    </Button>
                    <Button variant="link" className="underline" onClick={() => navigate('/create-workflow')}>
                        Create workflow
                    </Button>
                </div>
            </div>
        </div>
    )
}
