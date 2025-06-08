import {Route, Routes} from 'react-router'
import MainLayout from "@layouts/MainLayout.tsx";
import BookListing from "@components/bookListing/BookListing.tsx";
import BookDetails from "@components/bookDetails/BookDetails.tsx";

export const Router = () => {
    return <Routes>
        <Route path='/' element={<MainLayout />}>
            <Route index element={<div> HOME PAGE </div>}></Route>
            <Route path='/search' element={<BookListing />}></Route>
            <Route path='/book/:id/details' element={<BookDetails />}></Route>
        </Route>
    </Routes>
}