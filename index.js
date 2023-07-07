// https://www.omdbapi.com/?apikey=3ca5df7&t=${inputValue}

async function searchResult(){
    // fetch input element from the DOM
    const inputField = document.querySelector("#searchField");
    const movie = inputField.value;
    // fetch movie details from the api
    const response = await fetch(`https://www.omdbapi.com/?apikey=3ca5df7&t=${movie}`, {
        method: "GET",
    }); // "https://www.omdbapi.com/?apikey=3ca5df7&t=" + movie
    const data = await response.json();

    // fetch the movies-container-search element from DOM
    const moviesContainerSearch = document.querySelector(".movies-container-search");

    // create required elements for the result
    const card = document.createElement("div");
    const poster = document.createElement("div");
    const details = document.createElement("div");
    const image = document.createElement("img");
    const title = document.createElement("p");
    const plot = document.createElement("p");
    const btns = document.createElement("div");
    const addBtn = document.createElement("button");
    const cancelBtn = document.createElement("button");

    // add event listener for the add button
    addBtn.addEventListener("click", () => {
        // add movie data into the localstorage
        const myMovieList = JSON.parse(localStorage.getItem("movieList")) || [];
        myMovieList.push(data);
        localStorage.setItem("movieList", JSON.stringify(myMovieList));
        showMyMovieList(true);

        // remove the card from the search container
        moviesContainerSearch.removeChild(card);
        inputField.value = "";
    });

    // add event listener for cancel button
    cancelBtn.addEventListener("click", () => {
        moviesContainerSearch.removeChild(card);
        inputField.value = "";
    })

    // add content to the above created element
    title.innerHTML = data.Title;
    plot.innerHTML = data.Plot;
    addBtn.innerHTML = "Add";
    cancelBtn.innerHTML = "Cancel";

    // add the attribute to the img element
    image.setAttribute("src", data.Poster);
    image.setAttribute("alt", "Poster");

    // add class to the above created elements
    // 2 ways to add class attribute for any html elements
    card.classList.add("movie");
    poster.setAttribute("class", "poster");
    details.classList.add("details");
    title.classList.add("title");
    plot.classList.add("plot");
    btns.classList.add("btns");
    addBtn.classList.add("add");
    cancelBtn.classList.add("cancel");

    // create parent-child relationship
    btns.appendChild(addBtn);
    btns.appendChild(cancelBtn);
    details.appendChild(title);
    details.appendChild(plot);
    details.appendChild(btns);
    poster.appendChild(image);
    card.appendChild(poster);
    card.appendChild(details);
    moviesContainerSearch.appendChild(card);
}

function showMyMovieList(val){
    // fetch movie list from the local storage
    const movieList = JSON.parse(localStorage.getItem("movieList")) || [];

    const moviesContainer = document.querySelector("#movies-container");

    // traverse over it and create required elements;
    for(let i = val ? movieList.length - 1 : 0; i < movieList.length; i++){
        const card = document.createElement("div");
        const poster = document.createElement("div");
        const image = document.createElement("img");
        const details = document.createElement("div");
        const title = document.createElement("p");
        const plot = document.createElement("p");
        const removeBtn = document.createElement("p");

        // add event listener for remove element
        removeBtn.addEventListener("click", () => {
            moviesContainer.removeChild(card);
            let movieList = JSON.parse(localStorage.getItem("movieList"));
            movieList = movieList.filter((movie) => movie.Title != movieList[i].Title);
            localStorage.setItem("movieList", JSON.stringify(movieList));
        })

        // add content to the above created elements
        title.innerHTML = movieList[i].Title;
        plot.innerHTML = movieList[i].Plot;
        removeBtn.innerHTML = "Remove";

        // add attributes to the image
        image.setAttribute("src", movieList[i].Poster);
        image.setAttribute("alt", "Poster");

        // add the styling
        card.classList.add("movie-card");
        poster.classList.add("poster-card");
        details.classList.add("details-card");
        removeBtn.classList.add("remove-card");

        // add parent child relationship 
        details.appendChild(title);
        details.appendChild(plot);
        details.appendChild(removeBtn);
        poster.appendChild(image);
        card.appendChild(poster);
        card.appendChild(details);
        moviesContainer.appendChild(card);

    }
}

showMyMovieList(false);

