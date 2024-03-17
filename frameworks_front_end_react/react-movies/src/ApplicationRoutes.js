
import { MovieDetail } from "./views/MovieDetail";
import { Movies } from "./views/Movies";
import {createBrowserRouter,RouterProvider} from "react-router-dom";

const router = createBrowserRouter([
    {
        path: "/",
        element: <Movies />,
    },
    {
        path: "/movie/:movieId",
        element: <MovieDetail />,
    },

]);

export const ApplicationRoutes = () => <RouterProvider router={router} />;