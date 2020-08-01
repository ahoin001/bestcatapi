express = require('express')

// ? Controller functions
const catController = require('../controllers/index')

const router = express.Router();

/* INDEX ROUTE - home page */
router.get('/', (req, res, next) => {
    res.redirect('/randomcat');
});

router.post('/cats', catController.addCatToDB);

router.get('/cats', catController.getCatsFromDB);

router.get('/cats/lovedcats', catController.getlovedCatsFromDB);

router.patch('/cats', catController.updateCatLovedInDB);

router.delete('/cats/:catIdToDelete', catController.deleteCatFromDB);


// ? Returns random Cat Pic 
router.get('/randomcat', (req, res) => {

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

router.post('/catname', (req, res) => {

    console.log('Request Body: ', req.body)

    res.json({
        status: 'Success Addition!'
    })

});




module.exports = router;