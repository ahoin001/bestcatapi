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


const sub_id = `CatLady${Math.floor(Math.random() * 300000)}`;
console.log(sub_id)


// ****************************************************************
//? API INTERACTIONs
// ****************************************************************

const fetchCatApi = async (url = "https://api.thecatapi.com/v1/images/search", requestType = "GET", requestBody) => {

    let response;

    if (requestType === "GET") {
        response = await fetch(
            url,
            {
                method: requestType,
                headers: {
                    'x-api-key': '5d07ae96-a25c-474e-94f0-5c6bd5e5a60b',
                    "Content-Type": "application/json"
                }
            })
    } else {

        response = await fetch(
            url,
            {
                method: requestType,
                body: requestBody,
                headers: {
                    'x-api-key': '5d07ae96-a25c-474e-94f0-5c6bd5e5a60b',
                    "Content-Type": "application/json"
                }
            })

    }


    let dataParsed = await response.json();

    // console.log(dataParsed);

    return dataParsed;

}

// ****************************************************************
//? Utility FUNCTIONS
// ****************************************************************

const setRandomCat = async () => {

    // Uses CatApi
    // const apiResponse = await fetchCatApi();

    // randomCatPic.setAttribute("src", apiResponse[0].url)

    // catImageID = apiResponse[0].id;


    // Uses practice API
    const challengeApi = await fetchCatApi("http://localhost:2000/randomcat")
    console.log("FROM MY API: ", challengeApi.catPicUrl)

    randomCatPic.setAttribute("src", challengeApi.catPicUrl)
    catImageID = challengeApi;

}

const postVoteToCatApi = async (requestBody) => {

    let response = await fetchCatApi("https://api.thecatapi.com/v1/votes", "POST", requestBody);

    console.log('Post Request:', response);

}

const addCatName = async () => {

    const catName = document.getElementById("catName").value;

    console.log(`Cat Name: `, catName)

    const requestBody = JSON.stringify({
        catName
    })

    let challengeApiResponse;

    try {
        challengeApiResponse = await fetch(

            "http://localhost:2000/catname",
            {
                method: 'POST',
                body: requestBody,
                headers: {
                    "Content-Type": "application/json"
                }
            })

    } catch (error) {
        console.log(error)
    }

    let dataParsed = await challengeApiResponse.json();

    console.log('Challenge Response: ', dataParsed.status)

    let newCatName = document.createElement("li");

    newCatName.setAttribute("class", "catList-item")

    newCatName.textContent += catName;

    catNameList.appendChild(newCatName)

}


const lovedCat = async (catImageId) => {

    voteButtons.forEach(bttn => {
        bttn.disabled = true;
    })

    let requestBodyVote = JSON.stringify({
        image_id: catImageId,
        sub_id,
        value: 1
    })

    // console.log('Your cat vote: ', requestBodyVote)

    await postVoteToCatApi(requestBodyVote)

    await setRandomCat()

    await getVotedCats();

    voteButtons.forEach(bttn => {
        bttn.disabled = false;
    })

}

const nopedCat = async (catImageId) => {

    voteButtons.forEach(bttn => {
        bttn.disabled = true;
    })

    let requestBodyVote = {
        image_id: catImageId,
        sub_id,
        value: 0
    }

    await postVoteToCatApi(JSON.stringify(requestBodyVote))

    await setRandomCat()

    voteButtons.forEach(bttn => {
        bttn.disabled = false;
    })

}

const getVotedCats = async () => {

    const catsThatWereVoted = await fetchCatApi(`https://api.thecatapi.com/v1/votes?sub_id=${sub_id}`)
    // const catsThatWereVoted = await fetchCatApi(`https://api.thecatapi.com/v1/votes`)

    console.log(`Cats that were voted: `, catsThatWereVoted)

    const recentCat = catsThatWereVoted.pop()

    if (recentCat.value === 1) {

        const catID = recentCat.image_id;

        const catImageInfo = await fetchCatApi(`https://api.thecatapi.com/v1/images/${catID}`)

        // console.log('******', catImageInfo)

        let lovedCatImg = document.createElement("img");

        lovedCatImg.setAttribute("src", catImageInfo.url)
        lovedCatImg.setAttribute("class", "fav-cat")

        lovedCatPicsList.appendChild(lovedCatImg)

    } else {
        console.log(`Cat not loved :( : ${recentCat} `)
    }


}


// ****************************************************************
//? FUNCTIONS In action 
// ****************************************************************

setRandomCat()
