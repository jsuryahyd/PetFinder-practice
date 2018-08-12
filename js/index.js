import {apiKey} from '../config/keys.js';
import fetchJsonp from 'fetch-jsonp' ;
import {isValidZip,showInputError,removeInputError} from './validations';

const petForm = document.getElementById('pet-form');
petForm.onsubmit = fetchPets;


async function fetchPets(e){
    e.preventDefault();
    const animalInput = document.getElementById('animal');
    const animal = animalInput.value;
    const zipcodeInput = document.getElementById('zipcode');
    const zipcode = zipcodeInput.value;

    if(!isValidZip(zipcode)){
        return showInputError(zipcodeInput,'Enter a Valid zip-code.');
    }else{
        removeInputError(zipcodeInput)
    }


    const res = await fetchJsonp(`http://api.petfinder.com/pet.find?format=json&key=${apiKey}&animal=${animal}&location=${zipcode}&callback=callback`,{
        jsonpCallbackFunction : 'callback'
    })
    const jsonFn = res.json;
    const data = await jsonFn().catch(err=>console.error(err));
    const pets = data.petfinder.pets.pet;
    showPets(pets);
}

function showPets(pets){
    var resultsContainer = document.getElementsByClassName('results')[0];
    resultsContainer.innerHTML = '';
    console.log(pets[0])
    pets.forEach(pet => {
        const imgUrl = (pet.media && pet.media.photos) && pet.media.photos.photo.filter(i=>i['@size'] == 'x')[0].$t;
const address = pet.contact.address1 && pet.contact.address1.$t;
const city = pet.contact.city ;
        const div = document.createElement('div');
        div.classList.add('card', 'card-body', 'mb-3');
        div.innerHTML = `
    <div class='row'>
    <div class="col-sm-6">
    <h4>${pet.name.$t} (${pet.age.$t})</h4>
    ${pet.breeds.breed.$t ? `<p class="text-secondary">${pet.breeds.breed.$t}</p>` : ``}
    <p>${address},${city ? city.$t :''},${pet.contact.state.$t},${pet.contact.zip.$t}</p>
    <ul class="list-group">
    <li class="list-group-item">${pet.contact.phone.$t}</li>
    ${ (pet.contact.email &&  pet.contact.email.$t) ? `<li class="list-group-item" >${pet.contact.email.$t}</li>` : ``}
    </div>
    <div class="col-sm-6 text-center">
<img src="${imgUrl}" class="img-fluid rounded-circle mt-2">
    </div>
    </div>
        `;
        resultsContainer.appendChild(div)
    });
}