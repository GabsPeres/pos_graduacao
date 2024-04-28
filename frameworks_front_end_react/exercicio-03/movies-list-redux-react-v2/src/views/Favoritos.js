import { useSelector } from "react-redux";

export const Favoritos = () => {
    const favoritos = useSelector((state) => state.favorito);
    return (
        <section>
            <h1>Meus filmes favoritos</h1>
            <ul>
                {favoritos.movies.map((movie) => (
                    <li>{movie.title}</li>
                ))}
            </ul>
        </section>
    );
};