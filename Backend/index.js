const express = require('express');
const app = express();
const port = process.env.PORT || 5000;
const adModel = require('./searchModel').adModel;
const mongoose = require('mongoose');

//Connect the database with the app
mongoose.connect('mongodb://localhost:27017/adSearch', {
  useNewUrlParser: true,
  useUnifiedTopology: true,  
});

const db = mongoose.connection;
db.on("error", console.error.bind(console, "Connection Error: "));
db.once("open", function() {
    console.log("Database Connected Successfully-->", db.name);
})

app.use(express.json());

if(process.env.NODE_ENV === 'production'){
    app.use(express.static('client/build'));
    app.get('*', (req, res) => {
        res.sendFile(path.resolve(__dirname, 'client', 'build', 'index.html'));
    })
}

app.use((req, res, next)=> {
    res.header('Access-Control-Allow-Origin', '*');
    res.header('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE, PATCH, OPTIONS');
    res.header('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content-Type, Accept');
    next();
});

//Get route to fetch all available ads in the DB
app.get('/allAds', async(req, res)=> {
    const combinedData = await adModel.aggregate([
        {
            $lookup: {
                from: "companies",
                localField: "companyId",
                foreignField: "_id",
                as: "companyDetails"
            }
        }
    ])
    try {
        res.send(combinedData);
    }catch(err) {
        res.status(500).send(err);
    }
});

//Creating get route to search the ad based on search query
app.get('/findAd/:searchKey', async(req, res)=> {
    console.log(req.params.searchKey);
    const filteredData = await adModel.aggregate([
        {
            $lookup: {
                from: "companies",
                localField: "companyId",
                foreignField: "_id",
                as: "companyDetails"
            }
        },
        {
            $unwind: "$companyDetails"
        },
        {
            $match: {
                    $or: [
                        {
                            "companyDetails.name": {$in: [req.params.searchKey]}      
                        },
                        {
                            "headline": {$in: [req.params.searchKey]}      
                        },
                        {
                            "description": {$in: [req.params.searchKey]}      
                        },
                        {
                            "primaryText": {$in: [req.params.searchKey]}      
                        },

                    ]                  
            }
        }
    ])

    //console.log(filteredData);
    try {
        res.send(filteredData);
    }catch(error) {
        res.status(500).send(error);
    }
});

//Setting the server to open on specific port
app.listen(port, ()=> {
    console.log(`Server running on port ${port}`);
});