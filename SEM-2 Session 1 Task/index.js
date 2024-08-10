const express=require('express');
const rateLimit=require('express-rate-limit');
const compression = require('compression');
const { body, validationResult } = require('express-validator');
const router = express.Router();
const app=express();
const PORT=5000;

app.use(express.json());
//Task-1
app.get('/hello',(req,res)=>{
     res.send("Hello Express!");
});

//Task-2
app.get('/goodbye',(req,res)=>{
    res.send("Goodbye, Express!");
})

//Task-3
app.post('/echo', (req, res) => {
    const requestBody = req.body;
    res.json(requestBody);
});

//Task 4
app.get('/greet',(req,res)=>{
    const name=req.query.name;
    if(name){
        res.send(`Hello ${name}`);
    }
    else{
        res.send(`Hello stranger`);
    }
})

//Task 5
app.get('/greet/:name',(req,res)=>{
    const name=req.params.name;
    res.send(`Hello,${name}!`);
})

//Task 6
app.get('/user/:id',(req,res)=>{
    const id=req.params.id;
    res.send(`User ID:${id}`);
})

//Task 7
// app.use(express.static(path.join(__dirname,'public')));

//Task 8
app.get('/json',(req,res)=>{
    res.send({message:"Hello,World!"});
});

//Task 9
 app.post('/data', (req, res) => {
     const jsonData = req.body;
     res.json({
        message: 'Received JSON data',
        receivedData: jsonData
       });
 });

//Task 10
app.put('/update', (req, res) => {
    const jsonData = req.body;
    res.json({
        message: 'Data Updated',
        receivedData: jsonData
    });
});

//Task 11
app.delete( '/delete/:id',(req,res)=>{
    const id = req.params.id;
    res.send(`Deleted Item with Id:${id}`);
});

//Task 12
app.use((req,res,next)=>{
    console.log(`${req.method} ${req.url}`);
    next();
}); 
//Example
app.get('/', (req, res) => {
    res.send('Hello, world!');
});
app.post('/update', (req, res) => {
    res.send('Data updated');
});

//Task 13
app.get('/',(req,res)=>{
    res.send("Hello World");
});
app.get('/error',(req,res,next)=>{
    const err = new Error('Something Went wrong!');
    err.status=500;
    next(err);
});

//Task 14
// const port = process.env.PORT || 3000;

//Task 15
app.use(express.static('public'));
app.get('/route', (req, res) => {
  res.sendFile(path.join(__dirname, 'public', 'index.html'));
});
const port = process.env.PORT || 3000;

//Task 16
app.use(cors());

//Task 17
const limiter = rateLimit({
    windowMs: 15 * 60 * 1000, 
    max: 100, 
    standardHeaders: true, 
    legacyHeaders: false 
  });
  app.use(limiter);

//Task 18
app.use(compression());

//Task 19
app.post('/order',  
    [
     body('name').notEmpty().withMessage('Name is required'),
     body('phone').isLength({ min: 10 }).withMessage('Phone number must be at least 10 digits')
   ], (req, res) => {
     const errors = validationResult(req);
     if (!errors.isEmpty()) {
       return res.status(400).json({ errors: errors.array() });
     }
    const { name, phone
    } = req.body;
     console.log(`Order received from ${name} with phone number ${phone}`);
     res.json({ message: 'Order received!' });
   });

//Task 20
module.exports = router;

//Task 21
app.use(express.urlencoded({ extended: true }));

//Task 22
app.get('/toy', (req, res) => {
    const myToy = {
      name: 'Teddy Bear',
      color: 'brown',
      size: 'medium',
      canHug: true
    };
    res.json(myToy);
  });

//Task 23
app.get('/hide', (req, res) => {
    res.redirect('https://www.google.com');
});

//Task 24
app.use((req, res) => {
    res.status(404).send('Oops! You seem to be lost. That page doesn\'t exist.');
});

//Task 25
app.get('/secret', (req, res) => {
    const secretCode = '12345';
    res.status(200).json({ secret: secretCode });
});

app.listen(PORT,()=>{
    console.log(`Server is Running in port: ${PORT}`);
});