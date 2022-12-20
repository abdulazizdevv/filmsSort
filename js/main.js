let elinput = document.querySelector("input");
let elForm = document.querySelector("form");
let elList = document.querySelector(".js-list");
let elSelect = document.querySelector("#js-select");
let elSort = document.querySelector("#js-sort");

let newArr = [];

elForm.addEventListener("input", (evt) => {
  evt.preventDefault();
  elList.innerHTML = "";

  let elInputVal = elinput.value.toLocaleLowerCase();

  films.forEach((el) => {
    if (el.title.toLocaleLowerCase().includes(elInputVal)) {
      newArr.push(el);
    }
  });

  hero(newArr);

  newArr = [];
});

function hero(films) {
  let newRes = "";
  for (els of films) {
    newRes += `<div class="card shadow " style="width: 18rem;">
    <img src="${els.poster}" class="card-img-top" alt="films">
    <div class="card-body">
    <h5 class="card-title text-success">${els.title}</h5>
    <h4 class="card-text text-danger">${els.genres}</h4>
    <p class="card-text">${els.overview}</p>
    </div>
    </div>`;
  }

  elList.innerHTML = newRes;
}

hero(films);

let newSet = new Set();

films.forEach((el) => {
  el.genres.forEach((type) => {
    newSet.add(type);
  });
});

newSet.forEach((type) => {
  let newOption = document.createElement("option");

  newOption.value = type;
  newOption.textContent = type;

  elSelect.appendChild(newOption);
});

let res = [];

elSelect.addEventListener("change", (element) => {
  let filterArr = films.filter((film) => {
    let all = element.target.value;
    return film.genres.includes(all);
  });
  hero(filterArr);
});


let main1 = films.sort((a, b) => {
  if (elSort.value == "A-Z") {
    return a.title.charCodeAt(0) - b.title.charCodeAt(0);
  }
});
console.log(main1);

var sortArr = [];
elSort.addEventListener("change", function () {
  sortArr = [];
  if (elSort.value != "All") {
    films.forEach((item) => {
      if (elSort.value == "A-Z") {
        sortArr.push(item);
        sortArr.sort(
          (a, b) =>
            a.title.toLowerCase().charCodeAt(0) -
            b.title.toLowerCase().charCodeAt(0)
        );
      } else {
        sortArr.push(item);
        sortArr.sort(
          (a, b) =>
            b.title.toLowerCase().charCodeAt(0) -
            a.title.toLowerCase().charCodeAt(0)
        );
      }
    });
    hero(sortArr, elList);
  } else {
    hero(films, elList);
  }
});
