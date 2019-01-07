import fetch from "node-fetch";
const URL = "https://yts.am/api/v2/list_movies.json";
export const getMovies = async id => {
    console.log("test");
    let movies = await fetch(URL)
    .then(response => response.json())
    .then(json => json.data.movies);
    console.log(movies);
    if (id  > 0){
       movies = movies.filter(movie => movie.id === id);    
       console.log(movies[0])  ;
       return movies;
    }
    return movies;
}