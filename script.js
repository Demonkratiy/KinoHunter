const searchForm = document.querySelector('#search-form');
const movie = document.querySelector('#movies')

function apiSearch(event) {
  event.preventDefault();
  const searchText = document.querySelector('.form-control').value;
  const server = 'https://api.themoviedb.org/3/search/multi?api_key=fe1ddbf26c8c5d6d90244797b03f0315&language=ru&query=' + searchText;
  movie.innerHTML = 'Загрузка';
  requestApi('GET', server)
  .then(function(result) {
      const output = JSON.parse(result);
      console.log(output);
      let inner = '';
      output.results.forEach(function(item) {
        let nameItem = item.name || item.title;
        let dateItem = item.first_air_date || item.release_date;
        //inner += '<div class="col-5">' + nameItem + '</div>';
        inner += `<div class="col-15 col-md-4 col-xl-3">${nameItem}&#8194-&#8194${dateItem};&#8194</div>`;
      });
      movie.innerHTML = inner;

    })
    .catch()
    ;
}

searchForm.addEventListener('submit', apiSearch);

function requestApi(method, url) {
  return new Promise(function(resolve, reject) {
    const request = new XMLHttpRequest();
    request.open(method, url);

    request.addEventListener('load', function() {
      if (request.status !== 200) {
        reject({status: request.status});
        return;
      }
      resolve(request.response);
    });

    request.addEventListener('error', function() {
      reject({status: request.status});
    });
    request.send();
  });
}
// request.addEventListener('readystatechange', function() {
//   if (request.readyState !== 4) {
//     movie.innerHTML = 'Загрузка';
//     return;
//   }
//   if (request.status !== 200) {
//     movie.innerHTML = 'Упс, что-то пошло не так!';
//     console.log('Error: ' + request.status);
//     return;
//   }
//   const output = JSON.parse(request.responseText);
//
//
//   console.log(output);
// });
