// ? MODELS MUST BE IMPORTED THIS WAY IN THIS VERSION OF SEQUELIZE CLI
const db = require('../../database/models/index');
const Cat = db.Cat

const addCatToDB = async (req, res) => {

    console.log(req.body)

    try {

        const cat = await Cat.create({
            catId: req.body.catId,
            catImageUrl: req.body.catImageUrl,
            loved: false
        });
        return res.status(201).json({
            cat,
        });

    } catch (error) {
        console.log(error)
    }

}

const getCatsFromDB = async (req, res) => {

    try {
        const cats = await Cat.findAll();

        // console.log('(BACKEND) QUERYING CAT DATABASE :', cats)

        return res.json({
            cats
        })

    } catch (error) {
        console.log(error)
    }

}

const getlovedCatsFromDB = async (req, res) => {

    try {
        const lovedCats = await Cat.findAll({
            where: {
                loved: true
            }
        });

        // console.log('(BACKEND) QUERYING CAT DATABASE :', lovedCats)

        return res.json({
            lovedCats
        })

    } catch (error) {
        console.log(error)
    }

}

const updateCatLovedInDB = async (req, res) => {

    console.log(req.body)

    // ? Use catid from http request url
    const { idOfCatToLove, loved } = req.body

    try {

        await Cat.update({ loved: loved }, {
            where: {
                catId: idOfCatToLove
            }
        });

        return res.json({
            message: 'UPDATED CAT TO LOVED SUCCESSFULLY!'
        })

    } catch (error) {
        console.log(error)
    }


}

const deleteCatFromDB = async (req, res) => {

    console.log(`$$$$$ req `,req.params.catIdToDelete)
    // ? Use catid from http request url
    const { catIdToDelete } = req.params
    console.log(`$$$$$ req `,catIdToDelete)
    
    try {

        await Cat.destroy({
            where: {
                catId: catIdToDelete
            }
        });

        return res.json({
            message: 'Deleted cat successfully!'
        })

    } catch (error) {
        console.log(error)
    }

}


module.exports = {
    addCatToDB,
    getCatsFromDB,
    getlovedCatsFromDB,
    deleteCatFromDB,
    updateCatLovedInDB
}
