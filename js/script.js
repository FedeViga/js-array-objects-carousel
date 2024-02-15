/*
Dato un array di oggetti letterali con:
 - url dell’immagine
 - titolo
 - descrizione
Creare un carosello come nella foto allegata.
Milestone 0:
Come nel primo carosello realizzato, focalizziamoci prima sulla creazione del markup statico: costruiamo il container e inseriamo l'immagine grande in modo da poter stilare lo slider.
Milestone 1:
Ora rimuoviamo i contenuti statici e usiamo l’array di oggetti letterali per popolare dinamicamente il carosello.
Al click dell'utente sulle frecce verso sinistra o destra, la nuova immagine attiva diventerà visibile e dovremo aggiungervi titolo e testo.
Milestone 2:
Aggiungere il ciclo infinito del carosello. Ovvero se la miniatura attiva è la prima e l'utente clicca la freccia verso destra, la miniatura che deve attivarsi sarà l'ultima e viceversa per l'ultima miniatura se l'utente clicca la freccia verso sinistra.
BONUS 1:
Aggiungere le thumbnails (sottoforma di miniatura) ed al click attivare l’immagine corrispondente.
BONUS 2:
Aggiungere funzionalità di autoplay: dopo un certo periodo di tempo (3 secondi) l’immagine attiva dovrà cambiare alla successiva in automatico.
BONUS 3:
Aggiungere bottoni di start / stop e di inversione del meccanismo di autoplay.
*/



const images = [
    {
        image: 'img/01.webp',
        title: 'Marvel\'s Spiderman Miles Morales',
        text: 'Experience the rise of Miles Morales as the new hero masters incredible, explosive new powers to become his own Spider-Man.',
    }, {
        image: 'img/02.webp',
        title: 'Ratchet & Clank: Rift Apart',
        text: 'Go dimension-hopping with Ratchet and Clank as they take on an evil emperor from another reality.',
    }, {
        image: 'img/03.webp',
        title: 'Fortnite',
        text: "Grab all of your friends and drop into Epic Games Fortnite, a massive 100 - player face - off that combines looting, crafting, shootouts and chaos.",
    }, {
        image: 'img/04.webp',
        title: 'Stray',
        text: 'Lost, injured and alone, a stray cat must untangle an ancient mystery to escape a long-forgotten city',
    }, {
        image: 'img/05.webp',
        title: "Marvel's Avengers",
        text: 'Marvel\'s Avengers is an epic, third-person, action-adventure game that combines an original, cinematic story with single-player and co-operative gameplay.',
    }
];


// bersagliamo lo slider
const sliderElement = document.getElementById("slider");

// -  salvo un contatore della slide
let slideNumber = 1;

// creo forEach per visualizzare in pagina le immagini con titolo e descrizione
images.forEach((element, index) => {

    const carouselElement = document.createElement("figure");
    sliderElement.append(carouselElement);

    const carouselDetailListElement = document.createElement("div");
    carouselDetailListElement.classList.add("details");
    carouselElement.append(carouselDetailListElement);

    // per ogni ogetto dell'array aggiungo l'immagine, il titolo e la descrizione
    for (let key in element) {

        // creo immagine e thumbnail
        if (key == "image") {

            const carouselImageElement = document.createElement("img");
            carouselImageElement.src = "./" + element.image;
            carouselElement.append(carouselImageElement);

            // aggiungo thumbnails
            const ThumbnailListElement = document.querySelector(".thumbnails-list");
            console.log(ThumbnailListElement);
            const ThumbnailImageElement = document.createElement("img");
            ThumbnailImageElement.src = "./" + element.image;
            ThumbnailListElement.append(ThumbnailImageElement);

            // al click della thumbnail cambio l'immmagine visualizzata
            ThumbnailImageElement.addEventListener('click', function() {

                // rendo active la thumbnail selezionata
                for (let i = 0; i < images.length; i++) {
                    document.querySelector(`.thumbnails-list img:nth-of-type(${i + 1})`).classList.remove("thumbnail-active");
                    document.querySelector(`figure:nth-of-type(${i + 1})`).classList.remove("active");
    
                }
                this.classList.add("thumbnail-active");

                // rendo active l'immagine corrispondente all thumb
                slideNumber = index + 1;
                document.querySelector(`figure:nth-of-type(${slideNumber})`).classList.add("active");

            })

        // creo titolo e descrizione
        } else {
            const carouselDetailElement = document.createElement("div");
            carouselDetailElement.innerHTML = `<mark>${element[key]}</mark>`;
            carouselDetailElement.className = key;
            carouselDetailListElement.append(carouselDetailElement);

        }
    }

});

// rendo attiva la prima immagine
document.querySelector("figure:nth-of-type(1)").classList.add("active");

// rendo attiva la prima thumbnail
document.querySelector(".thumbnails-list img:nth-of-type(1)").classList.add("thumbnail-active");

/*
-  salvo un contatore della slide
-  QUANDO premo la freccia SU
    - prendo l'immagine attuale e le rimuovo la classe "active"  
    - aumento il contatore di 1
    - prendo l'immagine con il nuovo contatore e le aggiungo la classe "active"
*/


// -  QUANDO premo la freccia GIU
document.querySelector("#down-arrow").addEventListener("click", function() {


    if (slideNumber < images.length) {

        // - prendo l'immagine attuale e le rimuovo la classe "active"  
        document.querySelector(`figure:nth-of-type(${slideNumber})`).classList.remove("active");

        // tolgo l'active alla thumbnail
        document.querySelector(`.thumbnails-list img:nth-of-type(${slideNumber})`).classList.remove("thumbnail-active");
        // - aumento il contatore di 1
        slideNumber++;

        // - prendo l'immagine con il nuovo contatore e le aggiungo la classe "active"
        document.querySelector(`figure:nth-of-type(${slideNumber})`).classList.add("active");

        // aggiungo active alla thumbnail
        document.querySelector(`.thumbnails-list img:nth-of-type(${slideNumber})`).classList.add("thumbnail-active");

        console.log(slideNumber);

    } else {

        // - prendo l'immagine attuale e le rimuovo la classe "active"  
        document.querySelector(`figure:nth-of-type(${slideNumber})`).classList.remove("active");

        // tolgo l'active alla thumbnail
        document.querySelector(`.thumbnails-list img:nth-of-type(${slideNumber})`).classList.remove("thumbnail-active");

        // resetto la variabile che mi conta l'immagine a cui sono arrivato
        slideNumber = 1;

        // - prendo l'immagine con il nuovo contatore e le aggiungo la classe "active"
        document.querySelector(`figure:nth-of-type(${slideNumber})`).classList.add("active");

        // aggiungo active alla thumbnail
        document.querySelector(`.thumbnails-list img:nth-of-type(${slideNumber})`).classList.add("thumbnail-active");

    }

        
});

// -  QUANDO premo la freccia SU
document.querySelector("#up-arrow").addEventListener("click", function() {

    if (slideNumber > 1) {
        // - prendo l'immagine attuale e le rimuovo la classe "active"  
        document.querySelector(`figure:nth-of-type(${slideNumber})`).classList.remove("active");

        // tolgo l'active alla thumbnail
        document.querySelector(`.thumbnails-list img:nth-of-type(${slideNumber})`).classList.remove("thumbnail-active");

        // - diminuisco il contatore di 1
        slideNumber--;

        // - prendo l'immagine con il nuovo contatore e le aggiungo la classe "active"
        document.querySelector(`figure:nth-of-type(${slideNumber})`).classList.add("active");

        // aggiungo active alla thumbnail
        document.querySelector(`.thumbnails-list img:nth-of-type(${slideNumber})`).classList.add("thumbnail-active");

        console.log(slideNumber);

    } else {

        // - prendo l'immagine attuale e le rimuovo la classe "active"  
        document.querySelector(`figure:nth-of-type(${slideNumber})`).classList.remove("active");

        // tolgo l'active alla thumbnail
        document.querySelector(`.thumbnails-list img:nth-of-type(${slideNumber})`).classList.remove("thumbnail-active");

        // - metto il valore di slideNumebr = alla posizione dell'ultima immagine
        slideNumber = images.length;

        // - prendo l'immagine con il nuovo contatore e le aggiungo la classe "active"
        document.querySelector(`figure:nth-of-type(${slideNumber})`).classList.add("active");

        // aggiungo active alla thumbnail
        document.querySelector(`.thumbnails-list img:nth-of-type(${slideNumber})`).classList.add("thumbnail-active");

    }
    


});