import { Link } from "react-router-dom";
export const MainMenu = () => (
    <ul className="nav justify-content-center">
        <li className="nav-item">
            <Link className="nav-link" to="/">
                Home
            </Link>
        </li>
        <li className="nav-item">
            <Link className="nav-link" to="/favoritos">
                Favoritos
            </Link>
        </li>
    </ul>
);