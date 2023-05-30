import './css/style.css';
import API from './cat-api';
import SlimSelect from 'slim-select';
import '/node_modules/slim-select/dist/slimselect.css'


// import { fetchBreeds, fetchCatByBreed } from './cat-api.js';

const refs = {
  breedSelect: document.querySelector('.breed-select'),
  loader: document.querySelector('.loader'),
  error: document.querySelector('.error'),
  divCatInfo: document.querySelector('.cat-info'),
  selectWrapper: document.querySelector('.select-wrapper'),
  catImage: document.getElementById('cat-image'),
  breedName: document.getElementById('breed-name'),
  breedDescription: document.getElementById('breed-description'),
  breedTemperament: document.getElementById('breed-temperament'),
};
// console.log(API);
 showLoader();

API.fetchBreeds()
   .then(data =>
    data.map(breed => ({
      id: breed.id,
      name: breed.name,
    }))
    )
  .then(breeds => {
   
    breeds.forEach(breed => {
    const option = document.createElement('option');
    option.value = breed.id;
    option.textContent = breed.name;
    refs.breedSelect.appendChild(option);
           
    });
   
     new SlimSelect({
    select: '#single'
     })
    
    hideLoader();
    showSelectWrapper();
  })
  
    .catch(error => {
      iziToast.error({
        messageColor: '#000080',
        backgroundColor: '#FF0000',
        messageSize: 'large',
        position: 'topLeft',
        title: 'Error',
        message: 'Oops! Something went wrong! Try reloading the page!',
      });
      console.error('Помилка при отриманні списку порід:', error);
      
    }
    );



refs.breedSelect.addEventListener('change', onChange);

function onChange(evt) {
  evt.preventDefault();
  const selectBreedId = refs.breedSelect.value;
  showLoader();
  hideError();
  hideCatInfo();

  API.fetchCatByBreed(selectBreedId)
     .then(data => {
      return data[0];
    })
    .then(renderBreedCard)
    .catch(onFetchError)
    .finally(finallyReset);
};

function renderBreedCard(catData) {
  const { url, breeds } = catData;

  const markup = `
              <img src='${url}' alt='${breeds[0].name}' width=300>
              <div><h2>${breeds[0].name}</h2>
              <p>${breeds[0].description}</p>
              <p><span>Temperament:</span> ${breeds[0].temperament}</p></div>
            `;

  refs.divCatInfo.innerHTML = markup;
  refs.divCatInfo.classList.add('catCard');
  showCatInfo();

};

function onFetchError() {
  iziToast.error({
    messageColor: '#000080',
    backgroundColor: '#FF0000',
    messageSize: 'large',
    position: 'topLeft',
    title: 'Error',
    message: 'Oops! Something went wrong! Try reloading the page!',
  });
  console.error('Помилка при отриманні інформації про кота:', error);
  
};

function showLoader() {
  refs.loader.style.display = 'inline-block';
  iziToast.warning({
    messageColor: '#000080',
    backgroundColor: '	#FFD700',
    messageSize: 'large',
    timeout: 900,
    position: 'topLeft',
    pauseOnHover: true,
    title: 'Caution',
    message: 'Loading data, please wait...',
  });
};

function hideLoader() {
  refs.loader.style.display = 'none';
};


function hideError() {
  refs.error.style.display = 'none';
};

function showCatInfo() {
  refs.divCatInfo.style.display = 'flex';
};

function hideCatInfo() {
  refs.divCatInfo.style.display = 'none';
 
}

function finallyReset() {
  hideLoader()
     refs.breedSelect.value = '';
};

function showSelectWrapper() {
  refs.selectWrapper.style.display = 'block'
}
