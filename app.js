const API_URL = 'https://api.themoviedb.org/3/discover/movie?sort_by=popularity.desc&api_key=1851750858823d558aaa3e3d62af3077';
const IMG_PATH = 'https://image.tmdb.org/t/p/w1280';
const SEARCH_API = 'https://api.themoviedb.org/3/search/movie?api_key=1851750858823d558aaa3e3d62af3077&query="';

const form = document.getElementById('form');
const search = document.getElementById('search');
const main = document.getElementById('main');

getMovie(API_URL);

async function getMovie(url){
     const res = await fetch(url);
     const data = await res.json();

     console.log(data.results);
     showMovieList(data.results);
}

function showMovieList(movies){
     main.innerHTML = ''

     movies.forEach((movie) => {
          const { overview, title, vote_average, poster_path } = movie;

          const movieEl = document.createElement('div');
          movieEl.classList.add('movie');

          movieEl.innerHTML = `
          <img src="${IMG_PATH + poster_path}" alt="">

          <div class="movie-info">
               <h3>${title}</h3>
               <span class="${ratingText(vote_average)}">${vote_average}</span>
          </div>

          <div class="overview">
               <h3>Overview</h3>
               ${overview}
          </div>
          `;

          main.appendChild(movieEl);
     });
}

function ratingText(vote){
     if(vote >= 8){
          return 'green';
     }else if(vote >= 5){
          return 'orange';
     }else{
          return 'red';
     }
}

form.addEventListener('submit', (e) => {
     e.preventDefault();

     const searchTerm = search.value;

     if(searchTerm && searchTerm !== ''){
          getMovie(SEARCH_API + searchTerm);

          search.value = '';
     }else{
          window.location.reload();
     }
})
