'use strict'

// création des boutons de pages
let pages = 16 // nombre de pages
for (let i = 1; i <= pages; i++) {
    const button = `<button id="${[i]}" onclick="location.href='index.html?id=${[i]}';">${[i]}</button>`
    const pages = document.getElementById('pages')
    pages.innerHTML += button
}
// fin de création des boutons de pages

// récupération de l'id en url
let param = new URLSearchParams(window.location.search) // récupération de l'id de la page
let id = param.get('id') // id de la page
// fin de récupération de l'id en url

// index de base (sans numéro de page)
const revenirPageMsg = document.getElementById('revenir_page1')
const buttonsAffichage = document.getElementById('buttons_affichage')
const clickMsg = document.getElementById('click')
const legend = document.getElementById('legend')

if (id == null) {
    legend.style.display = 'none'
    revenirPageMsg.style.display = 'none'
    buttonsAffichage.style.display = 'none'
} else {
    clickMsg.style.display = 'none'
}
// fin d'index de base (sans numéro de page)

// style des boutons de page
const actualPage = document.getElementById(id)
actualPage.style.backgroundColor = "#000"
actualPage.style.color = "#fff"
// fin de style des boutons de page

fetch("https://apex-legends.p.rapidapi.com/stats/shadixvolt/ps4", {
	"method": "GET",
	"headers": {
		"x-rapidapi-host": "apex-legends.p.rapidapi.com",
		"x-rapidapi-key": "78e161bf78msh243a4f91951cfbap1650d6jsn82df877d9210"
	}
})
.then(function response(res) {
    if (res.ok) {
        return res.json()
    }
})
.then(response => {
	console.log(response);
})
.catch(err => {
	console.error(err);
});

// appel de l'API
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
                        <p class="card_p">${characters[i].name || characters[i].id || characters[i].description}</p>
                    </div>`
        cards.innerHTML += card
    }

        // style d'affichage des cartes
        const affichageLittle = document.getElementById('button_little')
        const affichageNormal = document.getElementById('button_normal')
        const affichageGreat = document.getElementById('button_great')
        const cardItem = document.getElementsByClassName('card')
        const cardP = document.getElementsByClassName('card_p')
        let affichage = 0

        function modifyAffichage() {
            switch (affichage) {
                case 0:
                    affichageNormal.style.backgroundColor = '#ab56ff'

                    affichageLittle.style.backgroundColor = '#c78eff'
                    affichageGreat.style.backgroundColor = '#c78eff'
                    for (let i = 0; i < cardItem.length; i++) {
                        cardItem[i].style.minWidth = '280px'
                        cardItem[i].style.minHeight = '350px'
                        cardItem[i].style.maxWidth = '280px'
                        cardItem[i].style.maxHeight = '350px'
                    }
                    for (let i = 0; i < cardP.length; i++) {
                        cardP[i].style.top = '280px'
                    }
                break;
                case 1:
                    affichageLittle.style.backgroundColor = '#ab56ff'

                    affichageNormal.style.backgroundColor = '#c78eff'
                    affichageGreat.style.backgroundColor = '#c78eff'
                    for (let i = 0; i < cardItem.length; i++) {
                        cardItem[i].style.minWidth = '200px'
                        cardItem[i].style.minHeight = '230px'
                        cardItem[i].style.maxWidth = '200px'
                        cardItem[i].style.maxHeight = '230px'
                    }
                    for (let i = 0; i < cardP.length; i++) {
                        cardP[i].style.top = '160px'
                    }
                break;
                case 2:
                    affichageGreat.style.backgroundColor = '#ab56ff'

                    affichageNormal.style.backgroundColor = '#c78eff'
                    affichageLittle.style.backgroundColor = '#c78eff'
                    for (let i = 0; i < cardItem.length; i++) {
                        cardItem[i].style.minWidth = '380px'
                        cardItem[i].style.minHeight = '450px'
                        cardItem[i].style.maxWidth = '380px'
                        cardItem[i].style.maxHeight = '450px'
                    }
                    for (let i = 0; i < cardP.length; i++) {
                        cardP[i].style.top = '380px'
                    }
                break;
                default:
                    affichageNormal.style.backgroundColor = '#ab56ff'

                    affichageLittle.style.backgroundColor = '#c78eff'
                    affichageGreat.style.backgroundColor = '#c78eff'
                    for (let i = 0; i < cardItem.length; i++) {
                        cardItem[i].style.minWidth = '280px'
                        cardItem[i].style.minHeight = '350px'
                        cardItem[i].style.maxWidth = '280px'
                        cardItem[i].style.maxHeight = '350px'
                    }
                    for (let i = 0; i < cardP.length; i++) {
                        cardP[i].style.top = '280px'
                    }
            }
        }

        affichageLittle.addEventListener('click', () => {
            affichage = 1
            modifyAffichage()
            console.log(affichage)
        })

        affichageNormal.addEventListener('click', () => {
            affichage = 0
            modifyAffichage()
            console.log(affichage)
        })

        affichageGreat.addEventListener('click', () => {
            affichage = 2
            modifyAffichage()
            console.log(affichage)
        })
        // fin de style d'affichage des cartes

    
})
.catch((error) => {
    console.error(`Cette requête n'a pas pu aboutir ` + '- ' + error)
})
// fin d'appel de l'API