const express = require('express');
const cors = require('cors');
require('dotenv').config()
const app = express()
const port = process.env.port || 5000;
// Assignment-Ten
// K32Hw29xt9vQiBtP

app.use(cors())
app.use(express.json())








const { MongoClient, ServerApiVersion, ObjectId } = require('mongodb');
const uri = `mongodb+srv://${process.env.DB_USER}:${process.env.DB_PASS}@cluster0.ha1geqx.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0`;

// Create a MongoClient with a MongoClientOptions object to set the Stable API version
const client = new MongoClient(uri, {
  serverApi: {
    version: ServerApiVersion.v1,
    strict: true,
    deprecationErrors: true,
  }
});

async function run() {
  try {
    // Connect the client to the server	(optional starting in v4.7)
    // await client.connect();

  const database = client.db("ArtisticVista")
  const craftCollection = database.collection("craft")
  const artCraftCollection = database.collection("artcraft")



app.post('/crafts', async(req,res)=>{
    const craft = req.body
    const result = await craftCollection.insertOne(craft)
    res.send(result)
})

app.get('/crafts', async(req,res)=>{
    const cursor = craftCollection.find()
    const result = await cursor.toArray()
    res.send(result)
})

app.get('/crafts/:id', async(req,res) => {
    const id = req.params.id
    const query = {_id: new ObjectId(id)}
    const result =  await craftCollection.findOne(query)
    res.send(result)
})

app.get("/myProduct/:email", async (req, res) => {
  const result = await craftCollection.find({ email: req.params.email }).toArray();
  res.send(result)
})
// =================



app.get("/craftss/:item", async (req, res) => {
  const result = await craftCollection.find({ item: req.params.item }).toArray();
  res.send(result)
})









app.put('/crafts/:id', async(req,res)=>{
  const id = req.params.id
  const crafts = req.body
  const filter = {_id: new ObjectId(id)}
  const options = {upsert:true}
  const updateCrafts = {
    $set:{
      item:crafts.item,
      subcategory:crafts.subcategory,
      price:crafts.price,
      rating:crafts.rating,
      photo:crafts.photo,
      customization:crafts.customization,
      processing:crafts.processing,
      stock:crafts.stock,
      description:crafts.description
    }
  }
  const result = await craftCollection.updateOne(filter,updateCrafts,options)
res.send(result)
})


app.delete('/crafts/:id', async(req,res)=>{
  const id = req.params.id
  const query = {_id: new ObjectId(id)}
  const result = await craftCollection.deleteOne(query)
  res.send(result)
})


// --------art craft -------------

app.get('/artcraft', async(req,res)=>{
  const cursor = artCraftCollection.find()
  const result = await cursor.toArray()
  res.send(result)
})

app.get('/artcraft/:id', async(req,res) => {
  const id = req.params.id
  const query = {_id: new ObjectId(id)}
  const result =  await artCraftCollection.findOne(query)
  res.send(result)
})









    // Send a ping to confirm a successful connection
    await client.db("admin").command({ ping: 1 });
    console.log("Pinged your deployment. You successfully connected to MongoDB!");
  } finally {
    // Ensures that the client will close when you finish/error
    // await client.close();
  }
}
run().catch(console.dir);


















app.get('/',(req,res)=>{
    res.send('Assignment Management server is running')
})


app.listen(port,()=>{
    console.log(`Assignment server is running on port: ${port} `)
})