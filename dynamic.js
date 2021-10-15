'use strict'

let pages = 16 // nombre de pages
for (let i = 1; i <= pages; i++) {
    const button = `<button id="${[i]}" onclick="location.href='index.html?id=${[i]}';">${[i]}</button>`
    const pages = document.getElementById('pages')
    pages.innerHTML += button
}

let param = new URLSearchParams(window.location.search) // récupération de l'id de la page
let id = param.get('id') // id de la page

const actualPage = document.getElementById(id)
actualPage.style.backgroundColor = "#000"
actualPage.style.color = "#fff"

fetch(`https://myheroacademiaapi.com/api/character?page=${id}`)
.then(function response(res) {
    if (res.ok) {
        return res.json()
    }
})
.then((value) => {


    const characters = value.result // renvoie tous les personnages de la page en question
    const informations = document.getElementById('informations') // section infos de la page (index, nb de résultats)
    informations.innerHTML = `<p>Nombre de résultats obtenus pour cette page - <span class="bold">${characters.length}</span></p>`

    for (let i = 0; i < characters.length; i++) {
        function genderIcon() {
            if (characters[i].gender == 'Male') {
                return '<i class="fas cardfa male1 genderfa fa-mars"></i>'
            } else if (characters[i].gender == 'Female') {
                return '<i class="fas cardfa female1 genderfa fa-venus"></i>'
            } else {
                return '<i class="fas cardfa unknown1 genderfa fa-question"></i>'
            }
        }
        function aliveOrDead() {
            if (characters[i].status == 'Alive') {
                return '<i class="fas cardfa heart1 fa-heart"></i>'
            } else if (characters[i].status == 'Deceased') {
                return '<i class="fas cardfa skull1 fa-skull"></i>'
            } else if (characters[i].status == ('Arrested' || 'Imprisoned')) {
                return '<i class="fas cardfa jail1 fa-grip-lines-vertical"></i>'
            } else {
                return '<i class="fas cardfa unknown1 fa-question"></i>'
            }
        }
        const cards = document.getElementById('cards')
        const card = `<div class="card" onclick="location.href='character.html?id=${characters[i].id}';">
                        <div id="pins">
                            <div class="${characters[i].gender}">${genderIcon()}</div>
                            <div class="${characters[i].status}">${aliveOrDead()}</div>
                        </div>
                        <img src=${characters[i].images[0]}>
                        <p>${characters[i].name || characters[i].description || characters[i].id}</p>
                    </div>`
        cards.innerHTML += card
    }

    
})
.catch((error) => {
    console.error(`Cette requête n'a pas pu aboutir ` + '- ' + error)
})