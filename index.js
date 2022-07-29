const express = require('express');
require('dotenv').config();
const { MongoClient, ServerApiVersion, ObjectId } = require('mongodb');
const app = express();
const cors = require('cors');
const jwt = require('jsonwebtoken');
const stripe = require("stripe")(process.env.PAYMENT_SECRET_KEY);
const port = process.env.PORT || 5000
//use middleware
app.use(cors());
app.use(express.json());



// const uri = `mongodb+srv://${process.env.DB_USER}:${process.env.DB_PASS}@cluster0.mwk4o.mongodb.net/?retryWrites=true&w=majority`;
// const client = new MongoClient(uri, { useNewUrlParser: true, useUnifiedTopology: true, serverApi: ServerApiVersion.v1 });
// async function run() {
//     try {
//       await client.connect();
//       const productCollection = client.db("robotic").collection("products");
//       const orderCollection = client.db("robotic").collection("order");
//       const userCollection = client.db("robotic").collection("user");
//       const reviewCollection = client.db("robotic").collection("review");
//       const paymentCollection = client.db("robotic").collection("payments");

const uri = `mongodb+srv://${process.env.DB_USER}:${process.env.DB_PASS}@cluster0.bnedm.mongodb.net/?retryWrites=true&w=majority`;
const client = new MongoClient(uri, { useNewUrlParser: true, useUnifiedTopology: true, serverApi: ServerApiVersion.v1 });
async function run() {
    try {
      await client.connect();
      const productCollection = client.db("Robotic").collection("product");
      const orderCollection = client.db("Robotic").collection("order");
      const userCollection = client.db("Robotic").collection("user");
      const reviewCollection = client.db("Robotic").collection("review");
      const paymentCollection = client.db("Robotic").collection("payments");


/******verify JWT********/
function verifyJWT(req,res,next){
  const authHeader =req.headers.authorization;
  if(!authHeader){
    return res.status(401).send({message:'authorization'})
  }
  const token =authHeader.split(' ')[1];
  // verify a token symmetric
jwt.verify(token,process.env.ACCESS_TOKEN_SECRET, function(err, decoded) {
  if(err){
    return res.status(403).send({message:'Forbiden access'})
  }
  req.decoded=decoded;
  next();
});
}


// /******verifyAddmin ********/
//  const verifyAdmin=async(req,res,next)=>{
//    const requerster = req.decoded.email;
//    const requersterAccount = await userCollection.findOne({email:requerster});
//    if(requersterAccount.role==='admin'){
//  next();
//    }else{
//      res.status(403).send({message:"you are nont admin"})
//    }
//  }



// ----------get all product---------
    app.get("/product",async(req,res)=>{
        const query = {};
        const cursor = productCollection.find(query);
        const products = await cursor.toArray();
        res.send(products);
    })
 
// ----------get oneproduct--------- 
    app.get("/productid/:Id",async(req,res)=>{
        const Id = req.params.Id
         const query = {_id:ObjectId(Id)};
         const getOneProduct = await productCollection.findOne(query);
         res.send(getOneProduct)
      })
  

    }
    finally {
    
    }
  }
  run().catch(console.dir);




app.get('/', (req, res) => {
    res.send('Hello From Roboctic World https://vast-tor-95198.herokuapp.com/!!')
  })
   
  app.listen(port, () => {
    console.log(`Robotic app listening on port ${port}`)
  })