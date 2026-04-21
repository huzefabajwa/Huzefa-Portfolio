const { MongoClient } = require("mongodb");

const uri = "mongodb+srv://huzefa:huzefa123@cluster0.fphbdbc.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0";
const client = new MongoClient(uri);

const seedData = [
  { name: "Salesforce", description: "CRM Cloud", logoUrl: "/salesforce-logo.png", color: "#00A1E0", order: 1, createdAt: new Date(), updatedAt: new Date() },
  { name: "HubSpot", description: "Marketing Hub", logoUrl: "/hubspot-logo.png", color: "#FF7A59", order: 2, createdAt: new Date(), updatedAt: new Date() },
  { name: "Power Apps", description: "Low-Code Platform", logoUrl: "/powerapps-logo.png", color: "#8B5CF6", order: 3, createdAt: new Date(), updatedAt: new Date() }
];

async function run() {
  try {
    await client.connect();
    const database = client.db("test"); // Default DB name usually 'test' for mongoose unless specified
    const platforms = database.collection("platforms");
    
    await platforms.deleteMany({});
    const result = await platforms.insertMany(seedData);
    console.log(`${result.insertedCount} platforms were inserted`);
  } finally {
    await client.close();
  }
}
run().catch(console.dir);
