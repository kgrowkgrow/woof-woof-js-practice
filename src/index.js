
const DOGSURL = "http://localhost:3000/pups"

const dogBar = document.getElementById("dog-bar")

const dogInfo = document.getElementById("dog-info")

document.addEventListener("DOMContentLoaded", event => {

    populateDogBar()



})

function populateDogBar() {
    fetch(DOGSURL)
    .then(resp => resp.json())
    .then(json => {
        json.forEach(dog => {
            dogBar.appendChild(makeDogSpan(dog))
        })
    })
    
}

function makeDogSpan(dog) {
    const span = document.createElement("span")
    span.dataset.dogId = dog.id
    span.textContent = dog.name
    return span
}

dogBar.addEventListener("click", event => {

    if (event.target.tagName != "SPAN") {return}
    const dogId = event.target.dataset.dogId
    console.log(dogId)
    showDogInfo(dogId)

})

function showDogInfo(dogId) {
    fetch(DOGSURL + "/" + dogId)
    .then(resp => resp.json())
    .then(json => {
        console.log(json)

        dogInfo.innerHTML = ` 
        <img src= ${json.image}>
        <h2>${json.name}</h2>
        <button data-dog-id=${json.id}>${json.isGoodDog ? "Bad Dog!" : "Good Dog!"}</button>`  

    })
    // const dogData = 
}

dogInfo.addEventListener("click", event => {
    if (event.target.tagName != "BUTTON") {return}
    console.log(event.target)
    
    const dogStatus = event.target.innerText === "Good Dog!" 
    //  debugger



    fetch(DOGSURL + "/" + event.target.dataset.dogId, {
        method: "PATCH", 
        headers: {
            'Content-Type': "application/json",
            'Accept': "application/json"
        },
        body: JSON.stringify({
            "isGoodDog": dogStatus
        })
    })
    
    .then(resp => resp.json())
    .then(json => {
        
        showDogInfo(json.id)
       
        
        
        // event.target.innerText = event.target.innerText === "Good Dog!" ? "Bad Dog!" : "Good Dog!"
    })
} )


