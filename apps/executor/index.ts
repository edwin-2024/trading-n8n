import { ExecutionModel, WorkflowModel } from "db/client";
import { execute } from "./execute";
import mongoose from "mongoose";


async function main() {
    await mongoose.connect(process.env.MONGO_URL!);

    while (1) {
        try {
            const workflows = await WorkflowModel.find({});


            await Promise.all(workflows.map(async workflow => {
                const trigger = workflow.nodes.find(x => x.data?.kind?.toUpperCase() === 'TRIGGER');

                if (!trigger) {
                    return;
                }

                switch (trigger?.type) {
                    case "timer":
                        const timerInS = trigger.data?.metadata.time;
                        const execution = await ExecutionModel.findOne({
                            workflowId: workflow.id,
                        }).sort({
                            startTime: "desc"
                        });

                        if (!execution || new Date(execution.startTime).getTime() < Date.now() - (timerInS * 1000)) {
                            const execution = await ExecutionModel.create({
                                workflowId: workflow.id,
                                status: "PENDING",
                                startTime: new Date(),
                            })
                            try {
                                await execute(workflow.nodes, workflow.edges);
                                execution.status = "SUCCESS";
                            } catch (e) {
                                console.error(e);
                                execution.status = "FAILURE";
                            }

                            execution.endTime = new Date();
                            await execution.save();
                        }

                }
            }));
        } catch (e) {
            console.error(e);
        }
        await new Promise(r => setTimeout(r, 2000));
    }
}

main().catch(err => {
    console.error("CRITICAL ERROR IN MAIN:");
    console.error(err);
    process.exit(1);
});