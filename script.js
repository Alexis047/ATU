/* Homepage */

async function onInit(){
  const aliveNumber = document.querySelector('.alive-number');
  const vehicleNumber = document.querySelector('.vehicle-number');
  const planetNumber = document.querySelector('.planet-number');
  const allPlanetsNumber = document.querySelector('.planets-list-number');

  if(aliveNumber != null && vehicleNumber != null && planetNumber != null){
    aliveNumber.textContent = await getHomepageNumbers('https://swapi.dev/api/people');
    vehicleNumber.textContent = await getHomepageNumbers('https://swapi.dev/api/vehicles');
    planetNumber.textContent = await getHomepageNumbers('https://swapi.dev/api/planets');
  };
  
  if (allPlanetsNumber != null){
    allPlanetsNumber.textContent = await getHomepageNumbers('https://swapi.dev/api/planets') + ' résultat(s)';
  };

  const pages = await getCountPages();
  const planets = await getPlanets(pages);
  showPlanets(planets);

};

onInit();

async function getHomepageNumbers(url){
  const response = await fetch(url);
  const data = await response.json();
  return data.count;
};

async function getPlanets(pages){
  let allPlanets = []
  for(let i = 1; i <= pages; i++){
    const response = await fetch(`https://swapi.dev/api/planets/?page=${i}`);
    const data = await response.json();
    data.results.forEach(planet => {
      allPlanets.push(planet);
    })
  }
  return allPlanets;
}

async function getCountPages(){
  const response = await fetch('https://swapi.dev/api/planets');
  const data = await response.json();
  const count = data.count / data.results.length;
  return count;
}

function showPlanets(planets){
  const planetContainer = document.querySelector('.planets-container');
  planets.forEach(planet => {
    const div = document.createElement('div');
    div.classList.add('planet');
    div.innerHTML = `<p>${planet.name}</p><p>${planet.terrain}`;
    planetContainer.appendChild(div);
    div.addEventListener('click', showPlanetInfo(planet));
  });
}



function showPlanetInfo(planet){
  const planetInfo = document.querySelector('.planet-info');
  planetInfo.innerHTML = 
    `<h2>${planet.name}</h2>
    <p>Population : ${planet.population}</p>
    <p>Climat : ${planet.climate}</p>
    <p>Gravité : ${planet.gravity}</p>
    <p>Diamètre : ${planet.diameter}</p>`
}


// // Planets page
// let planets = [];

// // Dès que l'interface est chargée
// async function onInit() {
// await getPlanets();
// showPlanets();
// };

// onInit();

// async function getData(url) {
// const response = await fetch(url);
// const data = await response.json();
// return data;
// };

// async function getPlanets() {
// const countPages = await getData('https://swapi.dev/api/planets/');
// for (let i = 1; i <= Math.ceil(countPages.count / 10); i++) {
//     planets = planets.concat((await getData('https://swapi.dev/api/planets/?page=' + i)).results);
// };
// /*
// while(true) {
//     requete...
//     if(response.next == null) {
//         break
//     }
// }
// */
// };

// function showPlanets() {
// const tbody = document.querySelector('.planetsBody');
// planets.forEach(planet => {
//     const tr = document.createElement('tr');
//     const tdName = document.createElement('td');
//     tdName.textContent = planet.name;
//     const tdClimate = document.createElement('td');
//     tdClimate.textContent = planet.terrain;
//     tr.appendChild(tdName);
//     tr.appendChild(tdClimate);
//     tr.addEventListener('click', showPlanet);
//     tbody.appendChild(tr);
// });

// document.querySelector('.count').textContent = planets.length;
// };

// function showPlanet(event) {
// const planetName = event.currentTarget.querySelector('td').textContent;
// const planet = planets.find(planet => planet.name == planetName);
// document.querySelector('.namePlanet').textContent = planet.name;
// document.querySelector('.gravityPlanet').textContent = planet.gravity;
// }
