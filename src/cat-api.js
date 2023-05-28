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
    .then(data =>
      data.map(breed => ({
        id: breed.id,
        name: breed.name,
      }))
    )
    .catch(error => {
      iziToast.error({
        messageColor: '#000080',
        backgroundColor: '#FF0000',
        messageSize: 'large',
        title: 'Error',
        message: 'Oops! Something went wrong! Try reloading the page!',
      });
      console.error('Помилка при отриманні списку порід:', error);
      throw error;
    });
}

export default { fetchBreeds, fetchCatByBreed };

function fetchCatByBreed(breedId) {
  const URL = `https://api.thecatapi.com/v1/images/search?breed_ids=${breedId}&api_key=${API_KEY}`;
  return fetch(URL)
    .then(response => {
      return response.json();
      
    })
    .then(data => {
      return data[0];
    });
}


