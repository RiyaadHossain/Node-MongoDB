const express = require("express");
const cors = require("cors");
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
        await client.connect()

        // *** Write the following code from "connect to my Cluster" doc - in created user[signed in account] *** \\
        const userColletion = client.db('myExpress').collection('user')

        // Create a data
        const user = {name: 'Riyad Hossain', email: 'riyad@gmail.com'}

        // Insert in MongoDB
        const result = await userColletion.insertOne(user)

        console.log(`A user was inserted with the _id: ${result.insertedId}`);
    }
    finally {
        // await client.close() --- closed it to let active the server
    }
}
run().catch(console.dir)
//--------------------------------------------------------------

app.get("/", (req, res) => {
  res.send("Running My Node server successfully 😃 ");
});

app.listen(port, () => {
  console.log("Node Server Running Successfully :) ");
});
