/* Homepage */

async function onInit(){
  const aliveNumber = document.querySelector('.alive-number');
  const vehicleNumber = document.querySelector('.vehicle-number');
  const planetNumber = document.querySelector('.planet-number');

  aliveNumber.textContent = await getHomepageNumbers('https://swapi.dev/api/people');
  vehicleNumber.textContent = await getHomepageNumbers('https://swapi.dev/api/vehicles');
  planetNumber.textContent = await getHomepageNumbers('https://swapi.dev/api/planets');
};

onInit();

async function getHomepageNumbers(url){
  const response = await fetch(url);
  const data = await response.json();
  return data.count;
};
