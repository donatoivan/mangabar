// const fetch = require('node-fetch');

// async function getAPI() {
//   const response = await fetch('/api');
//   const json = await response.json();

const ghibli = fetch("https://ghibliapi.herokuapp.com/films");

ghibli
  .then((response) => {
    return response.json()
  })
  .then((data) => {
    // console.log(data)
    // let list = document.querySelector('.list')
    let container = document.querySelector('.container')
    data.forEach(movie => {
      console.log(movie.title)
      console.log(movie.description)
      console.log(movie.director)
      console.log(movie.release_date)
      console.log(movie.rt_score + "%")
      let html = `
      <div>
      <div class="card">${movie.title}</div>
      <h2>${movie.description}</h2>
      <h3>${movie.director}</h3>
      </div?
      `
      container.insertAdjacentHTML('beforeend', html)
    });
  })

// getAPI();


// <%# <% data.data.forEach(element => { %>
//   <%# <div class="col-sm-4">
//     <div class="card">
//       <div class="card-body">
//         <h5 class="card-title"><%= element.title %>
//         <%# <h6><%= element.release_date %>
//         <%# <p class = "card-text"><%= element.description %>
//         <%# <h6><%= element.rt_score %>
//         <%# <a href="" class="btn btn-primary">See More</%#> %>
//       <%# </div> %>
//     <%# </div> %>
//   <%# </div> %>
// <%# <% }); %> 
