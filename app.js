let express = require('express');
let app = express();
let mongo = require('mongodb');
let mongoClient = mongo.MongoClient;
let dotenv = require('dotenv');
dotenv.config();
let port = process.env.PORT;
let mongoUrl = process.env.MONGO_URL;
let bodyParser = require('body-parser');
let cors = require('cors');
let authkey=process.env.Auth_Key;

let db;
app.use(bodyParser.urlencoded({ extended: true }));
app.unsubscribe(bodyParser.json());
app.use(cors());

//get heart beat
app.get('/', (req, res) => {
    res.status(200).send('Health okk');
});

app.get('/location', (req, res) => {
    let key=req.header('x-basic-token');
    if(key===authkey){
         db.collection('location').find().toArray((err,data)=>{
            if (err) throw err;
            res.status(200).send(data);
        });
    }else{
        res.status(401).send('Not authorized');
    }

   
});

mongoClient.connect(mongoUrl, (err, client) => {
    if (err)
        console.log(`error while connecting to mongodb`);
        db = client.db('aprilnode');
    app.listen(port, () => {
        console.log(`Running on port ${port}`);
    });
});

