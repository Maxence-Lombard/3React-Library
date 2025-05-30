import { Outlet } from "react-router"

function MainLayout() {
    return (
        <div>
            <header></header>
            <main>
                <Outlet></Outlet>
            </main>
            <footer></footer>
        </div>
    )
}

export default MainLayout