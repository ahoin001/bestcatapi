// ? Recreated Cat Api from Scratch with my own database for practice

// ****************************************************************
//? CONNECT TO DOM  & INITIALIZE VARIABLES
// ****************************************************************

let randomCatContainer = document.querySelector("div.pic-container")
let randomCatPic = document.querySelector("img")

let lovedCatContainer = document.querySelector("div.loved-container")
let lovedCatPicsList = document.querySelector(".loved-cat-list")
let catNameList = document.querySelector(".catname-list")

let voteButtons = document.querySelectorAll(".vote-bttn")

let catImageID;
let lovedCats = [];

let apiUrl;


const sub_id = `CatLady${Math.floor(Math.random() * 300000)}`;
// console.log(sub_id)

// ****************************************************************
//? CONNECT TO DOM  & INITIALIZE VARIABLES
// ****************************************************************

const getApiKeyDynamically = async () => {

    let apiEnvironment;

    try {

        response = await fetch(
            "http://localhost:2000/apikeys",
            {
                method: "GET",
                headers: {
                    "Content-Type": "application/json"
                }
            })

        apiObject = await response.json()

        apiEnvironment = apiObject.status;

        console.log(`Environment: `, apiEnvironment)

    } catch (error) {
        console.log(error)
    }

    if (apiEnvironment !== 'development') {
        try {
            response = await fetch(
                "https://afternoon-oasis-64306.herokuapp.com/apikeys",
                {
                    method: "GET",
                    headers: {
                        "Content-Type": "application/json"
                    }
                })

            apiObject = await response.json()

            apiEnvironment = apiObject.status;

            console.log(`Environment: `, apiEnvironment)
        } catch (error) {

        }
    }


    if (apiEnvironment === 'development') {

        apiUrl = "http://localhost:2000"

    } else if (apiEnvironment === 'production') {

        apiUrl = "https://afternoon-oasis-64306.herokuapp.com/"

    } else {
        console.log('Did not get environment');
    }

    await setRandomCatFromDatabase();

}


// ****************************************************************
//? CATDATABASE FUNCTIONS (RECREATED CAT API FOR PRACTICE)
// ****************************************************************


// ? Default fetch to database will be a get request returning all cats
const fetchCatDatabaseApi = async (url = `${apiUrl}/cats`, requestType = "GET", requestBody) => {

    console.log('URL To Hit: ', apiUrl)

    let response;

    if (requestType === "GET") {

        try {

            response = await fetch(
                url,
                {
                    method: requestType,
                    headers: {
                        "Content-Type": "application/json"
                    }
                })

        } catch (error) {
            console.log(error)
        }

    } else {

        try {

            response = await fetch(
                url,
                {
                    method: requestType,
                    body: requestBody,
                    headers: {
                        "Content-Type": "application/json"
                    }
                })

        } catch (error) {
            console.log(error)
        }


    }

    // So .json won't have to be called everywhere
    let dataParsed = await response.json();

    return dataParsed;

}

const setRandomCatFromDatabase = async () => {

    const databaseResponseFromFindCatsQuery = fetchCatDatabaseApi();

    databaseResponseFromFindCatsQuery
        .then((objectReturnedFromQueryHoldingCatTable) => {

            console.log('SQL Response As Object with Cat Table(list)', objectReturnedFromQueryHoldingCatTable)

            const theListOfCats = objectReturnedFromQueryHoldingCatTable.cats

            let randomCatIndex = Math.floor(Math.random() * (theListOfCats.length - 1) + 1);

            console.log('INDEX OF RANDOM: ', randomCatIndex)

            const { catId, catImageUrl } = theListOfCats[randomCatIndex]

            randomCatPic.setAttribute("src", catImageUrl)

            // ? Set global cat imageID from the new random cat for votes
            catImageID = catId;
            console.log(`%%%%%%%%%%%%% Cat ID: `, catImageID)

        })

    await getVotedCatsFromDatabase()

}

const addCatToCatBase = async () => {

    const catId = document.getElementById("catId").value;
    const catImageUrl = document.getElementById("catPic").value;

    const requestBody = JSON.stringify({
        catId,
        catImageUrl
    })

    try {

        const addedCatToDatabaseResponse = await fetchCatDatabaseApi(
            `${apiUrl}/cats`,
            "POST",
            requestBody)

        console.log('Cat Added To Database: ', addedCatToDatabaseResponse)

    } catch (error) {
        console.log(error)
    }

}

const loveCatVoteToDatabase = async () => {


    voteButtons.forEach(bttn => {
        bttn.disabled = true;
    })

    // ? Convert Request to JSON for transfer to api
    let requestBodyLovedCat = JSON.stringify({
        idOfCatToLove: catImageID,
        loved: true
    })

    // console.log('(FE) Your cat vote: ', requestBodyLovedCat)

    try {

        const responseAfterUpdatingCat = await fetchCatDatabaseApi(
            // "http://localhost:2000/cats",
            `${apiUrl}/cats`,
            "PATCH",
            requestBodyLovedCat)

        console.log(responseAfterUpdatingCat)

    } catch (error) {
        console.log(error)
    }

    await setRandomCatFromDatabase()

    voteButtons.forEach(bttn => {
        bttn.disabled = false;
    })

}


const deleteCatFromDatabase = async () => {

    const idOfCatToDelete = document.getElementById("catId").value;

    console.log(`(FE) ID of Cat to be deleted: `, idOfCatToDelete)

    try {

        const DeletedCatFromDatabaseResponse = await fetchCatDatabaseApi(
            // `http://localhost:2000/cats/${idOfCatToDelete}`,
            `${apiUrl}/cats/${idOfCatToDelete}`,
            "DELETE",
        )

        console.log('Cat Deleted From Database: ', DeletedCatFromDatabaseResponse)

    } catch (error) {
        console.log(error)
    }

}


const getVotedCatsFromDatabase = async () => {

    let lovedCatsFromDatabaseResponse;

    try {

        lovedCatsFromDatabaseResponse = await fetchCatDatabaseApi(`${apiUrl}/cats/lovedcats`,)

        console.log('Cats loved From Database: ', lovedCatsFromDatabaseResponse.lovedCats)

    } catch (error) {
        console.log(error)
    }

    const lovedCats = lovedCatsFromDatabaseResponse.lovedCats;

    lovedCats.forEach((cat) => {

        let lovedCatImg = document.createElement("img");

        lovedCatImg.setAttribute("src", cat.catImageUrl)
        lovedCatImg.setAttribute("class", "fav-cat")

        lovedCatPicsList.appendChild(lovedCatImg)


    });

    // const recentCat = catsThatWereVoted.pop()

    // if (recentCat.value === 1) {

    //     const catID = recentCat.image_id;

    //     const catImageInfo = await fetchCatApi(`https://api.thecatapi.com/v1/images/${catID}`)

    //     // console.log('******', catImageInfo)

    //     let lovedCatImg = document.createElement("img");

    //     lovedCatImg.setAttribute("src", catImageInfo.url)
    //     lovedCatImg.setAttribute("class", "fav-cat")

    //     lovedCatPicsList.appendChild(lovedCatImg)

    // } else {
    //     console.log(`Cat not loved :( : ${recentCat} `)
    // }


}

// setRandomCatFromDatabase()
