import {getMovies} from "./db";

const resolvers = {
    Query : {
        movies: (_, {id}) => getMovies(id) 
    }
}

export default resolvers;