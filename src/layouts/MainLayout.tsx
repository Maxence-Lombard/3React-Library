import {Link, Outlet} from "react-router"
import defaultClass from "./mainLayout.module.css";
import SearchBar from "@components/searchBar/SearchBar.tsx";
import {useState} from "react";

function MainLayout() {
    const [menuOpen, setMenuOpen] = useState(false);

    return (
        <div className={defaultClass.layout}>
            <header className={defaultClass.header}>
                <h1 className={defaultClass.title}>LIBRARY</h1>
                <SearchBar />
                <button
                    className={defaultClass.burger}
                    onClick={() => setMenuOpen(o => !o)}
                    aria-label="Ouvrir le menu"
                >
                    <span />
                    <span />
                    <span />
                </button>
                <div className={`${defaultClass.navContainer} ${menuOpen ? defaultClass.open : ""}`}>
                    <Link to="/" className={defaultClass.navLink} onClick={() => setMenuOpen(false)}> Home </Link>
                    <Link to="/search" className={defaultClass.navLink} onClick={() => setMenuOpen(false)}> Search </Link>
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