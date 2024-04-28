import { configureStore } from "@reduxjs/toolkit";
import favorito from "./features/favoritos";

export default configureStore({
    reducer: {
        favorito,
    },
});