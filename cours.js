/* AJAX */

// Utilisation du Fetch (GET)
const url1 = 'https://randomuser.me/api/';

fetch(url1)
  .then(response => response.json())
  .then(response => {
    // console.log(response.results);
    // console.log(response.results[0]);
    // console.log(response.results[0].email);
    const apiResult = document.querySelector('.api-result');
    apiResult.textContent = response.results[0].email;
  });

  // Préciser ma requête
  // fetch('https://randomuser.me/api/', {
  //   method: 'GET', // ou POST, PUT, DELETE...
  //   headers: {
  //     'Content-Type': 'text/plain;charset=utf-8'
  //   },
  //   body: undefined, // ou string, FormData, Blob, ...
  // });


/* ////////////////////////// TP 1 Dogs ***********/
// let dogDisplayBtn = document.querySelector('.dog-display');
// console.log(dogDisplayBtn);
// dogDisplayBtn.addEventListener('click', dogDisplay);


// function dogDisplay() {
//   let optionValue = document.querySelector('option').value
//   console.log(optionValue);
//   const urlDogs = 'https://dog.ceo/api/breeds/image/random';
  

//   fetch(urlDogs)
//     .then(response => response.json())
//     .then(response => {
//       console.log(response.message);
//       let apiImgSrc = document.querySelector('.api-img');
      // apiImgSrc.src = response.message;
      // console.log(apiImgSrc);
//     });
// }

// const urlBreedsList = 'https://dog.ceo/api/breeds/list/all';


// fetch(urlBreedsList)
//   .then(response => response.json())
//   .then(response => {
//     const selectBreed = document.querySelector('#breed');
//     const keys = Object.keys(response.message);
//     keys.forEach(breed => {
//       let option = document.createElement('option');
//       option.value = breed;
//       option.textContent = breed;
//       selectBreed.appendChild(option);
//     });
//     let allOptions = document.querySelectorAll('option');

//     dogDisplayBtn.addEventListener('click', dogDisplay);

//     function dogDisplay() {
//       let urlDogsDisplay;
//       allOptions.forEach(option => {
//         console.log(option.value);
        // if(option.value != 'choose'){
        //   urlDogsDisplay = `https://dog.ceo/api/breed/${option.value}/images/random`;
        // } else {
        //   urlDogsDisplay = 'https://dog.ceo/api/breeds/image/random';
        // }
      // }) 
      
      
    
//       fetch(urlDogsDisplay)
//         .then(response => response.json())
//         .then(response => {
//           console.log(response.message);
//           let apiImgSrc = document.querySelector('.api-img');
//           apiImgSrc.src = response.message;
//         });
//     }
// });


/* Correction */

//Cibler les éléments
const displayBtn = document.querySelector('.dog-display');
const selectBreed = document.querySelector('#breed');

async function onInit() {
  // Récupérer les races
  const breeds = await getData('https://dog.ceo/api/breeds/list/all');

  // Ajouter les races dans le select
  addBreedsToSelect(breeds);

  // Afficher un chien sur l'interface
  displayBtn.addEventListener('click', dogDisplay);
}

onInit();


//Afficher un chien de manière aléatoire
async function dogDisplay() {
  let urlCorrection
  if(selectBreed.value == ''){
    urlCorrection = 'https://dog.ceo/api/breeds/image/random'
  }else{
    urlCorrection = `https://dog.ceo/api/breed/${selectBreed.value}/images/random`
  }

  const response = await fetch(urlCorrection);
  const data = await response.json();
  document.querySelector('.api-img').src = data.message;
  
  // fetch(urlCorrection)
  //   .then(response => response.json())
  //   .then(response => {
  //     document.querySelector('.api-img').src = response.message;
  //   });
};

// Récupérer les races pour les ajouter dans le select
async function getData(url){
  const response = await fetch(url);
  const data = await response.json();
  return data.message;

  // fetch(url)
  //   .then(response => response.json())
  //   .then(response => {
  //     return response.message;
  //   });
}

function addBreedsToSelect(breeds){
  // Parcourir un objet
  // For in
  for(const breed in breeds){
    console.log(breed);
    const option = document.createElement('option');
    option.textContent = capitalize(breed);
    option.value = breed;
    selectBreed.appendChild(option);
  };
  
  
  // Convertis l'objet en tableau (chaque clé = un élément du tableau) -> parcourir un tableau
  // Object.keys(response.message).forEach(breed => {
  //   console.log(breed);
  // });
};

function capitalize(word){
  return word[0].toUpperCase() + word.slice(1);
}