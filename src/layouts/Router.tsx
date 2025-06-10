import {Route, Routes} from 'react-router'
import MainLayout from "@layouts/MainLayout.tsx";
import BookListing from "@components/bookListing/BookListing.tsx";
import LastUpdatesListing from "@components/lastUpdatesListing/LastUpdatesListing.tsx";
import BookDetails from "@components/bookDetails/BookDetails.tsx";

export const Router = () => {
    return <Routes>
        <Route path='/' element={<MainLayout />}>
            <Route index element={<LastUpdatesListing />}></Route>
            <Route path='/search' element={<BookListing />}></Route>
            <Route path='/book/:id/details' element={<BookDetails />}></Route>
        </Route>
    </Routes>
}