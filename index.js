//Use your brilliant brain, Stephanie! You got this!

//DomContentLoaded
document.addEventListener("DOMContentLoaded", () => { 
  renderHomePage();
  fetchJokeList();
  attachJokeListClickEvent();
  attachHomePageClickEvent();
  attachRandomJokeClickEvent();
}

)

// Node getters
const mainDiv = () => document.getElementById("main");
const homePageLink =() => document.getElementById("home-page-link");
const randomJokeLink=() => document.getElementById("random-joke-link");
const jokeListLink =() => document.getElementById("joke-list-link");

let jokes = [];

//3 Event Listeners
function attachHomePageClickEvent(){
  homePageLink().addEventListener("click", renderHomePage);
}
function attachRandomJokeClickEvent(){
  randomJokeLink().addEventListener('click', fetchRandomJoke);
}
function attachJokeListClickEvent(){
  jokeListLink().addEventListener("click", renderJokeListPage);
}

//Resets 
function resetMainDiv() {
  mainDiv().innerHTML = ""
}

//create html elements for the "HOME page"
const renderHomePage = ()=> {
  resetMainDiv();

  const h1 = document.createElement("h1");
  const p = document.createElement("p");
  
  h1.innerText ="This is a Jokes App"
  h1.style.marginTop ="0"
  p.innerText = "Hi! Welcome to my Joke Generator! Click on \"Random Jokes\" to see a cool joke!"

  mainDiv().appendChild(h1);
  mainDiv().appendChild(p);
}

//create elements for "Random Joke" + add button to be able to add joke to favorites page
const renderRandomJokePage = (joke) => {
  resetMainDiv();

  const h1 = document.createElement("h1");
  const p = document.createElement("p");
  const btn = document.createElement("button");

  h1.innerText ="Random Jokes :)"
  h1.style.marginTop ="0"
  p.innerText = joke;

  btn.innerText = "Add to Favorites"
  btn.className = "btn";

  btn.addEventListener("click",()=> favoriteJoke(joke))

  mainDiv().appendChild(h1);
  mainDiv().appendChild(p);
  mainDiv().appendChild(btn)

}

//create elements for "FAVORITE joke list page"
const renderJokeListPage = ()=> {
  resetMainDiv();

  const h1 = document.createElement("h1");
  h1.innerText ="Here are your favorite jokes!"
  h1.style.marginTop ="0"
  
  mainDiv().appendChild(h1);
  renderJokes()

}

//create element and iterate through each joke for "ul"
const renderJokes =()=> {
  const ul = document.createElement("ul");
  jokes.forEach(joke => renderJoke(joke, ul))

  mainDiv().appendChild(ul);
}

const renderJoke = (joke, ul) =>{
  const li = document.createElement("li");
  let btn = document.createElement('button')
  btn.addEventListener('click', () => {
    li.remove()

    deleteJoke(joke.id)
  });
  btn.textContent = 'x'
    li.innerText =  ` ${joke.joke} `
    ul.appendChild(li);
    li.append(btn)
}


//FETCH requests:

//fetch from Public API
const fetchRandomJoke =() =>{
  fetch("https://v2.jokeapi.dev/joke/Any?safe-mode&type=single")
    .then(resp => resp.json())
    .then(data => {
      renderRandomJokePage(data.joke); 
    })
  
}

//fetch and Post from/to the db.json I created
const fetchJokeList =() =>{
  fetch("http://localhost:3000/favorites")
    .then(resp => resp.json())
    .then(data => jokes = data);
}

const favoriteJoke = (joke) => {
  fetch('http://localhost:3000/favorites', {
    method: "POST",
    headers: {
        "Accept": "application/json",
        "Content-Type": "application/json"
    },
    body: JSON.stringify({ joke: joke })
  })
    .then(resp => resp.json())
    .then(data => {
      jokes.push(data);
      renderJokeListPage()
    })
}

//delete joke from db.json
const deleteJoke = (id) => {
  fetch(`http://localhost:3000/favorites/${id}`, {
    method: "DELETE",
    headers: {
      "Content-Type": "application/json"
    }
  })
  .then (resp =>resp.json())
  .then(resp => console.log("resp", resp))

}
