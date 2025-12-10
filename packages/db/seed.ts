import mongoose from "mongoose";
import { NodesModel } from "./index";

const MONGO_URL = process.env.MONGO_URL || "mongodb://localhost:27017/automation_app";

const seed = async () => {
    await mongoose.connect(MONGO_URL);
    console.log("Connected to MongoDB at", MONGO_URL);

    await NodesModel.deleteMany({});
    console.log("Cleared Nodes collection");

    const nodes = [
        {
            title: "Timer",
            description: "Run a workflow every x seconds",
            kind: "TRIGGER",
            type: "timer",
            metadataSchema: []
        },
        {
            title: "Lighter Exchange",
            description: "Place a trade on lighter",
            kind: "ACTION",
            type: "lighter",
            credentialsType: [
                {
                    title: "API_KEY",
                    required: true
                }
            ],
            metadataSchema: [
                {
                    kind: "select",
                    title: "type",
                    description: "Weather it is a long or a short",
                    values: ["LONG", "SHORT"]
                },
                {
                    kind: "select",
                    title: "Asset",
                    description: "Which asset to long or short",
                    values: ["SOL", "BTC", "ETH"]
                },
                {
                    kind: "number",
                    title: "Quantity",
                    description: "How much to long or short"
                }
            ]
        },
        {
            title: "Hyperliquid",
            description: "Trade on Hyperliquid",
            kind: "ACTION",
            type: "hyperliquid",
            credentialsType: [],
            metadataSchema: []
        },
        {
            title: "Backpack",
            description: "Trade on Backpack",
            kind: "ACTION",
            type: "backpack",
            credentialsType: [],
            metadataSchema: []
        }
    ];

    await NodesModel.insertMany(nodes);
    console.log("Seeded nodes:", nodes.length);

    await mongoose.disconnect();
    console.log("Disconnected");
};

seed().catch(console.error);
