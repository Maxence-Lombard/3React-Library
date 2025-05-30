import { Routes, Route } from 'react-router'
import MainLayout from "@layouts/MainLayout.tsx";

export const Router = () => {
    return <Routes>
        <Route path='/' element={<MainLayout />}>
            <Route index element={<div> HOME PAGE </div>}></Route>
        </Route>
    </Routes>
}