import { Routes, Route } from 'react-router'
import MainLayout from "@layouts/MainLayout.tsx";
import BookListing from "@components/bookListing/BookListing.tsx";

export const Router = () => {
    return <Routes>
        <Route path='/' element={<MainLayout />}>
            <Route index element={<div> HOME PAGE </div>}></Route>
            <Route path='/search' element={<BookListing />}></Route>
        </Route>
    </Routes>
}