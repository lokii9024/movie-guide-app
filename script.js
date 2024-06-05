const searchForm = document.querySelector("form")
const movieContainer = document.querySelector(".movie-container")
const inputBox = document.querySelector(".inputBox")

//function to fetch movie details using omdb api
async function getMovieInfo(movie){
    try{
        const apiKey = "d07e40c9"
    const apiUrl = `http://www.omdbapi.com/?i=tt3896198&apikey=${apiKey}&t=${movie}`

    const response = await fetch(apiUrl)

        if(!response.ok){
            throw new error("Unable to fetch movie data")
        }

    const data = await response.json()
    
    showMovieData(data)
    }
    catch(error){
        showErrorMessage("No Movie Found !!!")
    }
}


//function to show movie data on screen 

const showMovieData = (data) => {
    movieContainer.innerHTML = ""
    movieContainer.classList.remove('noBackground')

    // use destructuring assignment to extract properties from data object
    const { Title, imdbRating, Genre, Released, Runtime, Actors, Plot, poster} = data

    const movieElement = document.createElement('div')
    movieElement.classList.add('movie-info')
    movieElement.innerHTML = `<h2>${Title}</h2>
                                <p><strong>Rating: &#11088;</strong>${imdbRating}</p>`

    const movieGenreElement = document.createElement('div')
    movieGenreElement.classList.add('movie-genre')

    Genre.split(",").forEach(element => {
        const p = document.createElement('p')
        p.innerText = element
        movieGenreElement.appendChild(p)
    })

    movieElement.appendChild(movieGenreElement)

    movieElement.innerHTML += `<p><strong>Released Date: </strong>${Released}}</p>
                                <p><strong>Duration: </strong>${Runtime}}</p>
                                <p><strong>Cast: </strong>${Actors}}</p>
                                <p><strong>Plot: </strong>${Plot}}</p>`

//creating a div for movie poster 
const movieposterElement = document.createElement('div')
movieposterElement.classList.add('movie-poster')
movieposterElement.innerHTML = `<img src="${poster} alt"movie-poster" />`

    
    movieContainer.appendChild(movieposterElement)
    movieContainer.appendChild(movieElement)
}


//function to show error message
const showErrorMessage = (message) => {
    movieContainer.innerHTML = `<h2>${message}</h2>`
    movieContainer.classList.add("noBackground")
}

/* adding event listener to form */
searchForm.addEventListener("submit", (e)=>{
    e.preventDefault()
    const movieName = inputBox.value.trim()
    if(movieName !== ""){
        showErrorMessage("Fetching movie information..........")
        getMovieInfo(movieName)
    }
    else{
        showErrorMessage("Enter movie name to get movie information")
    }
})
