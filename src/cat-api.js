const BASE_URL = 'https://api.thecatapi.com/v1/breeds';

const API_KEY =
  'live_55cxcACp5QMgUJMKFsfZJUTm6HHeZI9SSpnqHcQLBEEW2Nv3hL8pb6MSWOcBFh0s';

function fetchBreeds(BASE_URL) {
  return fetch('https://api.thecatapi.com/v1/breeds')
    .then(response => {
      if (!response.ok) {
        throw new Error(response.status);
      }
      //   console.log(response);
      return response.json();
    })
    
}

export default { fetchBreeds, fetchCatByBreed };

function fetchCatByBreed(breedId) {
  const URL = `https://api.thecatapi.com/v1/images/search?breed_ids=${breedId}&api_key=${API_KEY}`;
  return fetch(URL)
    .then(response => {
      return response.json();
      
    })
   
}


