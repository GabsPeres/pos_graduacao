import { useEffect, useState } from "react";
import { MoviesService } from "../api/MoviesService";
import { Movie } from "../components/Movie";

export const Movies = () => {
    const [movies, setMovies] = useState([]);

    const getMovies = async () => {
        const {
            data: { results },
        } = await MoviesService.getMovies();
        
        setMovies(results);
    };
    useEffect(() => {
        getMovies();
    }, []);

    return (
        <div className="container">
            <div className="row gy-5">
                {movies.map((movie) => (
                    <div key={movie.id} className="col-3">
                        <Movie movie={movie} />
                    </div>
                ))}
            </div>
        </div>
    );
};