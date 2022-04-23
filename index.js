const express = require("express");
const cors = require("cors");
const ObjectId = require("mongodb").ObjectId;
const { MongoClient, ServerApiVersion } = require("mongodb");
const app = express();
const port = process.env.PORT || 5000;

/* MongoDB Info:
-----------------------------
UserName: mongodb1
Password: 5RcmduHoLtCdV0Yu 
-----------------------------
*/

// Set MiddleWares Here
app.use(cors()); //----- to share data with client side (localhost:3000)
app.use(express.json()); //----- to parse the string data we get from client side

/*  Confiq with MongoDB  */
//--------------------------------------------------------------
const uri =
  "mongodb+srv://mongodb1:5RcmduHoLtCdV0Yu@mycluster.rn7n6.mongodb.net/myFirstDatabase?retryWrites=true&w=majority";

const client = new MongoClient(uri, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
  serverApi: ServerApiVersion.v1,
});
async function run() {
  try {
    await client.connect();

    // *** Write the following code from "connect to my Cluster" doc - in created user[signed in account] *** \\
    const userColletion = client.db("myExpress").collection("user");

    app.get("/user", async (req, res) => {
      const query = {};
      const cursor = userColletion.find(query);
      const users = await cursor.toArray();
      res.send(users);
    });

    app.get("/user/:id", async (req, res) => {
      const id = req.params.id;
      const query = { _id: ObjectId(id) };
      const result = await userColletion.findOne(query);
      res.send(result);
    });

    app.post("/user", async (req, res) => {
      const newUser = req.body;
      const result = await userColletion.insertOne(newUser);
      res.send(result);
    });

    app.put('/user/:id', async (req, res) => {
      const id = req.params.id
      const updatedUser = req.body
      console.log(updatedUser);
      const filter = {_id: ObjectId(id)}
      const options = { upsert: true };
      const updateDoc = {
        $set: {
          name: updatedUser.name
        }
      }
      const result = await userColletion.updateOne(filter, updateDoc, options)
      res.send(result)
    })

    app.delete("/user/:id", async (req, res) => {
      const id = req.params.id;
      const query = { _id: ObjectId(id) };
      const result = await userColletion.deleteOne(query);
      res.send(result);
    });
  } finally {
    // await client.close() --- Do not closed it to let active the server
  }
}
run().catch(console.dir);
//--------------------------------------------------------------

app.get("/", (req, res) => {
  res.send("Your Server is the Rock 🚀");
});

app.listen(port, () => {
  console.log("Node Server Running Successfully :) ");
});
