const express = require('express')
const cors = require('cors')

const app = express();

const PORT = 2000

app.use(cors())
// ? Create sever listening for requests on PORT
app.listen(PORT || 3000, () => {
    console.log(`App listening on port ${PORT}!`);
});

// ? Returns random Cat Pic 
app.get('/', (req, res) => {

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

    let randomPicIndex = Math.floor(Math.random() * 15);

    res.json({
        catPicUrl: randomPics[randomPicIndex]
    })

});