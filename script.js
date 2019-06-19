const searchForm = document.querySelector('#search-form');
const movie = document.querySelector('#movies')
function apiSearch(event){
  event.preventDefault();
  const searchText = document.querySelector('.form-control').value;
  const server = 'https://api.themoviedb.org/3/search/multi?api_key=fe1ddbf26c8c5d6d90244797b03f0315&language=ru&query=' + searchText;
  requestApi('GET', server);
}

searchForm.addEventListener('submit', apiSearch);

function requestApi(method, url){
  const request = new XMLHttpRequest();
  request.open(method, url)
  request.send();
  request.addEventListener('readystatechange', function() {
    if (request.readyState !== 4) return;
    if(request.status !== 200){
      console.log('Error: ' + request.status);
      return;
    }
    const output = JSON.parse(request.responseText);

    let inner = '';

    output.results.forEach(function (item){
      let nameItem = item.name || item.title;
      let dateItem = item.first_air_date || item.release_date;
      //inner += '<div class="col-5">' + nameItem + '</div>';
      inner += `<div class="col-15 col-md-4 col-xl-3">${nameItem}&#8194-&#8194${dateItem}</div>`;
    });
    movie.innerHTML = inner;
    console.log(output);
  });
}
