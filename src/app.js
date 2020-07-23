const path = require('path')

const cors = require('cors')
const bodyParser = require('body-parser');
const express = require('express')

const app = express();

console.log(path.join(__dirname, '../public/'))
const publicDirectory = path.join(__dirname,'../public')

// Allow Clients to access api
app.use(cors())

// support parsing of application/json type post data
app.use(bodyParser.json());

// set static assets for use
app.use(express.static(publicDirectory))

// ? Create sever listening for requests on PORT
app.listen(process.env.PORT || 2000, () => {
    if (process.env.PORT) {
        console.log(`App listening on port ${process.env.PORT}!`);
    } else {
        console.log(`App listening on port! 2000`);
    }
});

const nameList =[];

// ? Returns random Cat Pic 
app.get('/randomcat', (req, res) => {

    const randomPics = [

        "https://cdn2.thecatapi.com/images/lm.jpg",
        "https://cdn2.thecatapi.com/images/e27.jpg",
        "https://cdn2.thecatapi.com/images/MTYyNjA5Nw.jpg",
        "https://cdn2.thecatapi.com/images/ahm.jpg",
        "https://cdn2.thecatapi.com/images/ahm.jpg",
        "https://cdn2.thecatapi.com/images/btb.jpg",
        "https://cdn2.thecatapi.com/images/aec.jpg",
        "https://cdn2.thecatapi.com/images/dfq.jpg",
        "https://cdn2.thecatapi.com/images/MTkyOTk5Mw.jpg",
        "https://cdn2.thecatapi.com/images/3ju.jpg",
        "https://cdn2.thecatapi.com/images/1tb.jpg",
        "https://cdn2.thecatapi.com/images/MTY4NjQ4OA.jpg",
        "https://cdn2.thecatapi.com/images/5j7.jpg",
        "https://cdn2.thecatapi.com/images/Vq1TbtBm0.jpg",
        "https://cdn2.thecatapi.com/images/b46.jpg"

    ];

    let randomPicIndex = Math.floor(Math.random() * randomPics.length);

    res.json({
        catPicUrl: randomPics[randomPicIndex]
    })

});

app.post('/catname', (req, res) => {
    
    // console.log('Request Body: ',req.body)

    res.json({
        status: 'Success Addition!'
    })

});
