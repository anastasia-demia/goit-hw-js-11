export default class SearchService {
    constructor() {
      this.searchQuery = '';
      this.page = 1;
      this.perPage = 40;
      this.loadPages = 0;
    }

    fetchArticles() {
      const options = {
        API_KEY: '31893065-63c8c7d2f80c76dc2f47aa6fa',
        URL: 'https://pixabay.com/api/',
      };

      return fetch(
        `${options.URL}?key=${options.API_KEY}&q=${this.searchQuery}&image_type=photo&orientation=horizontal&safesearch=true&page=${this.page}&per_page=${this.perPage}`
      )
        .then(response => response.json())
        .then(({ hits, totalHits }) => {
          this.incrementPage();

          const obj = {
            hits,
            totalHits,
          };
          return obj;
        })
        .catch(error => console.log(error.message));
    }

    incrementPage() {
      this.page += 1;
      this.loadPages += this.perPage;
    }

    resetPage() {
      this.page = 1;
      this.loadPages = 0;
    }

    get query() {
      return this.searchQuery;
    }

    set query(newQuery) {
      this.searchQuery = newQuery;
    }
  }