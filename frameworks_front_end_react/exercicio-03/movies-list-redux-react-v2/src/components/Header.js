import { Outlet } from "react-router-dom";
import { MainMenu } from "./MainMenu";
export const Header = () => (
    <>
        <header className="main-header">
            <h1>Bem-vindo(a) ao Movies List</h1>
            <MainMenu />
        </header>
        <Outlet />
    </>
);