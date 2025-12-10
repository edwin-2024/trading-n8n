

export async function execute(asset: string, qty: number, type: "LONG" | "SHORT", API_KEY: string) {
    console.log("executing trade on lighter");
    console.log(`${asset}, ${qty}, ${type}, ${API_KEY}`);
}