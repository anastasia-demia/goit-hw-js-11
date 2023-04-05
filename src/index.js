import SearchService from "./search";
import Notiflix from "notiflix";
import axios from 'axios';
const axios = require('axios');

const searchService = new SearchService();

const refs = {
  searchForm: document.querySelector('.search-form'),
  galleryContainer: document.querySelector('.gallery'),
  body: document.querySelector('body'),
  load: document.querySelector('.load-more')
};

refs.searchForm.addEventListener('submit', onSearch);
refs.load.addEventListener('click', onLoadMore)

function onSearch(e) {
  e.preventDefault();
  refs.load.classList.remove('hide')

  try {
    searchService.query = e.currentTarget.elements.searchQuery.value;
    searchService.resetPage();
    searchService.fetchArticles().then(({ hits, totalHits }) => {
      clearMarkup();
      if (hits.length === 0) {
        return Notiflix.Notify.failure(
          'Sorry, there are no images matching your search query. Please try again.',
          { clickToClose: true }
        );
      }
      renderSearchMarkup(hits);
      gallery.refresh();
      Notiflix.Notify.info(`Hooray! We found ${totalHits} images.`, {
        clickToClose: true,
      });
    });
  } catch (error) {
    console.log(error);
  }
}

function renderSearchMarkup(hits) {
  const markup = hits
    .map(
      ({
        webformatURL,
        tags,
        likes,
        views,
        comments,
        downloads,
        largeImageURL,
      }) => {
        return `
    <div class="photo-card">
  <a class='photo-card__link' href='${largeImageURL}'><img src="${webformatURL}" alt="${tags}" loading="lazy" /></a>
  <div class="info">
    <p class="info-item">
      <b>Likes:</b>
      <b>${likes}</b>
    </p>
    <p class="info-item">
      <b>Views:</b>
      <b>${views}</b>
    </p>
    <p class="info-item">
      <b>Comments:</b>
      <b>${comments}</b>
    </p>
    <p class="info-item">
      <b>Downloads:</b>
      <b>${downloads}</b>
    </p>
  </div>
</div>`;
      }
    )
    .join('');

  refs.galleryContainer.insertAdjacentHTML('beforeend', markup);
}

function clearMarkup() {
  refs.galleryContainer.innerHTML = '';
}
