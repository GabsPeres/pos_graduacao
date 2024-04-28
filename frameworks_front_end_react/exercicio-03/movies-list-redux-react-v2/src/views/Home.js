import { useEffect, useState } from "react";
import { MoviesService } from "../api/MoviesService";
import { Movie } from "../components/Movie";

export const Home = () => {
  const [movies, setMovies] = useState([]);
  useEffect(() => {
    MoviesService.getMovies().then(({ data }) => {
      // Armazena o resultado da requisição
      // em uma variável de estado do react
      setMovies(data.results);
    });
  }, []);
  return (
    <div className="container">
      <div className="row gy-5">
        {
          // Loop no conteúdo da variável de estado e exibe
          // os dados dentro do componente Movie
          movies.map((movie) => (
            <div key={movie.id} className="col-3">
              <Movie movie={movie} />
            </div>
          ))
        }
      </div>
    </div>
  );
};

