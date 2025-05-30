import {Link, Outlet} from "react-router"
import defaultClass from "./mainLayout.module.css";
import SearchBar from "@components/searchBar/SearchBar.tsx";

function MainLayout() {
    return (
        <div className={defaultClass.layout}>
            <header className={defaultClass.header}>
                <h1 className={defaultClass.title}>LIBRARY</h1>
                <SearchBar />
                <div className={defaultClass.navContainer}>
                    <Link to="/" className={defaultClass.navLink}> Home </Link>
                    <Link to="/search" className={defaultClass.navLink}> Search </Link>
                </div>
            </header>
            <main className={defaultClass.container}>
                <Outlet />
            </main>
            <footer className={defaultClass.footer}>
                <p> Library </p>
            </footer>
        </div>
    )
}

export default MainLayout