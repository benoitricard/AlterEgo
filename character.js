'use strict'

// récupération de l'id en url
let param = new URLSearchParams(window.location.search) // récupération de l'id de la page
let id = param.get('id') // id de la page
// fin de récupération de l'id en url

// appel de l'API
fetch(`https://myheroacademiaapi.com/api/character/${id}`)
.then(function response(res) {
    if (res.ok) {
        return res.json()
    }
})
.then((value) => {

    const character = value // renvoie les infos du personnages
    console.log(character)

    // bannière aléatoire
    function randomIntFromInterval(min, max) { // min and max included 
        return Math.floor(Math.random() * (max - min + 1) + min)
    }
    const rndInt = randomIntFromInterval(1, 4)
    const banner = document.getElementById('banner')
    switch (rndInt) {
        case 1:
            banner.innerHTML = `<img id="banner_img" src="https://cdna.artstation.com/p/assets/images/images/004/788/466/large/wang-hao-.jpg?1486287023"></img>`
        break;
        case 2:
            banner.innerHTML = `<img id="banner_img" src="https://i.pinimg.com/originals/86/63/55/86635599c37f34ebbbd4bf3a95a344d3.jpg"></img>`
        break;
        case 3:
            banner.innerHTML = `<img id="banner_img" src="https://i.pinimg.com/originals/84/bb/80/84bb80a5e0ce779fca4c1f6a4d444987.jpg"></img>`
        break;
        case 4:
            banner.innerHTML = `<img id="banner_img" src="https://images2.alphacoders.com/106/1062065.jpg"></img>`
    }
    // fin de bannière aléatoire


    // icone de status
    function statusIcon() {
        switch (character.status) {
            case 'Alive':
                return '<i class="fas fa-heart heart"></i>'
            break;
            case 'Deceased':
                return '<i class="fas fa-skull skull"></i>'
            break;
            case 'Arrested':
                return '<i class="fas fa-grip-lines-vertical jail"></i>'
            break;
            case 'Imprisoned':
                return '<i class="fas fa-grip-lines-vertical jail"></i>'
            break;
            default:
                return '<i class="fas fa-question unknown"></i>'
        }
    }
    // fin d'icone de status


    // icone de gender
    function genderIcon() {
        switch (character.gender) {
            case 'Male':
                return '<i class="fas fa-mars male"></i>'
            break;
            case 'Female':
                return '<i class="fas fa-venus female"></i>'
            break;
            default:
                return '<i class="fas fa-question unknown"></i>'
        }
    }
    // fin d'icone de status


    // infos dynamiques du character
    const characterSection = document.getElementById('character')
    const characterInfo = `
        <div id="images">
            <div id="img">
                <img src=${character.images[0]}>
            </div>
        </div>

        <div id="character_informations">

            <div id="principal_info">
                <p id="name">${character.name || character.id || 'Unknown'}</p>
                <p id="alias">Hero Name - <span class="alias_bold">${character.alias || 'Unknown'}</span></p>
                <p id="description">${character.description || 'Unknown'}</p>
            </div>

            <div id="life_info">
                <p class="life_title title">Life</p>
                <p class="categories" id="affiliation"><i class="fas fa-graduation-cap"></i>Affiliation - <span class="bold_categories">${character.affiliation || 'Unknown'}</span></p>
                <p class="categories" id="birthday"><i class="fas fa-birthday-cake"></i>Birthday - <span class="bold_categories">${character.birthday || 'Unknown'}</span></p>
                <p class="categories" id="occupation"><i class="fas fa-portrait"></i>Occupation - <span class="bold_categories">${character.occupation || 'Unknown'}</span></p>
                <div id="ages">
                    <p class="ages_subtitle subtitle"><i class="fas fa-calendar-alt"></i>Ages</p>
                </div>
                <div id="family">
                    <p class="family_subtitle subtitle"><i class="fas fa-home"></i>Family</p>
                </div>
            </div>

            <div id="manga_info">
                <p class="manga_title title">Manga Names</p>
                <p class="categories" id="kanji"><i class="fas fa-book"></i>Kanji - <span class="bold_categories">${character.kanji || 'Unknown'}</span></p>
                <p class="categories" id="romaji"><i class="fas fa-book"></i>Romaji - <span class="bold_categories">${character.romaji || 'Unknown'}</span></p>
            </div>

        <div id="fight_info">
            <p class="fight_title title">Fight</p>
            <p class="categories" id="alter"><i class="fas fa-fire"></i>Alter - <span class="bold_categories">${character.quirk || 'Unknown'}</span></p>
            <p class="categories" id="fightstyle"><i class="fas fa-fist-raised"></i>Fightstyle - <span class="bold_categories">${character.fightstyle || 'Unknown'}</span></p>
            <p class="categories" id="epithet"><i class="fas fa-fire"></i>Epithet - <span class="bold_categories">${character.epithet || 'Unknown'}</span></p>
            <p class="categories" id="teams"><i class="fas fa-users"></i>Teams - <span class="bold_categories">${character.teams || 'Unknown'}</span></p>
        </div>

        <div id="physique_info">
            <p class="physique_title title">Physique</p>
            <p class="categories" id="status"><i class="fas fa-battery-three-quarters"></i>Status - <span class="bold_categories">${character.status || 'Unknown'}</span>${statusIcon()}</p>
            <p class="categories" id="gender"><i class="fas fa-venus-mars"></i>Gender - <span class="bold_categories">${character.gender || 'Unknown'}</span>${genderIcon()}</p>
            <p class="categories" id="height"><i class="fas fa-ruler-vertical"></i>Height - <span class="bold_categories">${character.height || 'Unknown'}</span></p>
            <p class="categories" id="hair"><i class="fas fa-palette"></i>Hair - <span class="bold_categories">${character.hair || 'Unknown'}</span></p>
            <p class="categories" id="eye"><i class="fas fa-eye"></i>Eye Color - <span class="bold_categories">${character.Eye || 'Unknown'}</span></p>
            <p class="categories" id="bloodtype"><i class="fas fa-tint"></i>Bloodtype - <span class="bold_categories">${character.bloodtype || 'Unknown'}</span></p>
        </div>

    </div>`

    characterSection.innerHTML = characterInfo
    // fin des infos dynamiques du character


    // dynamisation de la catégorie âges
    const ages = document.getElementById('ages')
    if (character.ages == null) {
        const nullText = `<p class="subcategory"><span class="bold_subcategory">Unknown</span></p>`
        ages.innerHTML += nullText
    } else {
        for (let i = 0; i < character.ages.length; i++) {
            const age = `<p class="subcategory"><span class="bold_subcategory">${character.ages[i].age}</span> years old - <span class="bold_subcategory">${character.ages[i].when}</span></p>`
            ages.innerHTML += age
        }
    }
    // fin de la dynamisation de la catégorie âges

    // dynamisation de la catégorie family
    const family = document.getElementById('family')
    if (character.family == null) {
        const nullText = `<p class="subcategory"><span class="bold_subcategory">Unknown</span></p>`
        family.innerHTML += nullText
    } else {
        for (let i = 0; i < character.family.length; i++) {
            const familyItem = `<p class="subcategory">Member - <span class="bold_subcategory">${character.family[i].name}</span></p>`
            family.innerHTML += familyItem
        }
    }
    // fin de la dynamisation de la catégorie family

    // dynamisation de la catégorie images
    const images = document.getElementById('images')
    for (let i = 1; i < character.images.length; i++) {
        const image = `<div class="image_item">
                            <img src=${character.images[i]}>
                        </div>`
        images.innerHTML += image
    }
    // fin de la dynamisation de la catégorie images

    
})
.catch((error) => {
    console.error(`Cette requête n'a pas pu aboutir ` + '- ' + error)
})
// fin d'appel de l'API