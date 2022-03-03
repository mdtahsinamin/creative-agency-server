
const express = require('express')
const  bodyParser = require('body-parser')
const fileUpload = require('express-fileupload');
const cors = require('cors')
const admin = require('firebase-admin');
const ObjectId = require('mongodb').ObjectId;
require('dotenv').config()



const app = express()
app.use(cors())
app.use(bodyParser.urlencoded({ extended: false }))
app.use(bodyParser.json())
app.use(fileUpload());
app.use(express.static('services'));


 
// firebase admin 

  const serviceAccount = require("./creative-agency-client-9d373-firebase-adminsdk-kqiyl-359dec1d23.json");

  admin.initializeApp({
    credential: admin.credential.cert(serviceAccount),
    databaseURL: "https://creative-agency-client-9d373.firebaseio.com"
  });




  const MongoClient = require('mongodb').MongoClient;
  const uri = `mongodb+srv://${process.env.DB_USER}:${process.env.DB_PASSWORD}@cluster0.ntqwp.mongodb.net/${process.env.DB_NAME}?retryWrites=true&w=majority`;
  const client = new MongoClient(uri, { useNewUrlParser: true , useUnifiedTopology: true });

client.connect(err => {
  const adminCollection = client.db(`${process.env.DB_NAME}`).collection("Admin");

  const serviceCollection = client.db(`${process.env.DB_NAME}`).collection("services");

  const reviewCollection = client.db(`${process.env.DB_NAME}`).collection("reviews");

  const customerCollection = client.db(`${process.env.DB_NAME}`).collection("customers");
   
   console.log('database');

    
   app.post('/createNewAdmin',(req,res)=> {
       
       //console.log(req.body.email);
       
        adminCollection.insertOne({email: req.body.email}).then(result =>{
           res.send(result.insertedCount > 0);
      })
   })
  
   app.post('/createNewService',(req, res)=>{
        
         const file = req.files.file;
         const serviceTitle = req.body.serviceTitle;
         const description = req.body.description;
         
         const newImg = file.data;
         const encImg = newImg.toString('base64');


        var image = {
          contentType: file.mimetype,
          size: file.size,
          img: Buffer.from(encImg, 'base64')
       };
      
       serviceCollection.insertOne({serviceTitle,description,image}).then(result =>{
          res.send(result.insertedCount > 0)
       })


   })



   app.post('/clientReview',(req,res)=>{
        //console.log(req.body);
      
        reviewCollection.insertOne({
          name:req.body.data.name,
          companyName:req.body.data.companyName,
          description:req.body.data.description,
          photoUrl:req.body.data.photoURL
        }).then(result=>console.log(result))

   })
   
  
   app.post('/clientEnrollCourse',(req,res)=>{

     const file = req.files.file;
     
     const name = req.body.name;
     
     const email = req.body.email;

     const course = req.body.course;

     const projectDetails = req.body.projectDetails;

     const status = req.body.status;
    
     const newImg = file.data;
     const encImg = newImg.toString('base64');

     var image = {
      contentType: file.mimetype,
      size: file.size,
      img: Buffer.from(encImg, 'base64')
     }
    
     customerCollection.insertOne({name,email,course,projectDetails,status,image})
     .then(result => {
          res.send(result.insertedCount > 0)
     })

   })
   
  

   app.post('/isAdmin',(req,res)=>{
       //console.log(req.body.loginUserEmail);
       adminCollection.find({email:req.body.loginUserEmail})
       .toArray((err,Admins)=>{
            res.send(Admins.length > 0);
       })
   })
  

   app.get('/clientEnrollServices',(req,res)=>{

    const bearer = req.headers.authorization
      
    if(bearer && bearer.startsWith('Bearer ')){
       const idToken = bearer.split(' ')[1];
       admin.auth().verifyIdToken(idToken)
        .then((decodedToken) =>{
           let tokenEmail = decodedToken.email;
            if(tokenEmail == req.query.email){
              customerCollection.find({email:req.query.email})
              .toArray((err,documents)=>{
                 res.status(200).send(documents);
              })
            }
        }).catch((error) =>{
           res.status(401).send('Un authorized access')
        });
    }
    else{
       res.status(401).send('Un authorized access')
    }
     
   })

   app.get('/allService',(req,res)=>{
      serviceCollection.find({})
      .toArray((err,documents)=>{
         res.send(documents);
      })
   })
  
   app.get('/allReviews',(req,res)=>{
     reviewCollection.find({})
     .toArray((err,documents)=>{
          res.send(documents);
     })
   })
   
   app.get('/allCustomer',(req,res)=>{
      customerCollection.find({})
      .toArray((err,documents)=>{
          res.send(documents)
      })
   })
   
   app.patch('/status/:id',(req,res)=>{
      
       console.log(req.body.status);
       
      customerCollection.updateOne({_id:ObjectId(req.params.id)},
       {
         $set: {status: req.body.status}
       })
       .then(result=>{
          res.send(result.modifiedCount > 0)
      })
   })
   

});

app.get('/',(req, res) => {
   res.send('Hello World');
})


const port = 5200;
app.listen(process.env.PORT || port, () => {
  console.log(`Example app listening at http://localhost:${port}`)
})