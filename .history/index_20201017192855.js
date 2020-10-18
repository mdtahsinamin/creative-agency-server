
const express = require('express')
const  bodyParser = require('body-parser')
const fileUpload = require('express-fileupload');
var cors = require('cors')
require('dotenv').config()



const app = express()
app.use(cors())
app.use(bodyParser.urlencoded({ extended: false }))
app.use(bodyParser.json())
app.use(fileUpload());
app.use(express.static('services'));


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
           console.log(result);
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
          console.log(result);
     })


   })
   
  

   app.post('/isAdmin',(req,res)=>{
       //console.log(req.body.loginUserEmail);
      
       adminCollection.find({email:req.body.loginUserEmail})
       .toArray((err,Admins)=>{
            res.send(Admins.length > 0);
       })

      
   })






  
});

app.get('/',(req, res) => {
   res.send('Hello World');
})


const port = 5200;
app.listen(port, () => {
  console.log(`Example app listening at http://localhost:${port}`)
})