const mongo = require("mongodb");
const d3 = require("d3");

// Connection URI
const uri =
  "mongodb://book_group:JcWE8yGPLVEiCOb30Ys3O1j0byuckaEQ@macragge.reika.io:47017/?authSource=books";

// Create a new MongoClient
const client = new MongoClient(uri, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
});

async function run() {
  try {
    // Connect the client to the server
    await client.connect();
    console.log("Connected successfully to MongoDB server");

    // Access the database and collection
    const database = client.db("books");
    const collection = database.collection("titles");

    // Fetch data from MongoDB
    const data = await collection.find().toArray();

    // Populate the dropdown menu with titles
    var dropdownMenu = d3.select("#selDataset");

    data.forEach((doc) => {
      dropdownMenu.append("option").text(doc.title).property("value", doc.title);
    });

    dropdownMenu.on("change", function() {
      var selectedSample = dropdownMenu.property("value");
      optionChanged(selectedSample);
    });
  } finally {
    // Close the connection when finished
    await client.close();
    console.log("Connection to MongoDB closed");
  }
}

// Call the run function
run().catch(console.error);